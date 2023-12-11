import { counting } from "radash";
import { identity } from "ramda";
import { HandType } from "./HandType";

export class Hand {
  static cardValues: Record<string, number> = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10
  };

  static cardValuesWithJoker: Record<string, number> = {
    A: 13,
    K: 12,
    Q: 11,
    T: 10,
    J: 1
  };

  readonly handType: HandType;

  constructor(
    public readonly rawCards: string,
    public readonly cards: ReadonlyArray<number>,
    public readonly bid: number,
    withJokers: boolean = false
  ) {
    this.handType = withJokers ? this.getHandTypeWithJokers() : this.getHandTypeWithoutJokers();
  }

  getHandTypeWithoutJokers() {
    const cardsToUse = this.cards.filter((card) => card != 1);

    const counter: Record<number, number> = counting(cardsToUse, identity);
    const values = Object.values(counter);

    if (this.isFiveOfKind(cardsToUse, values)) return HandType.FiveOfAKind;
    if (this.isFourOfKind(values)) return HandType.FourOfAKind;
    if (this.isFullHouse(values)) return HandType.FullHouse;
    if (this.isThreeOfKind(values)) return HandType.ThreeOfAKind;
    if (this.isPairOfTwo(values)) return HandType.TwoPair;
    if (this.isPairOfOne(values)) return HandType.OnePair;

    return HandType.HighCard;
  }

  getHandTypeWithJokers(): HandType {
    const handType = this.getHandTypeWithoutJokers();
    const numberOfJokersInHand = this.numberOfJokersInHand;

    switch (numberOfJokersInHand) {
      case 5:
        return HandType.FiveOfAKind;
      case 4:
        return HandType.FiveOfAKind;
      case 3:
        if (handType === HandType.OnePair) return HandType.FiveOfAKind;
        return HandType.FourOfAKind;
      case 2:
        if (handType === HandType.HighCard) return HandType.ThreeOfAKind;
        if (handType === HandType.OnePair) return HandType.FourOfAKind;
        return HandType.FiveOfAKind;
      case 1:
        if (handType === HandType.HighCard) return HandType.OnePair;
        if (handType === HandType.OnePair) return HandType.ThreeOfAKind;
        if (handType === HandType.TwoPair) return HandType.FullHouse;
        if (handType === HandType.ThreeOfAKind) return HandType.FourOfAKind;
        return HandType.FiveOfAKind;
      default:
        return handType;
    }
  }

  private isFiveOfKind(cardsToUse: Array<number>, values: Array<number>) {
    return cardsToUse.length === 5 && values.length === 1;
  }

  private isFourOfKind(values: Array<number>) {
    return values.some((value) => value === 4);
  }

  private isFullHouse(values: Array<number>) {
    return values.includes(3) && values.includes(2);
  }

  private isThreeOfKind(values: Array<number>) {
    return values.includes(3);
  }

  private isPairOfTwo(values: Array<number>) {
    return values.filter((value) => value === 2).length === 2;
  }

  private isPairOfOne(values: Array<number>) {
    return values.filter((value) => value === 2).length === 1;
  }

  get numberOfJokersInHand(): number {
    return this.cards.filter((card) => card === 1).length;
  }
}
