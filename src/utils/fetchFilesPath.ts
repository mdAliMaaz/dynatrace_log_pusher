import fs from "fs";
import path from "path";

export const fetchFilesPath = (
  dirPath: string,
  arrayOfFiles?: string[]
): string[] => {
  try {
    // reading directory here
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((item) => {
      if (fs.statSync(`${dirPath}/${item}`).isDirectory()) {
        // if item is directory  calling same function again
        arrayOfFiles = fetchFilesPath(`${dirPath}/${item}`, arrayOfFiles);
      } else {
        // let file = path.join(dirPath, "/", item);
        //@ts-ignore
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
