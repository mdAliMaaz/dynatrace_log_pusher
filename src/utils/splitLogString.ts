import { readFile } from "./readFile";
import { applyRegEx, Log } from "./applyRegEx";

export function splitLogString(filePath: string): Log[] {
  // reading content from log file
  let logLines = readFile(filePath);
  // split log string into individual logs
  let individualLogsArray = logLines.trim().split("\n");
  // now mapping through each log and removing whitespace and spliting it  with line breaks
  let result = [];
  if (individualLogsArray.length > 0) {
    for (let i = 0; i < individualLogsArray.length - 1; i++) {
      const element = individualLogsArray[i].trim();
      if (element) {
        let log = applyRegEx(element);
        if (log) {
          result.push(log);
        }
      }
    }
  }
  return result;
}
