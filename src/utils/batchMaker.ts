import { Log } from "./applyRegEx";

export function batchMaker(payload: Log[], batchSize: number): Log[][] {
  let batchs: Log[][] = [];
  for (let i = 0; i < payload.length - 1; i += batchSize) {
    const batch = payload.slice(i, i + batchSize);
    if (batch) {
      batchs.push(batch);
    }
  }

  return batchs;
}
