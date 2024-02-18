import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { Log } from "./applyRegEx";
import { writeTimestamp } from "./writeTimeStamp";

dotenv.config();

const apiUrl = process.env.API_URL;

const apiToken = process.env.API_TOKEN;

export async function pushToDynatrace(
  logs: Log[]
): Promise<AxiosResponse<any, any> | null> {
  if (!logs) {
    console.log("N0 logs available to pushToDynatrace");
    return null;
  }
  try {
    const response = await axios.post(apiUrl!, logs, {
      headers: {
        Authorization: `Api-Token ${apiToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response) {
      if (response.status >= 200 && response.status < 300) {
        console.log("Status:", response.status);
        // if request was successful then write down timestamps of each log
        logs.forEach((item) => writeTimestamp(item.timestamp));
      }
    }
    return response;
  } catch (error: any) {
    console.log(error);
    console.log("Error while pushing logs to Dynatrace", error.message);
    return null;
  }
}
