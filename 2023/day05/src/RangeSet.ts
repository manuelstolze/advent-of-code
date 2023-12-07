import { SourceRange } from "./SourceRange";
import { Category } from "./Almanac";
import { first, unique } from "radash";
import { last } from "ramda";

export class RangeSet {
  constructor(
    public readonly source: Category,
    public readonly target: Category,
    public readonly ranges: ReadonlyArray<SourceRange>
  ) {}

  convertToDestination(source: number): number {
    for (const range of this.ranges) {
      if (range.containsSource(source)) {
        return range.convertToDestination(source);
      }
    }

    return source;
  }

  convertToSource(destination: number): number {
    for (const range of this.ranges) {
      if (range.containsDestination(destination)) {
        return range.convertToSource(destination);
      }
    }

    return destination;
  }

  invertRanges(initialBreakpoints: ReadonlyArray<number>): ReadonlyArray<number> {
    const allRangeBreakpoints = this.ranges
      .flatMap<[number, number]>((range) => {
        return [
          [range.destinationRangeStart, range.sourceRangeStart],
          [range.destinationRangeEnd - 1, range.sourceRangeEnd - 1]
        ];
      })
      .sort((lhs, rhs) => lhs[0] - rhs[0])
      .map((value) => value[1]);

    const sourceValues = initialBreakpoints.map((y) => this.convertToSource(y));
    sourceValues.sort();

    let inputBreakpoints = unique(allRangeBreakpoints);
    inputBreakpoints.sort();

    if (first(inputBreakpoints) > 0) {
      inputBreakpoints = [0, first(inputBreakpoints) - 1, ...inputBreakpoints];
    }

    if (last(inputBreakpoints) < Number.MAX_SAFE_INTEGER) {
      inputBreakpoints = [...inputBreakpoints, last(inputBreakpoints) + 1, Number.MAX_SAFE_INTEGER];
    }

    const calculatedBreakpoints = [...sourceValues, ...inputBreakpoints];
    calculatedBreakpoints.sort();

    return unique(calculatedBreakpoints);
  }
}
