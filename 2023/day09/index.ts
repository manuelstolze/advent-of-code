import { Sequence } from "./src/Sequence";
import example from "./src/example";
import input from "./src/input";

function readSequences(content: string) {
  return content
    .trim()
    .split("\n")
    .map((line) => {
      return line.split(" ").map(Number);
    })
    .map((data) => new Sequence(data));
}

const part1 = (content: string) => {
  return readSequences(content)
    .map((sequence) => sequence.getNextValue())
    .reduce((acc, value) => acc + value, 0);
};

const part2 = (content: string) => {
  return readSequences(content)
    .map((sequence) => sequence.getPreviousValue())
    .reduce((acc, value) => acc + value, 0);
};

console.log(part1(example));
console.log(part1(input));

console.log(part2(example));
console.log(part2(input));
