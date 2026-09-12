// Local preview/test server only. Vercel serves out/ directly; no server is deployed.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const mime = { ".html": "text/html; charset=utf-8", ".md": "text/markdown; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".pdf": "application/pdf", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".mp4": "video/mp4", ".woff2": "font/woff2" };

export function createExportServer() {
  return createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const path = resolve(root, `.${pathname}`);
      if (path !== resolve(root) && !path.startsWith(resolve(root) + sep)) {
        response.writeHead(400).end();
        return;
      }
      const candidates = pathname.endsWith("/") ? [resolve(path, "index.html")] : [path, `${path}.html`];
      for (const candidate of candidates) {
        if (!(await stat(candidate).catch(() => null))?.isFile()) continue;
        const data = await readFile(candidate);
        response.writeHead(200, { "content-type": mime[extname(candidate)] ?? "application/octet-stream" });
        response.end(request.method === "HEAD" ? undefined : data);
        return;
      }
      response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      response.end(await readFile(resolve(root, "404.html")));
    } catch {
      response.writeHead(400).end();
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  createExportServer().listen(port, "127.0.0.1", () => console.log(`Static preview: http://127.0.0.1:${port}`));
}
