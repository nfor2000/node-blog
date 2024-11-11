import fs from "fs";
import http from "http";
import path from "path";
import dotenv from "dotenv";

dotenv.config("./.env")

import { getPosts, addPost, removePostById, getPostById } from "./routes/post.js";
const server = http.createServer();

const __dirname = path.resolve();

const serveFiles = async (filePath, contentType, res) => {
     try {
          const data = fs.readFileSync(filePath, { encoding: contentType.includes("image") ? "binary" : "utf-8" });
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data, contentType.includes("image") ? "binary" : "utf-8");
     } catch (error) {
          console.error(error);
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("File not found");
     }
};

server.on("request", async (req, res) => {
     if (req.url.includes("?")) {
          req.url = req.url.split("?")[0]
     }
     console.log(req.method, req.url)

     if (req.method === "GET") {
          const ext = path.extname(req.url);
          let contentType = "";

          switch (ext) {
               case ".css":
                    contentType = "text/css";
                    break;
               case ".html":
                    contentType = "text/html";
                    break;
               case ".js":
                    contentType = "text/javascript";
                    break;
               case ".png":
                    contentType = "image/png"
                    break
               default:
                    contentType = "text/html";
                    break;
          }

          const filePath = contentType === "text/html" && (req.url === "/" || req.url.slice(-1) === "/") ?
               path.join(__dirname, "views", "index.html") :
               contentType === "text/html" ?
                    path.join(__dirname, "views", req.url) :
                    path.join(__dirname, "public", req.url);

          if (contentType && fs.existsSync(filePath)) {
               serveFiles(filePath, contentType, res);
          } else {
               if (req.url === "/posts") {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    const posts = await getPosts();
                    res.end(JSON.stringify(posts));
               } else if (/\/posts\/\w*\d*\w*\d*/.test(req.url)) {
                    const id = req.url.split("/").pop();
                    console.log(id);

                    const post = await getPostById(id);

                    if (!post) {
                         res.writeHead(404, { "Content-Type": "text/plain" });
                         res.end("Post not found");
                    } else {
                         res.writeHead(200, { "Content-Type": "application/json" });
                         res.end(JSON.stringify(post));
                    }

               } else {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    const data = fs.readFileSync(path.join(__dirname, "views", "404.html"))
                    res.end(data);
               }
          }

     }

     if (req.method === "POST") {
          if (req.url === "/posts/create") {
               let body = []

               req.on("data", (chunk) => {
                    body.push(chunk)
               }).on("end", () => {
                    body = Buffer.concat(body).toString()
                    console.log(body)
                    const params = new URLSearchParams(body)
                    const title = params.get("title")
                    const content = params.get("body")

                    addPost({ title, body: content })

                    res.writeHead(301, { "Location": "/create.html" });
                    res.end();
               })
          }
     }
});

server.listen(5000, () => console.log("HTTP server running on port 5000"));