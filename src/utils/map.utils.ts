import { EMapObjects } from "../enums/map.enum";
import { IMapData, IMapDisplay, TPosition } from "../types/map";

export const displayMap = (map: IMapData | null) => {
  const mapDisplay: IMapDisplay = [];
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
  }
  return mapDisplay;
};

export const checkBorder = (tempPlayer: TPosition) => {
  return (
    tempPlayer[0] < 0 ||
    tempPlayer[0] > 9 ||
    tempPlayer[1] < 0 ||
    tempPlayer[1] > 9
  );
};

export const checkOverlap = (tempPlayer: TPosition, array: TPosition[]) => {
  return JSON.stringify(array).includes(JSON.stringify(tempPlayer));
};
