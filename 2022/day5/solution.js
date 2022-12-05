const fs = require("fs");

const [stacksData, movesData] = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .split("\n\n")
  .map((x) => x.split("\n"));

const stacks = {};

const stacksInSlices = stacksData.map((line) =>
  // There are 4 characters before the next stack, and the digit is character 1
  // i.e.: "[A] "
  [...line].filter((value, index) => index % 4 === 1)
);

stacksInSlices.forEach((column) => {
  column.forEach((stack, index) => {
    if (!stacks[index]) {
      stacks[index] = [];
    }

    if (stack.trim()) {
      stacks[index].unshift(stack);
    }
  });
});

const getTopCrates = (stacks) => {
  let topCrates = "";
  Object.keys(stacks).forEach((i) => {
    const stack = stacks[i];
    topCrates += stack[stack.length - 1];
  });

  return topCrates;
};

// PART 1 **********************************************************************
const cleanMove = (move) => {
  return move
    .replace("move ", "")
    .replace(" from ", ";")
    .replace(" to ", ";")
    .split(";");
};

const part1 = () => {
  const stacksClone = JSON.parse(JSON.stringify(stacks));
  movesData.forEach((move) => {
    const [stacksToMove, from, to] = cleanMove(move);

    for (let i = 0; i < stacksToMove; i++) {
      const crate = stacksClone[from - 1].pop();
      stacksClone[to - 1].push(crate);
    }
  });

  return getTopCrates(stacksClone);
};

// PART 2 **********************************************************************

const part2 = () => {
  const stacksClone = JSON.parse(JSON.stringify(stacks));

  movesData.forEach((move) => {
    const [stacksToMove, from, to] = cleanMove(move);

    const crates = stacksClone[from - 1].splice(-stacksToMove);
    stacksClone[to - 1] = [...stacksClone[to - 1], ...crates];
  });

  return getTopCrates(stacksClone);
};

console.log(part1());
console.log(part2());
