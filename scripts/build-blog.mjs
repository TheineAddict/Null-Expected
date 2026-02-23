// scripts/build-blog.mjs
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

/* ------------ helpers ------------ */
const esc = (s = "") => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const parseFrontMatter = (src) => {
  if (!src.startsWith("---")) return [{}, src];
  const end = src.indexOf("\n---", 3);
  if (end === -1) return [{}, src];
  const raw = src.slice(3, end).trim();
  const body = src.slice(end + 4).replace(/^\s*\n/, "");
  const data = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    const k = m[1].trim();
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (/^\[.*\]$/.test(v)) { try { v = JSON.parse(v); } catch {} }
    data[k] = v;
  }
  return [data, body];
};

const slugify = (s = "") =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/* ------------ site constants ------------ */
const SITE = "https://www.nullexpected.com";
const BRAND = "Null Expected";
const BLOG_BASE = "/blog";
const OUT_DIR = "dist";
const POSTS_ROOT = "src/data/posts"; // required structure

/* ------------ validate structure & gather files ------------ */
const AUTHOR_RE = /^author\d+$/;   // author1, author2, author3, ...
const YEAR_RE = /^\d{4}$/;         // 2025
const MONTH_RE = /^(0[1-9]|1[0-2])$/; // 01..12

if (!fs.existsSync(POSTS_ROOT)) {
  console.warn(`[blog build] No posts: missing ${POSTS_ROOT}`);
}

const walkMarkdown = () => {
  const out = [];
  if (!fs.existsSync(POSTS_ROOT)) return out;
  for (const authorDir of fs.readdirSync(POSTS_ROOT, { withFileTypes: true })) {
    if (!authorDir.isDirectory() || !AUTHOR_RE.test(authorDir.name)) continue;
    const authorPath = path.join(POSTS_ROOT, authorDir.name);

    for (const yearDir of fs.readdirSync(authorPath, { withFileTypes: true })) {
      if (!yearDir.isDirectory() || !YEAR_RE.test(yearDir.name)) continue;
      const yearPath = path.join(authorPath, yearDir.name);

      for (const monthDir of fs.readdirSync(yearPath, { withFileTypes: true })) {
        if (!monthDir.isDirectory() || !MONTH_RE.test(monthDir.name)) continue;
        const monthPath = path.join(yearPath, monthDir.name);

        for (const f of fs.readdirSync(monthPath, { withFileTypes: true })) {
          if (f.isFile() && f.name.toLowerCase().endsWith(".md")) {
            out.push({
              abs: path.join(monthPath, f.name),
              author: authorDir.name,
              year: yearDir.name,
              month: monthDir.name,
              file: f.name
            });
          }
        }
      }
    }
  }
  return out;
};

const mdFiles = walkMarkdown();
console.log(`[blog build] Found ${mdFiles.length} markdown file(s) under ${POSTS_ROOT}.`);

/* ------------ ensure output folders ------------ */
await fsp.mkdir(OUT_DIR, { recursive: true });

/* ------------ build posts ------------ */
const posts = [];

for (const info of mdFiles) {
  const raw = await fsp.readFile(info.abs, "utf8");
  const [data, content] = parseFrontMatter(raw);

  const filenameSlug = path.basename(info.file, ".md");
  const fmSlug = (data.slug && String(data.slug).trim()) || "";
  const slug = slugify(fmSlug || filenameSlug) || "post";

  const urlPath = `${BLOG_BASE}/${info.author}/${info.year}/${info.month}/${slug}`;
  const url = `${SITE}${urlPath}`;

  const titleText = data.title ? String(data.title) : slug;
  const pageTitle = `${titleText} | ${BRAND}`;
  const metaDesc = data.description || "A QA thought hub. What did you expect?";
  const ogImage = data.image || `${SITE}/og-null-expected.jpg`;

  const datePublished =
    data.date ||
    `${info.year}-${info.month}-01`;
  const dateModified = data.updated || datePublished;

  const htmlBody = marked.parse(content);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": titleText,
    "description": metaDesc,
    "author": { "@type": "Person", "name": info.author },
    "datePublished": datePublished || undefined,
    "dateModified": dateModified || undefined,
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "image": ogImage
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE}${BLOG_BASE}` },
      { "@type": "ListItem", "position": 3, "name": titleText, "item": url }
    ]
  };

  const outHtmlPath = path.join(OUT_DIR, urlPath.slice(1) + ".html"); // remove leading '/'
  await fsp.mkdir(path.dirname(outHtmlPath), { recursive: true });

  const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(metaDesc)}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="${esc(BRAND)}" />
<meta property="og:title" content="${esc(titleText)}" />
<meta property="og:description" content="${esc(metaDesc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${esc(ogImage)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(titleText)}" />
<meta name="twitter:description" content="${esc(metaDesc)}" />
<meta name="twitter:image" content="${esc(ogImage)}" />
<script type="application/ld+json">${JSON.stringify(articleLd)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbsLd)}</script>
<style>
body{font-family:ui-sans-serif,system-ui;margin:0;color:#0f172a;line-height:1.6}
header,main,footer{max-width:860px;margin:0 auto;padding:20px}
header a{color:#2E00A3;text-decoration:none;font-weight:700}
h1{line-height:1.2;margin:.5em 0}
article img{max-width:100%;height:auto}
.meta{color:#475569;font-size:.9rem;margin-bottom:1rem}
nav a{color:#334155;margin-right:12px}
</style>
</head>
<body>
<header>
  <a href="/">Null Expected</a>
  <nav>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <article>
    <h1>${esc(titleText)}</h1>
    <div class="meta">
      ${esc(info.author)} · ${datePublished ? new Date(datePublished).toDateString() : ""}
    </div>
    ${htmlBody}
  </article>
</main>
<footer><p>© ${new Date().getFullYear()} ${esc(BRAND)}</p></footer>
</body>
</html>`;

  await fsp.writeFile(outHtmlPath, page, "utf8");

  posts.push({
    urlPath, url,
    title: titleText,
    description: metaDesc,
    author: info.author,
    date: datePublished
  });
}

/* ------------ /blog index ------------ */
const listItems = posts
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
  .map(p => `<li><a href="${p.urlPath}">${esc(p.title)}</a> — <small>${esc(p.description)}</small></li>`)
  .join("\n");

const blogIndex = `<!doctype html><html lang="en"><head>
<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Blog | ${BRAND}</title>
<meta name="description" content="Articles on QA processes, quality mindset, career advice, and trends." />
<link rel="canonical" href="${SITE}${BLOG_BASE}" />
<style>body{font-family:ui-sans-serif,system-ui;margin:0}main{max-width:860px;margin:0 auto;padding:20px}a{color:#2E00A3;text-decoration:none}</style>
</head><body>
<main><h1>Blog</h1><ul>${listItems || "<li>No posts yet.</li>"}</ul></main>
</body></html>`;

await fsp.mkdir(path.join(OUT_DIR, "blog"), { recursive: true });
await fsp.writeFile(path.join(OUT_DIR, "blog", "index.html"), blogIndex, "utf8");

/* ------------ include other static pages from dist in sitemap ------------ */
function collectDistPages(root) {
  const urls = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith(".html")) {
        const rel = path.relative(root, full).replace(/\\/g, "/");
        if (rel === "index.html") continue; // home already added
        if (rel.startsWith("blog/") && rel !== "blog/index.html") continue; // blog posts added separately
        if (rel === "null-expected-job-radar-app.html") continue; // exclude hidden app
        if (rel === "app-privacy-policy.html") continue; // exclude legal page
        if (rel === "app-terms-of-service.html") continue; // exclude legal page
        const clean = "/" + rel.replace(/index\.html$/, "").replace(/\.html$/, "");
        urls.push(clean);
      }
    }
  };
  if (fs.existsSync(root)) walk(root);
  return Array.from(new Set(urls));
}

/* ------------ sitemap.xml ------------ */
const sitemapUrls = new Set([
  `${SITE}/`,
  `${SITE}${BLOG_BASE}/`,
  ...posts.map(p => `${SITE}${p.urlPath}`)
]);

for (const p of collectDistPages(OUT_DIR)) sitemapUrls.add(`${SITE}${p}`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...sitemapUrls].map(u => `<url><loc>${u}</loc><changefreq>weekly</changefreq><priority>${u.endsWith("/") ? "0.8" : "0.7"}</priority></url>`).join("\n")}
</urlset>`;
await fsp.writeFile(path.join(OUT_DIR, "sitemap.xml"), sitemap, "utf8");

console.log(`[blog build] Built ${posts.length} post(s). Sitemap URLs: ${sitemapUrls.size}`);
