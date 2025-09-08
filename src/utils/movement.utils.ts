import { IMapData, TPosition } from "../types/map";
import { PathFinding } from "./pathFinding.utils";

export class MovementUtils {
  generateNewPosition = (pos: TPosition, move: TPosition) => {
    return [pos[0] + move[0], pos[1] + move[1]] as TPosition;
  };

  checkBorder = (position: TPosition) => {
    return (
      position[0] < 0 || position[0] > 9 || position[1] < 0 || position[1] > 9
    );
  };

  checkOverlap = (position: TPosition, array: TPosition[]) => {
    return JSON.stringify(array).includes(JSON.stringify(position));
  };

  moveAllEnemies = (
    map: IMapData,
    enemyMovemant: React.RefObject<TPosition[]>
  ) => {
    map.enemies.forEach((enemy, index) => {
      new PathFinding(enemy, map, index, enemyMovemant);
    });
  };

  handlePlayerMovemant = (
    map: IMapData,
    playerMovemant: React.RefObject<TPosition>
  ): TPosition => {
    if (
      this.checkBorder(playerMovemant.current) ||
      this.checkOverlap(playerMovemant.current, map.obstacles) ||
      this.checkOverlap(playerMovemant.current, map.enemies)
    ) {
      return [map.player[0], map.player[1]];
    } else {
      return playerMovemant.current;
    }
  };
}

export const moveUtil = new MovementUtils();
