import { Log } from "./applyRegEx";

export function checkForDublicate(
  timestamps: {},
  unFilteredLogs: Log[]
): Log[] {
  if (unFilteredLogs.length <= 0) {
    return [];
  }
  let unPushedLogs: Log[] = [];

  const dublicateLogs = [];

  if (isEmpty(timestamps)) {
    // if no timestamp then upPushed logs is  equal to payload
    unPushedLogs = unFilteredLogs;
  } else {
    // if there is timestamp then we need to check if there is any unPushed logs if so then push them unPushed logs array
    unFilteredLogs.forEach((item) => {
      if (timestamps.hasOwnProperty(item.timestamp)) {
        dublicateLogs.push(item);
      } else {
        unPushedLogs.push(item);
      }
    });
  }
  // console.log("dublicate logs:", dublicateLogs.length);
  return unPushedLogs;
}

function isEmpty(obj: {}) {
  return Object.keys(obj).length === 0;
}
