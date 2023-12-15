import { memoize } from "../../util/function";

function extractSymbolsAndGroupOrder(line: string) {
  const [symbols, groupOrderString] = line.split(" ");
  const groupOrder = groupOrderString.split(",").map(Number);

  return [symbols, groupOrder] as const;
}

const getPossibleArrangements = memoize((symbols: string, groupOrder: ReadonlyArray<number>) => {
  if (symbols.length === 0) {
    // no symbols, but also no groups, so 1 possible arrangement
    // or no symbols but there are some groups, so 0 possible arrangements
    return groupOrder.length === 0 ? 1 : 0;
  }

  if (groupOrder.length === 0) {
    const hasGroupInSymbols = symbols.split("").some((s) => s === "#");

    // a) groups in symbols are present - 0 arrangements are possible
    // b) no symbols - 1 arrangement is possible
    return hasGroupInSymbols ? 0 : 1;
  }

  const gapCount = groupOrder.length - 1;
  const minSymbolLength: number = groupOrder.reduce((a, b) => a + b) + gapCount;

  // symbols not long enough - 0 possible arrangements
  if (symbols.length < minSymbolLength) return 0;

  if (symbols[0] === ".") return getPossibleArrangements(symbols.slice(1), groupOrder);
  if (symbols[0] === "#") {
    const [currentGroup, ...remainingGroups] = groupOrder;

    for (let i = 0; i < currentGroup; i++) {
      // 0 possible arrangements -> because there needs to be exactly n "#" symbols
      if (symbols[i] === ".") return 0;
    }

    // if there is no gap after group -> 0 possible arrangements
    if (symbols[currentGroup] === "#") return 0;

    // current group is fine, so we can check further - cut group + gap space symbols, and check for remainingGroups
    return getPossibleArrangements(symbols.slice(currentGroup + 1), remainingGroups);
  }

  // first symbol is "?" so we need to check when it is "#" and "."
  return (
    getPossibleArrangements("#" + symbols.slice(1), groupOrder) +
    getPossibleArrangements("." + symbols.slice(1), groupOrder)
  );
});

export { extractSymbolsAndGroupOrder, getPossibleArrangements };
