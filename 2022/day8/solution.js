const fs = require("fs");

const grid = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .split("\n")
  .map((row) => row.split("").map(Number));

const isVisible = (x, y) => {
  const value = grid[y][x];

  const treesOnTheLeft = grid[y].slice(0, x).filter((tree) => tree >= value);
  const treesOnTheRight = grid[y].slice(x + 1).filter((tree) => tree >= value);
  const treesAbove = grid
    .slice(0, y)
    .map((row) => row[x])
    .filter((tree) => tree >= value);
  const treesBelow = grid
    .slice(y + 1)
    .map((row) => row[x])
    .filter((tree) => tree >= value);

  return (
    treesOnTheLeft.length *
    treesOnTheRight.length *
    treesAbove.length *
    treesBelow.length
  );
};

const getVisibilityMap = () => {
  return grid.map((row, i) => row.map((cell, j) => isVisible(j, i)));
};

// PART 1 **********************************************************************

const part1 = () => {
  const visibilityMap = getVisibilityMap();

  let sum = 0;
  visibilityMap.forEach((row) => {
    row.forEach((cell) => {
      if (cell) {
        sum++;
      }
    });
  });
  return visibilityMap.length * visibilityMap[0].length - sum;
};

// PART 2 **********************************************************************

const getVisibleTrees = (trees, heightCurrentTree) => {
  if (Math.max(...trees) < heightCurrentTree) return trees.length;
  return trees.findIndex((t) => t >= heightCurrentTree) + 1;
};

const visibilityScore = (x, y) => {
  const heightCurrentTree = grid[y][x];

  const treesOnTheLeft = grid[y].slice(0, x).reverse();
  const treesOnTheRight = grid[y].slice(x + 1);
  const treesAbove = grid
    .slice(0, y)
    .map((row) => row[x])
    .reverse();
  const treesBelow = grid.slice(y + 1).map((row) => row[x]);

  const scores = [treesOnTheLeft, treesOnTheRight, treesAbove, treesBelow].map(
    (trees) => {
      return getVisibleTrees(trees, heightCurrentTree);
    }
  );

  return scores.reduce((a, b) => a * b, 1);
};

const getVisibilityScoreMap = () => {
  return grid.map((row, i) => row.map((cell, j) => visibilityScore(j, i)));
};

const part2 = () => {
  const visibilityMap = getVisibilityScoreMap();
  let highestScenicScore = 0;
  visibilityMap.forEach((row) => {
    row.forEach((cell) => {
      if (cell > highestScenicScore) {
        highestScenicScore = cell;
      }
    });
  });

  return highestScenicScore;
};

console.log(part1());
console.log(part2());
