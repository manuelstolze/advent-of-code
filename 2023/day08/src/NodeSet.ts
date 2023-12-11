export class Node {
  constructor(public identifier: string, public leftNode: string, public rightNode: string) {}

  static fromArray(nodeData: Array<string>) {
    return new Node(nodeData[0], nodeData[1], nodeData[2]);
  }
}

export class NodeSet {
  constructor(public readonly nodes: ReadonlyArray<Node>) {}

  getNodeByIdentifier(identifier: string): Node {
    return this.nodes.find((node) => node.identifier === identifier);
  }
}
