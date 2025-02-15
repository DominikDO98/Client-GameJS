export type TPosition = [number, number];
export type TPositionSet = Array<TPosition>;
export type TField = "player" | "point" | "obstacle" | null;

export interface IMapData {
  player: TPosition;
  obstacles: TPosition[];
  points: TPosition[];
}
export type IMapDisplay = IField[][];
