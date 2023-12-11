import example from "./src/example";
import { Node, NodeSet } from "./src/Node";
import example2 from "./src/example2";
import input from "./src/input";

const IDENTIFIER_START = "AAA";
const IDENTIFIER_END = "ZZZ";

function readInstructionsAndNodes(content: string): [Array<string>, NodeSet] {
  const [rawInstructions, rawNodeSet] = content.split("\n\n");
  const instructions = rawInstructions.split("");

  const nodes = rawNodeSet.split("\n").map((line) => {
    const nodeData = line
      .replace(/[=(,)]/g, "")
      .replace(/\s{2}/, " ")
      .split(" ");

    return Node.fromArray(nodeData);
  });

  return [instructions, new NodeSet(nodes)];
}

function executeInstructions(
  instructions: Array<string>,
  nodeSet: NodeSet,
  currentNode: Node,
  counter: number
) {
  let nextNode: Node;

  instructions.map((identifier: string) => {
    currentNode = nodeSet.getNodeByIdentifier(currentNode.identifier) as Node;
    nextNode =
      identifier === "L"
        ? nodeSet.getNodeByIdentifier(currentNode.leftNode)
        : nodeSet.getNodeByIdentifier(currentNode.rightNode);

    currentNode = nextNode;
    counter++;
  });

  return { newCurrentNode: currentNode, newCounter: counter };
}

function part1(content: string) {
  const [instructions, nodeSet] = readInstructionsAndNodes(content);

  const start = nodeSet.getNodeByIdentifier(IDENTIFIER_START);
  const end = IDENTIFIER_END;

  let counter = 0;
  let currentNode = start;

  while (currentNode.identifier !== end) {
    let { newCurrentNode, newCounter } = executeInstructions(
      instructions,
      nodeSet,
      currentNode,
      counter
    );
    currentNode = newCurrentNode;
    counter = newCounter;
  }
  return counter;
}

console.log("Example - Part 1", part1(example));
console.log("Example 2 - Part 1", part1(example2));
console.log("Input - Part 1", part1(input));
