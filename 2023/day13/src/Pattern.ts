type ReflectionLineOfType = {
    index: number,
    diffsCount: number
}

class Pattern {

    constructor(public readonly vector: ReadonlyArray<ReadonlyArray<string>>) {
    }

    get columns() {
        return this.vector[0].map((_char, index) => this.vector.map((row) => row[index]))
    }

    getReflectionLine(expectedDifferences: number): { index: number; isVertical: boolean } {
        let isVertical = false;

        // Check horizontal first
        const horizontalReflectionLine = this.findReflectionLineOfType(isVertical, expectedDifferences)
        if (horizontalReflectionLine) return {index: horizontalReflectionLine.index, isVertical}

        isVertical = true;

        const verticalReflectionLine = this.findReflectionLineOfType(isVertical, expectedDifferences);

        if (verticalReflectionLine) {
            return {index: verticalReflectionLine.index, isVertical};
        }


        Pattern.displayPattern(this.vector as string[][])
        throw 'no reflection line found';
    }

    private findReflectionLineOfType(isVertical: boolean, expectedDiffs: number): ReflectionLineOfType {
        return this.getEqualLines(isVertical, expectedDiffs).find(({index, diffsCount}) =>
            this.isReflectionLine(index, diffsCount, isVertical, expectedDiffs))
    }

    private isReflectionLine(index: number, differenceCount: number, isVertical: boolean, expectedDiffs: number) {
        let patternDifferenceCount = differenceCount;
        let offset = 1;


        const patternLines = isVertical ? this.columns : this.vector;

        const nextOnLeft = (offset: number) => patternLines[index - offset];
        const nextOnRight = (offset: number) => patternLines[index + 1 + offset]

        let leftLine = nextOnLeft(offset);
        let rightLine = nextOnRight(offset);

        while (!!leftLine && !!rightLine) {
            patternDifferenceCount += this.countDifferences(leftLine, rightLine);
            offset++;

            leftLine = nextOnLeft(offset);
            rightLine = nextOnRight(offset);
        }

        return patternDifferenceCount === expectedDiffs;
    }

    private getEqualLines(isVertical: boolean, expectedDifferences: number) {
        const patternLines = isVertical ? this.columns : this.vector;

        return patternLines.reduce<Array<ReflectionLineOfType>>(
            (equalPairIndices, line, i) => {
                const nextLine = patternLines[i + 1];
                if (!nextLine) {
                    return equalPairIndices;
                }

                const diffsCount = this.countDifferences(line, nextLine);

                if ([0, expectedDifferences].includes(diffsCount)) {
                    equalPairIndices.push({index: i, diffsCount});
                }

                return equalPairIndices;
            },
            []
        );
    }

    private countDifferences(lineA: ReadonlyArray<string>, lineB: ReadonlyArray<string>): number {
        return lineA.reduce((diffsCount, a, i) => (a === lineB[i] ? diffsCount : diffsCount + 1), 0)
    }

    static displayPattern(pattern: string[][]) {
        pattern.forEach((row) => {
            console.log(row.join(''));
        });
    }
}

export {Pattern}