import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiUrl = process.env.API_URL;

const apiToken = process.env.API_TOKEN;

export async function pushToDynatrace(
  logs: any
): Promise<AxiosResponse<any, any> | null> {
  try {
    const response = await axios.post(apiUrl!, logs, {
      headers: {
        Authorization: `Api-Token ${apiToken}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    console.log(response.data);
    return response;
  } catch (error: any) {
    console.log("Error while pushing logs to Dynatrace", error.message);
    return null;
  }
}
