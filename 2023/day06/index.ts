import example from "./src/example";
import input from "./src/input";
import { zip } from "radash";
import { Race } from "./src/Race";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function parseFile(file: string) {
  const [rawTimes, rawDistances] = file.split("\n");

  const times = rawTimes.split(":")[1].trim().split(/\s+/);
  const distances = rawDistances.split(":")[1].trim().split(/\s+/);

  return zip(times, distances).map(([time, distance]) => {
    return new Race(Number(time), Number(distance));
  });
}

const part1 = (file: string) => {
  return parseFile(file).reduce((acc, race) => {
    return acc * race.winnableSeconds;
  }, 1);
};

const part2 = (file: string) => {
  const [time, distance] = file
    .split("\n")
    .map((line) => {
      return line.split(":")[1].trim().replace(/\s+/g, "");
    })
    .map((line) => Number(line));

  return new Race(time, distance).winnableSeconds;
};

console.log("Part 1 - Example", part1(example));
console.log("Part 1 - Input", part1(input));

console.log("Part 2 - Example", part2(example));
console.log("Part 2 - Input", part2(input));
