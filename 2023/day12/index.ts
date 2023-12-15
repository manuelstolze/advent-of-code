import { readFileSync } from "node:fs";
import { sum } from "../util";
import { extractSymbolsAndGroupOrder, getPossibleArrangements } from "./src/functions";

function readLines(filePath: string) {
  return readFileSync(filePath, "utf-8").trim().split("\n");
}

function part1(filePath: string) {
  const damagedRecordsData = readLines(filePath).map(extractSymbolsAndGroupOrder);
  return sum(damagedRecordsData.map((damagedRecord) => getPossibleArrangements(...damagedRecord)));
}

function part2(filePath: string) {
  const damagedRecordsData = readLines(filePath).map(extractSymbolsAndGroupOrder);

  return sum(
    damagedRecordsData.map(([symbols, groupOrders]) => {
      // Create an array with length of 6, repeat the pattern 5 times and then slice the last "?"
      const fiveTimesSymbols = Array(6).join(`${symbols}?`).slice(0, -1);
      // Create an array with length of 5, fill each element of the array with the grouporders array then flat it so all
      // the is only a one level array left
      const fiveTimesGroupOrder = Array(5).fill(groupOrders).flat();

      return getPossibleArrangements(fiveTimesSymbols, fiveTimesGroupOrder);
    })
  );
}

console.log(part1(`${__dirname}/src/example.txt`));
console.log(part1(`${__dirname}/src/input.txt`));

console.log(part2(`${__dirname}/src/example.txt`));

console.time("Part 2");
console.log(part2(`${__dirname}/src/input.txt`));
console.timeEnd("Part 2");
