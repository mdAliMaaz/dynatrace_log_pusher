import fs from "fs";

export function readFile(filePath: string): string {
  try {
    //reading each log file and returing it;
    const data = fs.readFileSync(filePath, "utf-8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}
