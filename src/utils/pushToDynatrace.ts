import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { Log } from "./applyRegEx";

dotenv.config();

const apiUrl = process.env.API_URL;

const apiToken = process.env.API_TOKEN;

export async function pushToDynatrace(
  // logs: Log[]
  logs: any
): Promise<AxiosResponse<any, any> | null> {
  try {
    const response = await axios.post(apiUrl!, logs, {
      headers: {
        Authorization: `Api-Token ${apiToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Status", response.status);
    return response;
  } catch (error: any) {
    console.log(error);
    console.log("Error while pushing logs to Dynatrace", error.message);
    return null;
  }
}
