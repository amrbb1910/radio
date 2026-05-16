const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(process.cwd());
const rootLower = root.toLowerCase();
const port = Number(process.argv[2] || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, "http://127.0.0.1");
  const requestedPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const filePath = path.resolve(root, `.${decodeURIComponent(requestedPath)}`);

  if (!filePath.toLowerCase().startsWith(rootLower)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, buffer) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    res.end(buffer);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`http://127.0.0.1:${port}/`);
});
