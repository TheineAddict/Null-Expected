// scripts/build-blog.mjs
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

/* ---- tiny helpers (no extra deps) ---- */
const esc = (s = "") => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const slugify = (s = "") => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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

/* ---- site constants ---- */
const SITE = "https://www.nullexpected.com";
const BRAND = "Null Expected";
const BLOG_BASE = "/blog";
const SRC_DIR = "content/blog";      // your markdown lives here
const OUT_DIR = "dist";              // Vite’s output
const OUT_BLOG_DIR = path.join(OUT_DIR, "blog");

/* ---- ensure output dirs ---- */
await fsp.mkdir(OUT_DIR, { recursive: true });
await fsp.mkdir(OUT_BLOG_DIR, { recursive: true });

/* ---- read markdown posts ---- */
const files = fs.existsSync(SRC_DIR) ? fs.readdirSync(SRC_DIR) : [];
const posts = [];

for (const file of files) {
  if (!file.endsWith(".md")) continue;

  const raw = await fsp.readFile(path.join(SRC_DIR, file), "utf8");
  const [data, content] = parseFrontMatter(raw);

  let slug = (data.slug?.trim()) || path.basename(file, ".md");
  slug = slugify(slug);
  const url = `${SITE}${BLOG_BASE}/${slug}`;

  const htmlBody = marked.parse(content);
  const pageTitle = data.title ? `${data.title} | ${BRAND}` : BRAND;
  const metaDesc = data.description || "A QA thought hub. What did you expect?";
  const ogImage = data.image || `${SITE}/og-null-expected.jpg`;
  const datePublished = data.date || "";
  const dateModified = data.updated || datePublished;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title || BRAND,
    "description": metaDesc,
    "author": data.author ? { "@type": "Person", "name": data.author } : undefined,
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
      { "@type": "ListItem", "position": 3, "name": data.title || slug, "item": url }
    ]
  };

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
<meta property="og:title" content="${esc(data.title || BRAND)}" />
<meta property="og:description" content="${esc(metaDesc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${esc(ogImage)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(data.title || BRAND)}" />
<meta name="twitter:description" content="${esc(metaDesc)}" />
<meta name="twitter:image" content="${esc(ogImage)}" />
<style>
body{font-family:ui-sans-serif,system-ui;margin:0;color:#0f172a;line-height:1.6}
header,main,footer{max-width:860px;margin:0 auto;padding:20px}
header a{color:#2E00A3;text-decoration:none;font-weight:700}
h1{line-height:1.2;margin:.5em 0}
article img{max-width:100%;height:auto}
.meta{color:#475569;font-size:.9rem;margin-bottom:1rem}
nav a{color:#334155;margin-right:12px}
</style>
<script type="application/ld+json">${JSON.stringify(articleLd)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbsLd)}</script>
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
    <h1>${esc(data.title || slug)}</h1>
    <div class="meta">
      ${data.author ? esc(data.author) + " · " : ""}${datePublished ? new Date(datePublished).toDateString() : ""}
    </div>
    ${htmlBody}
  </article>
</main>
<footer><p>© ${new Date().getFullYear()} ${esc(BRAND)}</p></footer>
</body>
</html>`;

  await fsp.writeFile(path.join(OUT_BLOG_DIR, `${slug}.html`), page, "utf8");

  posts.push({
    slug, url,
    title: data.title || slug,
    description: metaDesc,
    date: datePublished
  });
}

/* ---- /blog index ---- */
const listItems = posts
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
  .map(p => `<li><a href="${BLOG_BASE}/${p.slug}">${esc(p.title)}</a> — <small>${esc(p.description)}</small></li>`)
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

/* ---- sitemap.xml ---- */
const urls = [
  `${SITE}/`,
  `${SITE}/blog/`,
  ...posts.map(p => `${SITE}${BLOG_BASE}/${p.slug}`)
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${u}</loc><changefreq>weekly</changefreq><priority>${u.endsWith("/") ? "0.8" : "0.7"}</priority></url>`).join("\n")}
</urlset>`;
await fsp.writeFile(path.join(OUT_DIR, "sitemap.xml"), sitemap, "utf8");

/* ---- robots.txt ---- */
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
await fsp.writeFile(path.join(OUT_DIR, "robots.txt"), robots, "utf8");

console.log(`Built ${posts.length} post(s).`);
