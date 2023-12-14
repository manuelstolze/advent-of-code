type Image = string[][];
type EmptySpace = { rows: Set<number>; cols: Set<number> };
type Galaxy = { x: number; y: number };

class Universe {
  private emptySpace: EmptySpace;

  constructor(public image: Readonly<Image>) {}

  get emptySpaces(): EmptySpace {
    const rows = this.image.reduce((acc, row, index) => {
      if (row.every((n) => n === ".")) {
        acc.add(index);
      }
      return acc;
    }, new Set<number>());

    const cols = this.image[0].reduce((acc, _col, colIdx) => {
      if (this.image.every((row) => row[colIdx] === ".")) {
        acc.add(colIdx);
      }
      return acc;
    }, new Set<number>());

    return { rows: rows, cols: cols } as EmptySpace;
  }

  get galaxies(): Array<Galaxy> {
    const galaxies = [];

    for (let y = 0; y < this.image.length; y++) {
      for (let x = 0; x < this.image[y].length; x++) {
        if (this.image[y][x] === "#") {
          galaxies.push({ x, y });
        }
      }
    }

    return galaxies;
  }

  getDistances(expansionRate: number) {
    const distances: number[] = [];
    const galaxies = this.galaxies;

    for (let i = 0; i < galaxies.length; i++) {
      for (let j = i + 1; j < galaxies.length; j++) {
        distances.push(this.getDistance(galaxies[i], galaxies[j], expansionRate));
      }
    }

    return distances;
  }

  private getDistance(a: Galaxy, b: Galaxy, expansionRate: number) {
    const baseDistance = this.getBaseDistance(a, b);
    const baseEmptySpaces = this.emptySpaces;

    const emptySpaceCount = [
      { emptyIndicesSet: baseEmptySpaces.rows, dimension: "y" as const },
      { emptyIndicesSet: baseEmptySpaces.cols, dimension: "x" as const }
    ].reduce(
      (sum, { emptyIndicesSet, dimension }) =>
        sum + this.countEmptySpaceBetween(a, b, emptyIndicesSet, dimension),
      0
    );

    return baseDistance + emptySpaceCount * (expansionRate - 1);
  }

  private getBaseDistance(a: Galaxy, b: Galaxy) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  private countEmptySpaceBetween(
    a: Galaxy,
    b: Galaxy,
    emptyIndicesSet: Set<number>,
    dimension: "x" | "y"
  ) {
    let count = 0;
    let minIdx = Math.min(a[dimension], b[dimension]);
    let maxIdx = Math.max(a[dimension], b[dimension]);

    for (let idx = minIdx + 1; idx < maxIdx; idx++) {
      if (emptyIndicesSet.has(idx)) {
        count++;
      }
    }

    return count;
  }
}

export { Universe };
