import { cycle } from "../../util";

export type Instructions = "L" | "R";

class TreeNode<T> {
  constructor(
    public readonly data: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

class Tree<T> {
  constructor(public readonly root: TreeNode<T>) {}

  traverse(
    instructions: ReadonlyArray<Instructions>,
    sourceNode: TreeNode<T>,
    targetCheck: (node: TreeNode<T>) => boolean
  ) {
    let steps = 0;
    let currentNode: TreeNode<T> | null = sourceNode;

    for (const instruction of cycle(instructions)) {
      if (currentNode === null) throw new Error("No source Node provided.");
      if (targetCheck(currentNode)) return steps;

      currentNode = instruction === "L" ? currentNode.left : currentNode.right;
      steps++;
    }

    return steps;
  }
}

export { Tree, TreeNode };
