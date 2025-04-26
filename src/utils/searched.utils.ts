import { INode } from "../types/pathFinding";

export class Searched {
  private _nodes: INode[] = [];

  filter(callback: (node: INode) => boolean): INode[] {
    return this._nodes.filter(callback);
  }
  add(arg: INode | INode[]) {
    if (Array.isArray(arg)) {
      this.addMany(arg);
    } else {
      this.addOne(arg);
    }
  }
  private addMany(newNodes: INode[]) {
    newNodes.forEach((n) => {
      this.addOne(n);
    });
  }
  private addOne(newNode: INode) {
    const sameNode: INode | undefined = this._nodes.find((node, index) => {
      if (
        newNode.node[0] === node.node[0] &&
        newNode.node[1] === node.node[1]
      ) {
        if (node.cost[0] > newNode.cost[0]) {
          this._nodes[index] = newNode;
        }
        return true;
      }
      return false;
    });
    if (!sameNode) {
      this._nodes.push(newNode);
    }
  }
}
