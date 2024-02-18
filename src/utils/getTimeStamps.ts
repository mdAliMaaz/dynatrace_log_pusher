import { fetchFilesPath } from "./fetchFilesPath";
import { readFile } from "./readFile";
import path from "path";

type TIMESTAMP = { [key: string]: string };

const pathToTimeStamps: string = path.resolve(
  __dirname,
  "..",
  "..",
  "timestamps"
);
export function getTimeStamps(): TIMESTAMP {
  try {
    // fetching files path
    let filesPath: string[] = fetchFilesPath(pathToTimeStamps);

    let arrayOfFileContent: string[] = [];

    filesPath.forEach((item) => {
      // if file path exists then read it
      if (item) {
        let fileString = readFile(item);
        // if  file has some data in it then push data into array
        if (fileString) {
          arrayOfFileContent.push(fileString);
        }
      }
    });

    let arrayOfTimeStamps = [];

    if (arrayOfFileContent.length) {
      arrayOfFileContent.forEach((item) => {
        // if file has some data in it then push data into array
        if (item) {
          // induvisual time stamp array
          let induvisualTimeStamp = item.split(" ");
          // pushing all time stamp into single array
          arrayOfTimeStamps = arrayOfTimeStamps.concat(induvisualTimeStamp);
        }
      });
    }

    let timestamps: TIMESTAMP = {};

    // converting array of time stamp into timestamps object
    for (let i = 0; i < arrayOfTimeStamps.length - 1; i++) {
      if (arrayOfTimeStamps[i]) {
        timestamps[arrayOfTimeStamps[i]] = arrayOfTimeStamps[i];
      }
    }
    return timestamps;
  } catch (error: any) {
    console.log("Error While retrieving timestamps", error.message);
  }
}
