import { movement } from "../constants/movment";
import { TPosition, IMapData } from "../types/map";
import { INode } from "../types/pathFinding";
import { moveUtil } from "./movement.utils";
import { Searched } from "./searched.utils";

export class PathFinding {
  private _moveUtils = moveUtil;
  private _startingPosition: TPosition;
  private _searched: Searched = new Searched();
  private _processed: TPosition[] = [];
  private _map: IMapData;

  constructor(
    pos: TPosition,
    map: IMapData,
    index: number,
    enemyMovemant: React.RefObject<TPosition[]>
  ) {
    this._startingPosition = pos;
    this._map = map;
    this.getPath(index, enemyMovemant);
  }

  private calculateCost = (node: TPosition): [number, number] => {
    const GCost: number =
      Math.abs(node[0] - this._startingPosition[0]) +
      Math.abs(node[1] - this._startingPosition[1]);
    const HCost: number =
      Math.abs(node[0] - this._map.player[0]) +
      Math.abs(node[1] - this._map.player[1]);
    return [GCost, HCost];
  };

  private checkDirection = (node: TPosition, movement: TPosition) => {
    return (
      !this._moveUtils.checkBorder(
        this._moveUtils.generateNewPosition(node, movement)
      ) &&
      !this._moveUtils.checkOverlap(
        this._moveUtils.generateNewPosition(node, movement),
        [...this._map.obstacles, ...this._map.points]
      )
    );
  };

  private getOptions = (node: TPosition) => {
    const options: TPosition[] = [];
    if (this.checkDirection(node, movement.up))
      options.push(this._moveUtils.generateNewPosition(node, movement.up));
    if (this.checkDirection(node, movement.down))
      options.push(this._moveUtils.generateNewPosition(node, movement.down));
    if (this.checkDirection(node, movement.left))
      options.push(this._moveUtils.generateNewPosition(node, movement.left));
    if (this.checkDirection(node, movement.right))
      options.push(this._moveUtils.generateNewPosition(node, movement.right));
    return options;
  };

  private calculateSurroundings = (node: INode): INode[] => {
    return this.getOptions(node.node).map((option) => {
      return {
        node: option,
        cost: this.calculateCost(option),
        connection: [...node.connection, option],
      };
    });
  };

  private chooseLowestCost = (): INode => {
    const filtered = this._searched.filter(
      (node) =>
        !JSON.stringify(this._processed).includes(JSON.stringify(node.node))
    );
    return filtered.reduce((min, curr) => {
      if (min.cost[0] + min.cost[1] > curr.cost[0] + curr.cost[1]) return curr;
      if (min.cost[0] + min.cost[1] === curr.cost[0] + curr.cost[1])
        return min.cost[1] > curr.cost[1] ? curr : min;
      return min;
    });
  };

  private pathFinding = (): TPosition[] => {
    let current: INode = {
      node: [...this._startingPosition],
      cost: [0, 0],
      connection: [],
    };
    let i: number = 0;
    do {
      this._searched.add([...this.calculateSurroundings(current)]);
      const lowest = this.chooseLowestCost();
      this._processed.push(lowest.node);
      current = {
        ...lowest,
      };
      i++;
      if (
        current.node[0] === this._map.player[0] &&
        current.node[1] === this._map.player[1]
      ) {
        break;
      }
    } while (i < 50);
    return current.connection;
  };

  getPath = (index: number, enemyMovemant: React.RefObject<TPosition[]>) => {
    const path = this.pathFinding();
    if (
      !path[0] ||
      !path ||
      this._moveUtils.checkOverlap(path[0], [
        ...enemyMovemant.current.slice(0, index),
        ...this._map.enemies,
      ])
    ) {
      return;
    } else {
      enemyMovemant.current[index] = path[0];
      return;
    }
  };
}
