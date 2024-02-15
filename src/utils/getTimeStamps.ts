import { readFile } from "./readFile";

type TIMESTAMP = { [ket: string]: string };

export function getTimeStamps(path: string): TIMESTAMP {
  try {
    let timestampString = readFile(path);

    let timeStampArray = timestampString.trim().split(" ");

    let timestamps = {};

    for (let i = 0; i < timeStampArray.length - 1; i++) {
      timestamps[timeStampArray[i]] = timeStampArray[i];
    }

    return timestamps;
  } catch (error: any) {
    console.log("Error While retrieving timestamps", error.message);
  }
}
