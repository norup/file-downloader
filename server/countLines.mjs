import fs from "node:fs";
import _ from "highland";

export const countLines = (filePath) => {
  return new Promise((resolve, reject) => {
    let lineCount = 0;
    const fileStream = fs.createReadStream(filePath);

    if (!fileStream) {
      reject(new Error("Failed to create file stream"));
      return;
    }

    _(fileStream)
      .split()
      .filter((chunk) => chunk.trim() !== "")
      .map(() => {
        lineCount++;
      })
      .on("error", (err) => {
        reject(new Error("Error during line counting: " + err.message));
      })
      .done(() => {
        resolve(lineCount);
      });
  });
};
