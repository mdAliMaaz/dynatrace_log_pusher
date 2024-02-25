import { Log } from "./applyRegEx";

export function checkForDublicate(timestamps: {}, validLogs: Log[]): Log[] {
  if (validLogs.length <= 0) {
    return [];
  }
  let unPushedLogs: Log[] = [];

  if (isEmpty(timestamps)) {
    // if no timestamp then upPushed logs is  equal to payload
    unPushedLogs = validLogs;
  } else {
    // if there is timestamp then we need to check if there is any unPushed logs if so then push them unPushed logs array
    validLogs.forEach((item) => {
      if (timestamps.hasOwnProperty(item.timestamp)) {
      } else {
        unPushedLogs.push(item);
      }
    });
  }
  return unPushedLogs;
}

function isEmpty(obj: {}) {
  return Object.keys(obj).length === 0;
}
