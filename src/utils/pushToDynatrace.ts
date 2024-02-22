import dotenv from "dotenv";
import { Log } from "./applyRegEx";
import { writeTimestamp } from "./writeTimeStamp";

dotenv.config();

const apiUrl = process.env.API_URL;

const apiToken = process.env.API_TOKEN;

export async function pushToDynatrace(logs: Log[]): Promise<Response | null> {
  if (!logs) {
    console.log("No logs available to pushToDynatrace");
    return null;
  }
  try {
    const response = await fetch(apiUrl!, {
      method: "POST",
      headers: {
        Authorization: `Api-Token ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logs),
    });
    if (response.ok) {
      console.log("Status:", response.status);
      // if request was successful then write down timestamps of each log
      logs.forEach((item) => writeTimestamp(item.timestamp));
    }
    return response;
  } catch (error: any) {
    console.log("Error while pushing logs to Dynatrace", error.message);
    return null;
  }
}
