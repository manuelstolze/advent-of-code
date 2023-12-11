import example from "./src/example";
import input from "./src/input";
import { Hand } from "./src/Hand";

const readHands = (fileContent: string, withJokers: boolean = false) => {
  const hands = fileContent
    .trim()
    .split("\n")
    .map((line) => {
      const [rawCards, bid] = line.split(" ");
      const cardValues = withJokers ? Hand.cardValuesWithJoker : Hand.cardValues;

      return new Hand(
        rawCards,
        rawCards.split("").map((card) => cardValues[card] ?? Number(card)),
        Number(bid),
        withJokers
      );
    });

  hands.sort((lhs, rhs) => {
    const coefficient = lhs.handType - rhs.handType;

    if (coefficient === 0) {
      for (let i = 0; i < 5; i++) {
        const cardCoefficient = lhs.cards[i] - rhs.cards[i];

        if (cardCoefficient !== 0) {
          return cardCoefficient;
        }
      }
    }

    return coefficient;
  });

  return hands.reduce((acc, hand, currentIndex) => {
    return acc + hand.bid * (currentIndex + 1);
  }, 0);
};

console.log(readHands(example));
console.log(readHands(input));

console.log(readHands(example, true));
console.log(readHands(input, true));
