import {
  DEFAULT_DIFFICULTY,
  MAX_ENEMIES,
  MAX_OBSTACLES,
} from "../constants/difficulty";
import { EMapObjects } from "../enums/map.enum";
import { IDifficultySettings, IMapData, TMapDisplay } from "../types/map";

export const displayMap = (map: IMapData | null) => {
  const mapDisplay: TMapDisplay = [];
  if (map) {
    for (let x = 0; x < 10; x++) {
      mapDisplay.push([]);
      for (let y = 0; y < 10; y++) {
        mapDisplay[x].push(null);
      }
    }
    mapDisplay[map.player[0]][map.player[1]] = EMapObjects.player;
    map.obstacles.forEach((obstacle) => {
      mapDisplay[obstacle[0]][obstacle[1]] = EMapObjects.obstacle;
    });
    map.points.forEach((point) => {
      mapDisplay[point[0]][point[1]] = EMapObjects.point;
    });
    map.enemies.forEach((enemy) => {
      mapDisplay[enemy[0]][enemy[1]] = EMapObjects.enemy;
    });
  }
  return mapDisplay;
};

export const changeDifficulty = (
  diff: React.RefObject<IDifficultySettings>
): IDifficultySettings => {
  const newDiff = {
    ...diff.current,
  };
  if (diff.current.obstaclesDiff < MAX_OBSTACLES) {
    newDiff.obstaclesDiff++;
  }
  if (
    diff.current.obstaclesDiff === MAX_OBSTACLES &&
    diff.current.enemiesDiff < MAX_ENEMIES
  ) {
    newDiff.obstaclesDiff = DEFAULT_DIFFICULTY.obstaclesDiff;
    newDiff.pointsNumber++;
    newDiff.enemiesDiff++;
  }
  return newDiff;
};
