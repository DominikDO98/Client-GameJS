import { TPosition } from "../types/map";

interface IMovemant {
  up: TPosition;
  down: TPosition;
  left: TPosition;
  right: TPosition;
}
export const movement: IMovemant = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};
