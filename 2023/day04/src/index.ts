import inputFile from "./input";
import { Card } from "./Card";
import { counting } from "radash";

function parseFile() {
  const data = inputFile.split("\n");

  return data.map((line) => {
    const [rawId, data] = line.split(": ");
    const [winningNumberString, ourNumberString] = data.split(" | ");

    const id = Number(rawId.replace("Card ", ""));
    const winningNumbers = extractNumbersFromString(winningNumberString);
    const ourNumbers = extractNumbersFromString(ourNumberString);

    return new Card(id, winningNumbers, ourNumbers);
  });
}

function extractNumbersFromString(inputString: string) {
  const numbers = inputString.match(/\d+/g);

  if (!numbers) {
    return [];
  }

  return numbers.map(Number);
}

const part1 = () => {
  return parseFile()
    .map((card) => card.sumOfPoints)
    .reduce((acc, value) => acc + value, 0);
};

const part2 = () => {
  const cards = parseFile();
  const counter = counting(cards, (card) => card.id);

  cards.forEach((card) => {
    card.winningCopiesIds.forEach((id) => {
      counter[id] += counter[card.id];
    });
  });

  return Object.values(counter).reduce((acc, count) => acc + count, 0);
};

console.log(part1());
console.log(part2());
