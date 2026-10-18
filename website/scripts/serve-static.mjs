import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, resolve, sep } from "node:path";

const root = resolve("build/client");
const types = {
  ".css": "text/css; charset=utf-8",
  ".data": "application/json; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};
const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
  const relative = pathname.replace(/^\/+/, "");
  let file = resolve(root, relative || "index.html");
  if (file !== root && !file.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, "index.html");
  if (!file.startsWith(root)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (!existsSync(file)) {
    if (extname(pathname)) {
      response.writeHead(404).end("Not found");
      return;
    }
    file = resolve(root, "index.html");
  }
  response.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(response);
});

const port = Number(process.env.PORT ?? 4187);
server.listen(port, "127.0.0.1", () =>
  console.log(`Static build preview: http://127.0.0.1:${port}`),
);
