export type TPosition = [number, number];
export type TField = "player" | "point" | "obstacle" | "enemy" | null;

export interface IMapData {
  player: TPosition;
  obstacles: TPosition[];
  points: TPosition[];
  enemy: TPosition[];
}
export type IMapDisplay = IField[][];
