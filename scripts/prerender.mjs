/**
 * Renders every route to real static HTML after the client build.
 *
 * Without this the site ships an empty <div id="root"> to crawlers, which would
 * undermine PRODUCT.md's third purpose — ranking for "head spa Jeddah" under
 * the business's own name rather than an aggregator's. The client bundle then
 * hydrates the prerendered markup.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const dist = path.join(root, "dist");

// pathToFileURL, not a bare path: a Windows path is not a valid ESM specifier,
// and this project's directory contains spaces and an ampersand that need encoding.
const entry = pathToFileURL(path.join(dist, "server", "entry-server.js")).href;
const { render, routes } = await import(entry);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const siteUrl = (process.env.SITE_URL || "https://soulo-bice.vercel.app").replace(/\/$/, "");

/**
 * The "/" route is written back to dist/index.html, which is also this template.
 * Re-running without a fresh `vite build` would therefore read an already-filled
 * template, find no placeholders, and silently emit the home page for every
 * route. Fail loudly instead.
 */
for (const marker of ["<!--app-html-->", "<!--app-head-->"]) {
  if (!template.includes(marker)) {
    console.error(
      `prerender: dist/index.html is missing ${marker}.\n` +
        `It looks already prerendered — run \`vite build\` first to regenerate a clean template.`,
    );
    process.exit(1);
  }
}

let written = 0;
for (const url of routes) {
  const { html, head, title, description } = render(url);

  const page = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);

  const outDir = url === "/" ? dist : path.join(dist, url.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), page, "utf8");

  const kb = (Buffer.byteLength(page) / 1024).toFixed(1);
  console.log(`  prerendered ${url.padEnd(14)} -> ${path.relative(root, path.join(outDir, "index.html"))}  (${kb} kB)`);
  written++;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((url) => {
    const loc = `${siteUrl}${url === "/" ? "/" : url}`;
    return `  <url><loc>${loc}</loc></url>`;
  })
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
  "utf8",
);

// The server bundle is a build artefact, not something to deploy.
fs.rmSync(path.join(dist, "server"), { recursive: true, force: true });

console.log(`\n${written} routes prerendered.`);
console.log("  wrote sitemap.xml");
console.log("  wrote robots.txt");
