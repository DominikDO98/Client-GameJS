import { useCallback, useEffect } from "react";
import { movement } from "../constants/movment";
import { TPosition, IMapData } from "../types/map";
import { checkBorder, checkOverlap } from "../utils/map.utils";

export const useMovement = (
  map: IMapData | null,
  setMap: React.Dispatch<React.SetStateAction<IMapData | null>>
) => {
  const move = useCallback(
    (tempPlayer: TPosition) => {
      if (map) {
        const tempMap: IMapData = {
          ...map,
          player: tempPlayer,
        };
        setMap(tempMap);
      }
    },
    [map, setMap]
  );
  const collectPoint = useCallback(
    (tempPlayer: TPosition) => {
      if (map) {
        const tempMap: IMapData = {
          ...map,
          points: map.points.filter((point) => {
            return JSON.stringify(point) !== JSON.stringify(tempPlayer);
          }),
          player: tempPlayer,
        };
        setMap(tempMap);
      }
    },
    [map, setMap]
  );

  const handleMovemant = useCallback(
    (movement: number[]) => {
      if (map) {
        const tempPlayer: TPosition = [
          map.player[0] + movement[0],
          map.player[1] + movement[1],
        ];
        if (checkBorder(tempPlayer)) return;
        if (checkOverlap(tempPlayer, map.obstacles)) return;
        if (checkOverlap(tempPlayer, map.points)) {
          collectPoint(tempPlayer);
        } else {
          move(tempPlayer);
        }
      }
    },
    [map, collectPoint, move]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === "w" || e.key === "W") && map) handleMovemant(movement.up);
      if ((e.key === "s" || e.key === "S") && map)
        handleMovemant(movement.down);
      if ((e.key === "a" || e.key === "A") && map)
        handleMovemant(movement.left);
      if ((e.key === "d" || e.key === "D") && map)
        handleMovemant(movement.right);
    },
    [handleMovemant, map]
  );

  useEffect(() => {
    document.addEventListener("keypress", handleKey);
    return () => {
      document.removeEventListener("keypress", handleKey);
    };
  }, [handleKey]);
};
