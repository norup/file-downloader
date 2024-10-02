import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import _ from "highland";
import { countLines } from "./countLines.mjs";

const hostname = "127.0.0.1";
const port = 4500;
const csvFilePath = path.join("./mock_50mb_file.csv");

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET" && req.url === "/download") {
    const lineCount = await countLines(csvFilePath);

    res.writeHead(200, {
      "Content-Type": "text/csv",
      "Transfer-Encoding": "chunked",
      "X-LINES-COUNT": lineCount.toString(),
    });

    const fileStream = fs.createReadStream(csvFilePath);

    fileStream.on("error", (err) => {
      console.error("Error opening file:", err.message);

      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
      }
      res.end(
        JSON.stringify({ message: "Internal Server Error: " + err.message })
      );
    });

    const stream = _(fileStream)
      .split()
      .filter((chunk) => chunk.trim() !== "")
      .map((line) => {
        return line.toUpperCase();
      })
      .intersperse("\n");

    stream.pipe(res);

    stream.on("end", () => {
      res.end();
      console.log(`Total lines processed: ${lineCount}`);
    });

    stream.on("error", (err) => {
      console.error("Error during stream processing:", err);

      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
      }

      res.end(
        JSON.stringify({ message: "Internal Server Error: " + err.message })
      );
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Not found" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
