import dotenv from "dotenv";

import { fetchFilesPath } from "./utils/fetchFilesPath";
import { splitLogString } from "./utils/splitLogString";
import { getTimeStamps } from "./utils/getTimeStamps";
import { Log } from "./utils/applyRegEx";
import { batchMaker } from "./utils/batchMaker";
import { pushToDynatrace } from "./utils/pushToDynatrace";
import { checkForDublicate } from "./utils/checkForDublicate";

dotenv.config();
console.log("Starting 🔥");

let now: any = new Date();

let oneDayAgo: Date = new Date(now - 24 * 60 * 60 * 1000);

let dirName = process.env.DIR_NAME;

// fetching all files path from provided directory
let filePath: string[] = fetchFilesPath(dirName);

// array for storing array of log objects
let logsPerFile: Log[][] = [];

// fetching array of log object from each file path so every file will return array of log.
filePath.forEach((file) => {
  // reading file and returning array of log objects
  let arrayOfObjects: Log[] = splitLogString(file);
  // pushing array of log objects into this array
  logsPerFile.push(arrayOfObjects);
});

let unFilteredLogs: Log[] = [];

// looping through each log object and checking if they are one day old if so then pushing them to payLoad
for (let arrayOfLogs of logsPerFile) {
  for (let i = 0; i < arrayOfLogs.length - 1; i++) {
    let log: Log = arrayOfLogs[i];
    let timestamp = new Date(log.timestamp);
    if (timestamp >= oneDayAgo && timestamp < now) {
      unFilteredLogs.push(log);
    }
  }
}

// retriving the timestamp of pushed logs
let timestamps = getTimeStamps(
  "C:\\Users\\mohommed.maaz\\Desktop\\code\\dynatrace_log_pusher\\timestamp.log"
);

// to store unPushed logs
let unPushedLogs: Log[] = checkForDublicate(timestamps, unFilteredLogs);

// spliting the logs array into multiple log arrays
let arrayOfBatchs: Log[][] = batchMaker(unPushedLogs, 10);

// TODO: loop through each batch and push all of them after testing
if (arrayOfBatchs.length > 0) {
  pushToDynatrace(arrayOfBatchs[0]);
}

console.log("logs Pushed:", arrayOfBatchs.length);
console.log("End 🍀");
