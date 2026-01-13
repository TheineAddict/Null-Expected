// scripts/prerender-pages.ts
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const OUT_DIR = "dist";
const PAGES_ROOT = "src/pages";
const PREVIEW_PORT = process.env.PRERENDER_PORT || "4173";
const BASE = process.env.PREVIEW_BASE || `http://127.0.0.1:${PREVIEW_PORT}`;

// Helper TSX files to ignore as routes (case-insensitive)
const IGNORE_BASENAMES = [/^authorblog\.tsx$/i, /^blogpost\.tsx$/i];
// Ignore any file starting with "_" (e.g., _layout.tsx, _utils.tsx)
const IGNORE_PREFIX = "_";

// Treat only .tsx files as pages (no params like [id].tsx — we skip those)
const isTsx = (name: string) => /\.tsx$/i.test(name);
const isDynamic = (name: string) => /\[[^\]]+\]\.tsx$/i.test(name);

function collectFileRoutes(rootDir: string): string[] {
  // Map src/pages/about.tsx -> /about
  // Map src/pages/company/write-for-us.tsx -> /company/write-for-us
  // Map src/pages/index.tsx -> /
  const routes: string[] = [];

  const walk = (dir: string, rel = "") => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      const relPath = path.posix.join(rel, ent.name);

      if (ent.isDirectory()) {
        walk(full, relPath);
        continue;
      }

      if (!ent.isFile() || !isTsx(ent.name)) continue;

      const bn = ent.name;
      if (IGNORE_BASENAMES.some((rx) => rx.test(bn))) continue;
      if (bn.startsWith(IGNORE_PREFIX)) continue;
      if (isDynamic(bn)) continue; // skip [param].tsx (no enumeration here)

      const noExt = relPath.replace(/\.tsx$/i, "");
      let route = "/" + noExt.replace(/index$/i, ""); // index.tsx -> folder root
      // normalize: lowercase, trim trailing slashes (except keep "/" for root)
      route = route.replace(/\/+$/, "") || "/";
      if (route !== "/") {
        route = route
          .split("/")
          .map((seg) => seg.toLowerCase())
          .join("/");
      }
      // Keep root out of list (usually already covered by your static index.html)
      if (route && route !== "/") routes.push(route);
    }
  };

  if (fs.existsSync(rootDir)) walk(rootDir);
  return Array.from(new Set(routes)).sort();
}

async function waitForPreview(url: string, retries = 60, delayMs = 250) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status < 500) return true; // 2xx/3xx/4xx => server is up
    } catch {
      // ignore until up
    }
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return false;
}

async function fetchHtml(url: string) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return await res.text();
}

const routeTitles: Record<string, string> = {
  '/mission': 'Our Mission - Null:Expected QA Thought Hub',
  '/about': 'About Us - Null:Expected QA Professionals',
  '/blog': 'Blog - Quality Insights | Null:Expected',
  '/manifesto': 'QA Manifesto - Null:Expected Quality Principles',
  '/consulting': 'QA Consulting Services - Null:Expected Quality Transformation',
  '/landing': 'Null:Expected - A QA Thought Hub by Andreea Vitan',
  '/notfound': '404 - Page Not Found | Null:Expected'
};

async function writeHtmlForRoute(html: string, route: string) {
  // route "/about" -> dist/about.html
  // route "/company/write-for-us" -> dist/company/write-for-us.html

  // Inject correct title for this route
  if (routeTitles[route]) {
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${routeTitles[route]}</title>`
    );
  }

  const outPath = path.join(OUT_DIR, route.slice(1) + ".html");
  await fsp.mkdir(path.dirname(outPath), { recursive: true });
  await fsp.writeFile(outPath, html, "utf8");
}

function stopPreview(child: ReturnType<typeof spawn>, ms = 3000) {
  return new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        resolve();
      }
    };
    const timer = setTimeout(() => {
      try {
        child.kill("SIGKILL");
      } catch {}
      finish();
    }, ms);

    child.on("exit", () => {
      clearTimeout(timer);
      finish();
    });

    try {
      child.kill("SIGTERM");
    } catch {
      // ignore
    }
  });
}

async function main() {
  // Collect TSX page routes (non-dynamic)
  const routes = collectFileRoutes(PAGES_ROOT);
  console.log(`[prerender] discovered ${routes.length} route(s):`, routes);

  if (!routes.length) {
    console.log("[prerender] nothing to prerender; exiting.");
    return;
  }

  // Start vite preview
  console.log(`[prerender] starting vite preview on :${PREVIEW_PORT} …`);
  const preview = spawn(
    "npx",
    ["vite", "preview", "--port", PREVIEW_PORT, "--strictPort", "--host", "127.0.0.1"],
    {
      stdio: "ignore", // prevent open pipes from keeping event loop alive
      env: { ...process.env },
      detached: false,
    }
  );

  const ok = await waitForPreview(`${BASE}/`);
  if (!ok) {
    await stopPreview(preview);
    throw new Error("[prerender] preview server did not start in time.");
  }
  console.log(`[prerender] preview ready at ${BASE}`);

  // Fetch and save each route
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

  // Shutdown preview and exit cleanly
  await stopPreview(preview);
  console.log(`[prerender] done. wrote ${success}/${routes.length} routes.`);
}

await main().catch((err) => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
