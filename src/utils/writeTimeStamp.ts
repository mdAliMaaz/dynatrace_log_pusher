import fs from "fs";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; //  maximum file size (5MB)

export function writeTimestamp(timestamp: string) {
  const fileName = "timestamp.log";
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
      const renamedFileName = `${fileName}.${Date.now()}`;
      fs.renameSync(fileName, renamedFileName);
      currentFileSize = 0; // Reset current file size after renaming
    }

    // Append timestamp to the file
    fs.appendFileSync(fileName, timestamp + " ");
  } catch (error) {
    console.error("Error occurred while writing timestamp:", error);
  }
}
