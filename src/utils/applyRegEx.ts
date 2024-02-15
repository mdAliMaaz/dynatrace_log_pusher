export interface Log {
  level: string;
  timestamp: string;
  class: string;
  Context: string;
  "Instance ID": string;
  "Thread Name": string;
  Message: string;
}

export function applyRegEx(logString: string): Log | undefined {
  const regex =
    /^(WARN|ERROR|INFO)\s+(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3})\s+([^\s]+)\s+(.*)$/;

  const match = logString.match(regex);

  if (match) {
    const [, level, timestamp, instanceId, threadName, Message] = match;

    let item = threadName.split(" ");

    return {
      level: level,
      timestamp,
      class: item[1],
      Context: `${item[2] || null} ${item[3] || null} ${item[4] || null}`,
      "Instance ID": instanceId,
      "Thread Name": threadName.split(" ")[0],
      Message: `${item[5] || null} ${item[6] || null} ${item[7] || null}`,
    };
  } else {
    // console.log("No match found");
  }
}
