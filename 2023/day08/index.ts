import example from "./src/example";
import example2 from "./src/example2";
import input from "./src/input";
import { Tree, TreeNode } from "./src/Tree";
import { leastCommonMultiple } from "../util/number";

const readInstructionsAndNodes = (content: string) => {
  const [rawInstructions, rawNodes] = content.split("\n\n");
  const nodesInfo = rawNodes
    .split("\n")
    .map((line) => [...line.matchAll(/([A-Z0-9]{3})/g)].map((match) => match[1]));

  const nodes = nodesInfo.map((nodeInfo) => new TreeNode(nodeInfo[0]));

  nodes.forEach((node, index) => {
    node.left = nodes.find((n) => n.data === nodesInfo[index][1]);
    node.right = nodes.find((n) => n.data === nodesInfo[index][2]);
  });

  const tree = new Tree(nodes.find((node) => node.data === "AAA"));

  return {
    instructions: rawInstructions.split("") as ReadonlyArray<"L" | "R">,
    nodes,
    tree
  };
};

const part1 = (content: string) => {
  const { instructions, tree } = readInstructionsAndNodes(content);

  return tree.traverse(instructions, tree.root, (node) => node.data === "ZZZ");
};

const part2 = (content: string) => {
  const { instructions, nodes, tree } = readInstructionsAndNodes(content);

  const cycles = nodes
    .filter((node) => node.data.endsWith("A"))
    .map((node) => {
      return tree.traverse(instructions, node, (node) => node.data.endsWith("Z"));
    });

  return leastCommonMultiple(cycles);
};

console.log("Example - Part 1", part1(example));
console.log("Example 2 - Part 1", part1(example2));
console.log("Input - Part 1", part1(input));

console.log("Example - Part 1", part2(example));
console.log("Example 2 - Part 1", part2(example2));
console.log("Input - Part 1", part2(input));
