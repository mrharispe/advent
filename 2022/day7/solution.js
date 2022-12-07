const fs = require("fs");

const terminalOutput = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .split("\n");

const getFileSystemTree = () => {
  const tree = {
    "/": { folders: {}, size: 0, previousDirectory: {}, name: "/" },
  };
  let currentDirectory = tree["/"];

  for (let i = 0; i < terminalOutput.length; i++) {
    const output = terminalOutput[i];
    if (output === "$ cd /") {
      currentDirectory = tree["/"];
    } else if (output === "$ cd ..") {
      currentDirectory = currentDirectory.previousDirectory;
    } else if (output.startsWith("$ cd ")) {
      const newDirectory = output.substring(5, output.length);
      if (!currentDirectory.folders[newDirectory]) {
        currentDirectory.folders[newDirectory] = {
          folders: {},
          size: 0,
          name: newDirectory,
        };
      }
      const previousDirectory = currentDirectory;
      currentDirectory = currentDirectory.folders[newDirectory];
      currentDirectory.previousDirectory = previousDirectory;
    } else if (output !== "$ ls" && !output.startsWith("dir")) {
      const [fileSize, fileName] = output.split(" ");

      currentDirectory.size += parseInt(fileSize);
    }
  }

  return tree;
};

let tree;

const getFolderSize = (folder) => {
  let size = folder.size;
  Object.keys(folder.folders).forEach((subFolder) => {
    size += getFolderSize(folder.folders[subFolder]);
  });
  return size;
};

const fixFolderSizes = (folderContents) => {
  let sum = folderContents.size;

  Object.keys(folderContents.folders).forEach((subFolderName) => {
    const subFolder = folderContents.folders[subFolderName];
    const folderSize = fixFolderSizes(subFolder);
    subFolder.size = folderSize;
    sum += subFolder.size;
  });

  return sum;
};

const getSumOfSizes = (folderContents, maxSize) => {
  let sum = folderContents.size <= maxSize ? folderContents.size : 0;

  Object.keys(folderContents.folders).forEach((subFolderName) => {
    const subFolder = folderContents.folders[subFolderName];
    const sumOfSizes = getSumOfSizes(subFolder, maxSize);
    sum += sumOfSizes;
  });
  return sum;
};

// PART 1 **********************************************************************

const part1 = () => {
  tree = getFileSystemTree();
  fixFolderSizes(tree["/"], 100000);
  return getSumOfSizes(tree["/"], 100000);
};

// PART 2 **********************************************************************

const getFolderToDelete = (folderContents, minSize) => {
  let folderToDelete;

  Object.keys(folderContents.folders).forEach((subFolderName) => {
    const subFolder = folderContents.folders[subFolderName];
    if (
      subFolder.size > minSize &&
      (!folderToDelete || subFolder.size < folderToDelete.size)
    ) {
      folderToDelete = getFolderToDelete(subFolder, minSize) || subFolder;
    }
  });

  return folderToDelete;
};

const part2 = () => {
  tree = getFileSystemTree();
  const TOTAL_SPACE = 70000000;
  const MIN_UNUSED_SPACE = 30000000;
  tree["/"].size = fixFolderSizes(tree["/"], 10000000000000000000);
  const spaceToFree = MIN_UNUSED_SPACE - (TOTAL_SPACE - tree["/"].size);
  return getFolderToDelete(tree["/"], spaceToFree).size;
};

console.log(part1());
console.log(part2());
