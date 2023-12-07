import example from "./src/example";
import input from "./src/input";
import { SourceRange } from "./src/SourceRange";
import { RangeSet } from "./src/RangeSet";
import { Almanac, Category } from "./src/Almanac";
import { Range } from "../util";

type SeedData = {
  id: number;
  soil: number;
  fertilizer: number;
  water: number;
  light: number;
  temperature: number;
  humidity: number;
  location: number;
};

enum MapKeys {
  "seedToSoil" = "seedToSoil",
  "soilToFertilizer" = "soilToFertilizer",
  "fertilizerToWater" = "fertilizerToWater",
  "waterToLight" = "waterToLight",
  "lightToTemperature" = "lightToTemperature",
  "temperatureToHumidity" = "temperatureToHumidity",
  "humidityToLocation" = "humidityToLocation"
}

const RawMapKeysLookup: Record<string, MapKeys> = {
  "seed-to-soil map:": MapKeys.seedToSoil,
  "soil-to-fertilizer map:": MapKeys.soilToFertilizer,
  "fertilizer-to-water map:": MapKeys.fertilizerToWater,
  "water-to-light map:": MapKeys.waterToLight,
  "light-to-temperature map:": MapKeys.lightToTemperature,
  "temperature-to-humidity map:": MapKeys.temperatureToHumidity,
  "humidity-to-location map:": MapKeys.humidityToLocation
};

function parseFile(file: string, seedsAsRange: boolean = false) {
  const [rawSeedsLine, ...rawMaps] = file.split("\n\n");
  const rawSeeds = rawSeedsLine.split(": ")[1];
  const seeds = seedsAsRange
    ? (parseSeedsAsRange(rawSeeds) as unknown as ReadonlyArray<any>)
    : rawSeeds.match(/\d+/g).map(Number);

  const maps = parseMaps(rawMaps);

  return new Almanac(seeds, maps);
}

function parseSeedsAsRange(rawSeeds: string) {
  return [...rawSeeds.matchAll(/(\d+) (\d+)/g)].flatMap((seedRange) => {
    const start = Number(seedRange[1]);
    const length = Number(seedRange[2]);

    return new Range(start, start + length - 1);
  });
}

function parseMaps(rawMaps: Array<string>) {
  return rawMaps.map((rawMap) => {
    const [rawCategories, rawRanges] = rawMap.split(" map:\n");

    const [source, target] = rawCategories.split("-to-");
    const ranges = rawRanges
      .split("\n")
      .map((rawRange) => rawRange.split(" ").map((value) => Number(value)))
      .map((rangeValues) => new SourceRange(rangeValues[0], rangeValues[1], rangeValues[2]));

    return new RangeSet(source as Category, target as Category, ranges);
  });
}

const part1 = (file: string) => {
  const almanac = parseFile(file);
  const locations = almanac.processMapping(almanac.seeds);

  return Math.min(...locations);
};

const part2 = (file: string) => {
  const almanac = parseFile(file, true);
  const seedsToCheck = almanac.continuityBreakpoints().filter((breakpoint) => {
    return almanac.seeds.some((range) => range.contains(breakpoint));
  });

  const locations = almanac.processMapping(seedsToCheck);

  return Math.min(...locations);
};

console.log("Part 1 - Example", part1(example));
console.log("Part 1 - Input", part1(input));

console.log("Part 2 - Example", part2(example));
console.log("Part 2 - Input", part2(input));
