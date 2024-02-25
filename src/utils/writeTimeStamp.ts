import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; //  maximum file size (10MB)

const fileName = `timestamps.log`;

const pathToTimeStamps: string = path.resolve(
  __dirname,
  "..",
  "..",
  "timestamps",
  fileName
);

export function writeTimestamp(timestamp: string) {
  let currentFileSize = 0;

  try {
    // Check current file size
    if (fs.existsSync(fileName)) {
      const stats = fs.statSync(fileName);
      currentFileSize = stats.size;
    }

    // Check if current file size plus new data exceeds maximum file size
    if (
      currentFileSize + Buffer.byteLength(timestamp + " ") >=
      MAX_FILE_SIZE_BYTES
    ) {
      // Change file by renaming existing file
      const renamedFileName = `${fileName.split(".")[0]}.${uuidv4()}.log`;
      fs.renameSync(fileName, renamedFileName);
      currentFileSize = 0; // Reset current file size after renaming
    }

    // Append timestamp to the file
    fs.appendFileSync(pathToTimeStamps, timestamp + " ");
  } catch (error) {
    console.error("Error occurred while writing timestamp:", error);
  }
}
