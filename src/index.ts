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
console.log("fetching all files path from provided directory.");
let filePath: string[] = fetchFilesPath(dirName);

// array of storing array of log objects
let logsPerFile: Log[][] = [];

console.log("Reading logs from each path and creating an object out of it.");
// fetching array of log object from each file path so every file will return array of log.
filePath.forEach((file) => {
  if (file) {
    // reading file and returning array of log objects
    let arrayOfObjects: Log[] = splitLogString(file);
    // pushing array of log objects into this array
    logsPerFile.push(arrayOfObjects);
  }
});

let validLogs: Log[] = [];
// looping through each log object and checking if they are one day old if so then pushing them to validLogs
console.log("Checking that each log is one day old...");
for (let arrayOfLogs of logsPerFile) {
  for (let i = 0; i < arrayOfLogs.length - 1; i++) {
    let log: Log = arrayOfLogs[i];
    let timestamp = new Date(log.timestamp);
    if (timestamp >= oneDayAgo && timestamp < now) {
      validLogs.push(log);
    }
  }
}

// retriving the timestamp of pushed logs
let timestamps = getTimeStamps();

console.log("Filtering out dublicate logs...");
// to store unPushed logs
let unPushedLogs: Log[] = checkForDublicate(timestamps, validLogs);

let batchSize = 17000;
console.log(
  `Creating batched of logs if size of unPushed logs is greater than ${batchSize}`
);
// if (unPushedLogs.length > batchSize) {
//   let arrayOfBatchs: Log[][] = batchMaker(unPushedLogs, batchSize);

//   if (arrayOfBatchs.length) {
//     arrayOfBatchs.forEach((batch) => {
//       pushToDynatrace(batch);
//     });
//   }
//   console.log("total logs", validLogs.length);
//   console.log("total batchs Pushed:", arrayOfBatchs.length);
// } else {
//   pushToDynatrace(unPushedLogs);
//   console.log("total logs", validLogs.length);
//   console.log("total batchs Pushed:", unPushedLogs.length);
// }
// spliting the logs array into multiple log arrays
console.log(`logs per batch ${batchSize} or less `);
console.log("End 🍀");
