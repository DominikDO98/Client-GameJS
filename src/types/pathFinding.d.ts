import { TPosition } from "./map";

export type TAlgorithm = (
  path: TPosition[],
  position: TPosition,
  map: IMapData
) => TPosition[];

export type TMovements = "up" | "down" | "right" | "left";

export interface INode {
  node: TPosition;
  cost: [number, number];
  connection: TPosition[];
}
