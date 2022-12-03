const fs = require("fs");

const rounds = fs.readFileSync(`${__dirname}/input.txt`, "utf8").split("\n");

const resultsPerShape = {
  X: { points: 1, outcome: { A: 3, B: 0, C: 6 } },
  Y: { points: 2, outcome: { A: 6, B: 3, C: 0 } },
  Z: { points: 3, outcome: { A: 0, B: 6, C: 3 } },
};

const resultsPerOutcome = {
  X: { points: 0, outcome: { A: 3, B: 1, C: 2 } },
  Y: { points: 3, outcome: { A: 1, B: 2, C: 3 } },
  Z: { points: 6, outcome: { A: 2, B: 3, C: 1 } },
};

const getShapes = (round) => {
  return round.split(" ");
};

const getScore = (scoreTable) => {
  let score = 0;

  rounds.forEach((round) => {
    const [theirShape, myShape] = getShapes(round);
    score +=
      scoreTable[myShape].outcome[theirShape] + scoreTable[myShape].points;
  });

  return score;
};

console.log(getScore(resultsPerShape));
console.log(getScore(resultsPerOutcome));
