import {range} from "ramda";

export class Card {
    private readonly matchedNumbers: ReadonlyArray<number>;
    public readonly winningCopiesIds: ReadonlyArray<number>;

    constructor(
        public readonly id: number,
        public readonly winningNumbers: ReadonlyArray<number>,
        private readonly ourNumbers: ReadonlyArray<number>,
    ) {
        this.matchedNumbers = this.findMatchingNumbers(this.winningNumbers, this.ourNumbers);
        this.winningCopiesIds = range(this.id + 1, this.id + 1 + this.matchedNumbers.length)
    }

    get sumOfPoints(): number {
        if (this.matchedNumbers.length === 0) return 0;
        return Math.pow(2, this.matchedNumbers.length - 1)
    }

    private findMatchingNumbers<T>(array1: ReadonlyArray<T>, array2: ReadonlyArray<T>): ReadonlyArray<T> {
        return array1.filter(element => array2.includes(element));
    }
}