import { describe, expect, test } from "@jest/globals";
import { extractSymbolsAndGroupOrder } from "./functions";

describe("Symbols and Groups should be extracted correctly", () => {
  test("Symbols should be ????.######..#####.", () => {
    const [symbols, groups] = extractSymbolsAndGroupOrder("????.######..#####. 1,6,5");
    expect(symbols).toBe("????.######..#####.");
  });

  test("Groups should be 1, 6, 5", () => {
    const [symbols, groups] = extractSymbolsAndGroupOrder("????.######..#####. 1,6,5");
    expect(groups).toContain(1);
    expect(groups).toContain(6);
    expect(groups).toContain(5);
  });
});
