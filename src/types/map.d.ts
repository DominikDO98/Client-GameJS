export type TPosition = [number, number];
export type TField = "player" | "point" | "obstacle" | "enemy" | null;

export interface IMapData {
  player: TPosition;
  obstacles: TPosition[];
  points: TPosition[];
  enemies: TPosition[];
}

export type TMapDisplay = IField[][];

export interface IDifficultySettings {
  obstaclesDiff: number;
  enemiesDiff: number;
  pointsNumber: number;
}
