import { Log } from "./applyRegEx";

export function batchMaker(payload: Log[], batchSize: number): string[] {
  let batchs: string[] = [];
  for (let i = 0; i < payload.length - 1; i += batchSize) {
    const batch = payload.slice(i, i + batchSize);
    batchs.push(JSON.stringify(batch));
  }

  return batchs;
}
