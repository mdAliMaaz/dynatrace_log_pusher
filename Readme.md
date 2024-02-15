# This function will return path for every file in the directory

```javascript
import fs from "fs";
import path from "path";

export const fetchFilesPath = (dirPath: string, arrayOfFiles?: []): [] => {
  try {
    // reading directory here
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((item) => {
      if (fs.statSync(`${dirPath}/${item}`).isDirectory()) {
        // if item is directory  calling same function again
        arrayOfFiles = fetchFilesPath(`${dirPath}/${item}`, arrayOfFiles);
      } else {
        // if its a file then pushing to array
        arrayOfFiles.push(path.join(dirPath, "/", item));
      }
    });
    // finally rettuning the array of files
    return arrayOfFiles;
  } catch (error) {
    console.log("Error While fetching files");
    return;
  }
};
```

# Function Which returns each file data

```javascript
import fs from "fs";

export function readFile(filePath: string): string {
  try {
    //reading each log file and returing it;
    const data = fs.readFileSync(filePath, "utf-8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}
```
