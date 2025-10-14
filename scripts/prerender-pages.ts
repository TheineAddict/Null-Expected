// scripts/prerender-pages.ts
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { AUTHORS } from "../src/config/authors"; // TS import via tsx

const OUT_DIR = "dist";
const PAGES_ROOT = "src/pages";
const PREVIEW_PORT = process.env.PRERENDER_PORT || "4173";
const BASE = process.env.PREVIEW_BASE || `http://localhost:${PREVIEW_PORT}`;

// Helper TSX files to ignore as real routes
const IGNORE_BASENAMES = new Set(["blogpost.tsx", "authorblog.tsx"]);
const IGNORE_PREFIX = "_"; // e.g. _layout.tsx

const isTsx = (name: string) => /\.tsx$/i.test(name);

function collectFileRoutes(rootDir: string): string[] {
  // Map src/pages/about.tsx -> /about
  // Map src/pages/company/write-for-us.tsx -> /company/write-for-us
  // Map src/pages/index.tsx -> / (we’ll exclude "/" from prerender list)
  const routes: string[] = [];
  const walk = (dir: string, rel = "") => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      const relPath = path.posix.join(rel, ent.name);
      if (ent.isDirectory()) {
        walk(full, relPath);
      } else if (ent.isFile() && isTsx(ent.name)) {
        const bn = ent.name;
        if (IGNORE_BASENAMES.has(bn)) continue;
        if (bn.startsWith(IGNORE_PREFIX)) continue;

        // Dynamic pages like [id].tsx will be handled separately (authors, etc.)
        if (/\[[^\]]+\]\.tsx$/i.test(bn)) continue;

        const noExt = relPath.replace(/\.tsx$/i, "");
        let route = "/" + noExt.replace(/index$/i, ""); // index.tsx => folder root
        route = route.replace(/\/+$/, "");              // trim trailing slash
        if (route && route !== "/") routes.push(route);
      }
    }
  };
  if (fs.existsSync(rootDir)) walk(rootDir);
  return Array.from(new Set(routes)).sort();
}

function collectDynamicAuthorRoutes(): string[] {
  // Expect pages like src/pages/author/[id].tsx
  // We’ll emit /author/<id> for every id in AUTHORS.
  const candidate = path.join(PAGES_ROOT, "author", "[id].tsx");
  if (!fs.existsSync(candidate)) return [];
  const ids = Object.keys(AUTHORS || {});
  return ids.map(id => `/author/${id}`);
}

async function waitForPreview(url: string, retries = 60, delayMs = 250) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status < 500) return true;
    } catch {}
    await new Promise(r => setTimeout(r, delayMs));
  }
  return false;
}

async function fetchHtml(url: string) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return await res.text();
}

async function writeHtmlForRoute(html: string, route: string) {
  // route "/about" => dist/about.html
  // route "/company/write-for-us" => dist/company/write-for-us.html
  const outPath = path.join(OUT_DIR, route.slice(1) + ".html");
  await fsp.mkdir(path.dirname(outPath), { recursive: true });
  await fsp.writeFile(outPath, html, "utf8");
}

async function main() {
  // 1) Build the app first (so preview serves latest dist assets)
  // NOTE: we assume "vite build" already ran in the parent "build" script.

  // 2) Collect routes
  const fileRoutes = collectFileRoutes(PAGES_ROOT);
  const authorRoutes = collectDynamicAuthorRoutes();
  const routes = Array.from(new Set([...fileRoutes, ...authorRoutes])).sort();

  console.log(`[prerender] discovered ${routes.length} route(s):`, routes);

  if (!routes.length) {
    console.log("[prerender] nothing to prerender; exiting.");
    return;
  }

  // 3) Start vite preview
  console.log(`[prerender] starting vite preview on :${PREVIEW_PORT} …`);
  const preview = spawn("npx", ["vite", "preview", "--port", PREVIEW_PORT, "--strictPort"], {
    stdio: "pipe",
    env: { ...process.env },
  });

  preview.stdout.on("data", d => process.stdout.write(`[preview] ${d}`));
  preview.stderr.on("data", d => process.stderr.write(`[preview] ${d}`));

  const ok = await waitForPreview(`${BASE}/`);
  if (!ok) {
    preview.kill();
    throw new Error("[prerender] preview server did not start in time.");
  }
  console.log(`[prerender] preview ready at ${BASE}`);

  // 4) Fetch and save each route
  let success = 0;
  for (const r of routes) {
    const url = `${BASE}${r}`;
    try {
      const html = await fetchHtml(url);
      await writeHtmlForRoute(html, r);
      console.log(`[prerender] saved ${r} -> ${path.join(OUT_DIR, r.slice(1) + ".html")}`);
      success++;
    } catch (e: any) {
      console.error(`[prerender] FAILED ${r}:`, e.message);
    }
  }

  preview.kill("SIGINT");
  console.log(`[prerender] done. wrote ${success}/${routes.length} routes.`);
}

await main().catch(err => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
