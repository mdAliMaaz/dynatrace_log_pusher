import { readFile } from "./readFile";

type TIMESTAMP = { [key: string]: string };

export function getTimeStamps(path: string): TIMESTAMP {
  try {
    let timestampString = readFile(path);

    let timeStampArray: string[] = timestampString.trim().split(" ");

    let timestamps: TIMESTAMP = {};

    for (let i = 0; i < timeStampArray.length - 1; i++) {
      timestamps[timeStampArray[i]] = timeStampArray[i];
    }

    return timestamps;
  } catch (error: any) {
    console.log("Error While retrieving timestamps", error.message);
  }
}
