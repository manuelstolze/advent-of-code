import { range } from "ramda";

export class SourceRange {
  private readonly difference: number;
  public readonly destinationRangeEnd: number;
  public readonly sourceRangeEnd: number;

  constructor(
    public readonly destinationRangeStart: number,
    public readonly sourceRangeStart: number,
    public readonly rangeLength: number
  ) {
    this.sourceRangeEnd = sourceRangeStart + rangeLength;
    this.destinationRangeEnd = destinationRangeStart + rangeLength;
    this.difference = destinationRangeStart - sourceRangeStart;
  }

  get destinations() {
    return range(this.destinationRangeStart, this.destinationRangeStart + this.rangeLength);
  }

  get source() {
    return range(this.sourceRangeStart, this.sourceRangeStart + this.rangeLength);
  }

  containsSource(source: number): boolean {
    return source >= this.sourceRangeStart && source <= this.sourceRangeEnd;
  }

  containsDestination(destination: number): boolean {
    return destination >= this.destinationRangeStart && destination <= this.destinationRangeEnd;
  }

  convertToDestination(source: number): number {
    return source + this.difference;
  }

  convertToSource(destination: number): number {
    return this.sourceRangeStart + (destination - this.destinationRangeStart);
  }
}
