export interface Log {
  severity: string;
  timestamp: string;
  "custom.class": string;
  "custom.trace_id": string;
  "service.name": string;
  content: string;
}

export function applyRegEx(logString: string): Log | undefined {
  const regex =
    /^(WARN|ERROR|INFO)\s+(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3})\s+([^\s]+)\s+(.*)$/;

  const match = logString.match(regex);

  if (match) {
    const [, severity, timestamp, instanceId, threadName, message] = match;

    let item = threadName.split(" ");

    return {
      severity,
      timestamp,
      "custom.class": item[1],
      "custom.trace_id": instanceId,
      "service.name": threadName.split(" ")[0],
      content: `${item[5] || null} ${item[6] || null} ${item[7] || null}`,
    };
  } else {
    // console.log("No match found");
  }
}
