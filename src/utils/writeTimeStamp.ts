import fs from "fs";

export function writeTimestamp(timestamp: string) {
  fs.appendFileSync("timestamp.log", timestamp + " ");
}
