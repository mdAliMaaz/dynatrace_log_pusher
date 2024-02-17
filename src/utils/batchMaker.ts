import { Log } from "./applyRegEx";

export function batchMaker(unPushedLogs: Log[], batchSize: number): Log[][] {
  if (unPushedLogs.length <= 0) {
    return [];
  }
  let batchs: Log[][] = [];
  for (let i = 0; i < unPushedLogs.length - 1; i += batchSize) {
    const batch = unPushedLogs.slice(i, i + batchSize);
    if (batch) {
      batchs.push(batch);
    }
  }

  return batchs;
}
