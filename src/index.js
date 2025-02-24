import fs from "fs";
import http from "node:http";
import path from "path";
import { getName } from "./getName.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    fs.readFile(path.join(process.cwd(), "src/index.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
        server.emit("ok", req);
      }
    });
  } else if (req.url === "/api/name" && req.method === "GET") {
    const name = await getName();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ name }));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.prependListener("error", (error) => {
  console.error(error);
  server.close();
});

server.on("ok", (req) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  console.log(`\x1b[32m${timestamp} ${method} ${url} \x1b[0m`);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
