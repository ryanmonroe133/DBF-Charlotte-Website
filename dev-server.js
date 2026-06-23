const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 5500);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

let clients = [];

function sendReload() {
  clients = clients.filter((res) => !res.destroyed);
  for (const res of clients) {
    res.write("data: reload\n\n");
  }
}

fs.watch(root, { recursive: true }, (_event, filename) => {
  if (!filename) return;
  if (filename.includes("node_modules") || filename === "dev-server.js") return;
  sendReload();
});

function liveReloadSnippet() {
  return `
<script>
  new EventSource("/__events").onmessage = function (event) {
    if (event.data === "reload") window.location.reload();
  };
</script>`;
}

const server = http.createServer((req, res) => {
  if (req.url === "/__events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("\n");
    clients.push(res);
    req.on("close", () => {
      clients = clients.filter((client) => client !== res);
    });
    return;
  }

  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const requested = safePath === "/" ? "index.html" : safePath.replace(/^[/\\]/, "");
  const filePath = path.join(root, requested);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader("Content-Type", types[ext] || "application/octet-stream");

    if (ext === ".html") {
      const html = data.toString("utf8").replace("</body>", `${liveReloadSnippet()}\n</body>`);
      res.end(html);
      return;
    }

    res.end(data);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`DBF website preview: http://127.0.0.1:${port}`);
});
