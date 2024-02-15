import dotenv from "dotenv";

import { fetchFilesPath } from "./utils/fetchFilesPath";
import { splitLogString } from "./utils/splitLogString";
import { writeTimestamp } from "./utils/writeTimeStamp";
import { getTimeStamps } from "./utils/getTimeStamps";
import { Log } from "./utils/applyRegEx";
import { batchMaker } from "./utils/batchMaker";
import { pushToDynatrace } from "./utils/pushToDynatrace";

dotenv.config();
console.log("Starting");
let dirName = process.env.DIR_NAME;

let filePath = fetchFilesPath(dirName);

let logsPerFile: Log[][] = [];

let timestamps = getTimeStamps(
  "D:\\Projects\\dynatrace_log_pusher\\timestamp.log"
);

filePath.forEach((file) => {
  let arrayOfObjects = splitLogString(file);
  if (arrayOfObjects) {
    logsPerFile.push(arrayOfObjects);
  }
});

let payLoad: Log[] = [];

for (let arrayOfLogs of logsPerFile) {
  for (let i = 0; i < arrayOfLogs.length - 1; i++) {
    let log: Log = arrayOfLogs[i];
    if (timestamps.hasOwnProperty(log.timestamp)) {
      console.log("Not Pushing");
    } else {
      payLoad.push(log);
      writeTimestamp(log.timestamp);
      // console.log("Pushing and updating timestamp");
    }
  }
}

let batchs = batchMaker(payLoad, 10);

console.log(batchs[0]);
console.log(payLoad.length);
