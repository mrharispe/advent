const fs = require("fs");

const rucksacks = fs.readFileSync(`${__dirname}/input.txt`, "utf8").split("\n");

const getPriority = (item) => {
  if (item === item.toLowerCase()) {
    return item.charCodeAt(0) - 96;
  }
  return item.charCodeAt(0) - 38;
};

// PART 1 **********************************************************************

const getRucksacksSplitByCompartment = () => {
  return rucksacks.map((rucksack) => {
    const length = rucksack.length;
    const halfway = length / 2;
    return [
      rucksack.substring(0, halfway),
      rucksack.substring(halfway, length),
    ];
  });
};

const part1 = () => {
  let sumOfPriorities = 0;
  const rucksacksByCompartment = getRucksacksSplitByCompartment();

  rucksacksByCompartment.forEach((rucksack) => {
    const firstCompartment = new Set(rucksack[0]);
    const secondCompartment = new Set(rucksack[1]);
    const duplicatedItem = [...firstCompartment].find((x) =>
      secondCompartment.has(x)
    );

    sumOfPriorities += getPriority(duplicatedItem);
  });

  return sumOfPriorities;
};

// PART 2 **********************************************************************

const getRucksacksSplitByGroupOfThree = () => {
  const rucksacksByGroupOfThree = [];
  for (let i = 0; i < rucksacks.length; i += 3) {
    rucksacksByGroupOfThree.push([
      rucksacks[i],
      rucksacks[i + 1],
      rucksacks[i + 2],
    ]);
  }

  return rucksacksByGroupOfThree;
};

const part2 = () => {
  let sumOfPriorities = 0;
  const rucksacksByGroupOfThree = getRucksacksSplitByGroupOfThree();

  rucksacksByGroupOfThree.forEach((rucksack) => {
    const firstElf = new Set(rucksack[0]);
    const secondElf = new Set(rucksack[1]);
    const thirdElf = new Set(rucksack[2]);

    const badge = [...firstElf].find(
      (x) => secondElf.has(x) && thirdElf.has(x)
    );

    if (badge) {
      sumOfPriorities += getPriority(badge);
    }
  });

  return sumOfPriorities;
};

console.log(part1());
console.log(part2());
