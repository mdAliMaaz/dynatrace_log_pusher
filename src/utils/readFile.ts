import fs from "fs";

export function readFile(filePath: string): string {
  try {
    //reading each log file and returing it;
    const data = fs.readFileSync(filePath, "utf-8");

    if (data.length > 0) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}
