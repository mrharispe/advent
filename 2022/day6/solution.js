const fs = require("fs");

const datastream = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

const findFirstUniqueSequence = (length) => {
  for (let i = 0; i < datastream.length; i++) {
    const sequence = datastream.slice(i, i + length);
    const unique = new Set(sequence);
    if (unique.size === length) {
      return i + length;
    }
  }
};

// PART 1 **********************************************************************

const part1 = () => {
  return findFirstUniqueSequence(4);
};

// PART 2 **********************************************************************

const part2 = () => {
  return findFirstUniqueSequence(14);
};

console.log(part1());
console.log(part2());
