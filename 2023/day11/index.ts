import { sum } from "../util";
import example from "./src/example";
import { Universe } from "./src/Universe";
import input from "./src/input";

function readGalaxyImage(content: string) {
  const rawLines = content.replace(/\r\n/g, "\n").split("\n");
  return rawLines.map((n) => n.split(""));
}

function part1(content: string) {
  const images = readGalaxyImage(content);
  const universe = new Universe(images);

  return sum(universe.getDistances(2));
}

function part2(content: string) {
  const images = readGalaxyImage(content);
  const universe = new Universe(images);

  return sum(universe.getDistances(1000000));
}

console.log(part1(example));
console.log(part1(input));
console.log(part2(example));
console.log(part2(input));
