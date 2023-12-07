import { range } from "radash";

export class Race {
  constructor(private readonly time: number, private readonly distance: number) {}

  get winnableSeconds(): number {
    const distances: Array<number> = [];

    for (let i of range(0, this.time)) {
      const remainingTime = this.time - i;
      distances.push(remainingTime * i);
    }

    return distances.filter((distance) => distance > this.distance).length;
  }
}
