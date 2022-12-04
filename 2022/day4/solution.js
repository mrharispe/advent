const fs = require("fs");

const sectionAssignments = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .split("\n");

const getAssignmentsByElf = (sectionAssignment) => {
  return sectionAssignment.split(",");
};

const getMinAndMaxFromAssignment = (assignment) => {
  return assignment.split("-").map((num) => parseInt(num));
};

// PART 1 **********************************************************************

const part1 = () => {
  let fullAssignmentOverlaps = 0;

  sectionAssignments.forEach((sectionAssignment) => {
    const [assignemntsElfOne, assignemntsElfTwo] =
      getAssignmentsByElf(sectionAssignment);

    const [minElfOne, maxElfOne] =
      getMinAndMaxFromAssignment(assignemntsElfOne);
    const [minElfTwo, maxElfTwo] =
      getMinAndMaxFromAssignment(assignemntsElfTwo);

    if (minElfOne <= minElfTwo && maxElfOne >= maxElfTwo) {
      fullAssignmentOverlaps++;
    } else if (minElfTwo <= minElfOne && maxElfTwo >= maxElfOne) {
      fullAssignmentOverlaps++;
    }
  });

  return fullAssignmentOverlaps;
};

// PART 2 **********************************************************************

const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

const part2 = () => {
  let partialAssignmentOverlaps = 0;

  sectionAssignments.forEach((sectionAssignment) => {
    const [assignemntsElfOne, assignemntsElfTwo] =
      getAssignmentsByElf(sectionAssignment);

    const [minElfOne, maxElfOne] =
      getMinAndMaxFromAssignment(assignemntsElfOne);
    const [minElfTwo, maxElfTwo] =
      getMinAndMaxFromAssignment(assignemntsElfTwo);

    if (
      isInRange(minElfOne, minElfTwo, maxElfTwo) ||
      isInRange(maxElfOne, minElfTwo, maxElfTwo)
    ) {
      partialAssignmentOverlaps++;
    } else if (
      isInRange(minElfTwo, minElfOne, maxElfOne) ||
      isInRange(maxElfTwo, minElfOne, maxElfOne)
    ) {
      partialAssignmentOverlaps++;
    }
  });

  return partialAssignmentOverlaps;
};

console.log(part1());
console.log(part2());
