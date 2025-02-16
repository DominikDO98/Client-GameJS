import { useCallback, useContext, useEffect, useRef } from "react";
import { movement } from "../constants/movment";
import { ScoreContext } from "../context/scoreContext";
import { IMapData, TPosition } from "../types/map";
import {
  checkBorder,
  checkOverlap,
  generateMovement,
} from "../utils/map.utils";

export const useMovemant = (
  map: IMapData,
  setMap: React.Dispatch<React.SetStateAction<IMapData>>
) => {
  const playerMovemant = useRef<TPosition>([map.player[0], map.player[1]]);
  const enemyMovemant = useRef<TPosition[]>([...map.enemy]);
  const { setScore } = useContext(ScoreContext);

  const moveOneEnemy = useCallback(
    (position: TPosition, index: number) => {
      const tempArray = [...enemyMovemant.current];
      if (map.player[1] < position[1]) {
        tempArray[index] = generateMovement(position, movement.up);
        if (checkOverlap(tempArray[index], [...map.obstacles, ...map.points])) {
          tempArray[index] = generateMovement(position, movement.right);
        }
      }
      if (map.player[1] > position[1]) {
        tempArray[index] = generateMovement(position, movement.down);
        if (checkOverlap(tempArray[index], [...map.obstacles, ...map.points])) {
          tempArray[index] = generateMovement(position, movement.right);
        }
      }
      if (map.player[1] === position[1]) {
        if (map.player[0] < position[0]) {
          tempArray[index] = generateMovement(position, movement.left);
          if (
            checkOverlap(tempArray[index], [...map.obstacles, ...map.points])
          ) {
            tempArray[index] = generateMovement(position, movement.up);
          }
        }
        if (map.player[0] > position[0]) {
          tempArray[index] = generateMovement(position, movement.right);
          if (
            checkOverlap(tempArray[index], [...map.obstacles, ...map.points])
          ) {
            tempArray[index] = generateMovement(position, movement.up);
          }
        }
        if (
          checkOverlap(
            tempArray[index],
            enemyMovemant.current.slice(0, index)
          ) &&
          index !== 0
        ) {
          tempArray[index] = map.enemy[index];
        }
      }
      enemyMovemant.current = tempArray;
    },
    [map]
  );

  const moveAllEnemies = useCallback(() => {
    map.enemy.forEach((enemy, index) => {
      moveOneEnemy(enemy, index);
    });
  }, [map, moveOneEnemy]);

  const handleEnemyMovement = useCallback((): TPosition[] => {
    const tempEnemy = map.enemy.map((enemy, index) => {
      if (
        checkBorder(enemyMovemant.current[index]) ||
        checkOverlap(enemyMovemant.current[index], map.obstacles) ||
        checkOverlap(enemyMovemant.current[index], map.enemy) ||
        checkOverlap(enemyMovemant.current[index], map.points)
      ) {
        return [enemy[0], enemy[1]] as TPosition;
      } else {
        return enemyMovemant.current[index] as TPosition;
      }
    });
    return tempEnemy;
  }, [map]);

  const collectPoint = useCallback(
    (tempPlayer: TPosition, tempEnemy: TPosition[]) => {
      const tempMap: IMapData = {
        ...map,
        points: map.points.filter((point) => {
          return JSON.stringify(point) !== JSON.stringify(tempPlayer);
        }),
        player: tempPlayer,
        enemy: tempEnemy,
      };
      setScore((curr) => curr + 1);
      setMap(tempMap);
    },
    [map, setMap, setScore]
  );

  const handlePlayerMovemant = useCallback((): TPosition => {
    if (
      checkBorder(playerMovemant.current) ||
      checkOverlap(playerMovemant.current, map.obstacles)
    ) {
      return [map.player[0], map.player[1]];
    } else {
      return playerMovemant.current;
    }
  }, [map]);

  const move = useCallback(() => {
    const tempEnemy: TPosition[] = handleEnemyMovement();
    const tempPlayer: TPosition = handlePlayerMovemant();
    if (checkOverlap(tempPlayer, map.points)) {
      collectPoint(tempPlayer, tempEnemy);
    } else {
      const tempMap: IMapData = {
        ...map,
        player: tempPlayer,
        enemy: tempEnemy,
      };
      setMap(tempMap);
    }
  }, [map, setMap, collectPoint, handleEnemyMovement, handlePlayerMovemant]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "w" || e.key === "W")
        playerMovemant.current = generateMovement(
          playerMovemant.current,
          movement.up
        );
      if (e.key === "s" || e.key === "S")
        playerMovemant.current = generateMovement(
          playerMovemant.current,
          movement.down
        );
      if (e.key === "a" || e.key === "A")
        playerMovemant.current = generateMovement(
          playerMovemant.current,
          movement.left
        );
      if (e.key === "d" || e.key === "D")
        playerMovemant.current = generateMovement(
          playerMovemant.current,
          movement.right
        );
    },
    [playerMovemant]
  );

  useEffect(() => {
    playerMovemant.current = [map.player[0], map.player[1]];
    enemyMovemant.current = [...map.enemy];
    document.addEventListener("keypress", handleKey);
    moveAllEnemies();
    setTimeout(() => {
      move();
    }, 250);
    return () => {
      document.removeEventListener("keypress", handleKey);
    };
  }, [map, handleKey, move, moveAllEnemies]);
};
