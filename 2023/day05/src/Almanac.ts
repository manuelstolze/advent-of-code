import { SourceMap } from "module";
import { RangeSet } from "./RangeSet";
import { SourceRange } from "./SourceRange";

export const enum Category {
  Seed = "seed",
  Soil = "soil",
  Fertilizer = "fertilizer",
  Water = "water",
  Light = "light",
  Temperature = "temperature",
  Humidity = "humidity",
  Location = "location"
}

export class Almanac<T extends number | Range> {
  constructor(
    public readonly seeds: ReadonlyArray<T>,
    public readonly maps: ReadonlyArray<RangeSet>
  ) {}

  continuityBreakpoints(): ReadonlyArray<number> {
    // We're starting from 0 to whatever this is, because at the end
    // of the mappings we need to assume that every point of our function
    // is continuous.
    return this.maps.reduceRight(
      (seeds, map) => map.invertRanges(seeds),
      [0, Number.MAX_SAFE_INTEGER]
    );
  }

  /**
   * returns list of locations
   */
  processMapping(seeds: ReadonlyArray<number>): ReadonlyArray<number> {
    return seeds.map((seed) => {
      return this.maps.reduce((source, map) => {
        return map.convertToDestination(source);
      }, seed);
    });
  }
}
