import { useCallback, useContext, useEffect, useRef } from "react";
import { requestMap } from "../communication/map";
import { movement } from "../constants/movment";
import { GameStateContext } from "../context/GameStateContext";
import { ScoreContext } from "../context/ScoreContext";
import { EGameState } from "../enums/gameState.enum";
import { IDifficultySettings, IMapData, TPosition } from "../types/map";
import { changeDifficulty } from "../utils/map.utils";
import { moveUtil } from "../utils/movement.utils";

export const useMovemant = (
  map: IMapData,
  setMap: React.Dispatch<React.SetStateAction<IMapData | null>>,
  diff: React.RefObject<IDifficultySettings>
) => {
  const playerMovemant = useRef<TPosition>([map.player[0], map.player[1]]);
  const enemyMovemant = useRef<TPosition[]>([...map.enemies]);
  const { setScore } = useContext(ScoreContext);
  const { gameState, setGameState } = useContext(GameStateContext);

  const frame = useRef<1 | 2>(1);

  const handleEnemyMovement = useCallback((): TPosition[] => {
    const tempEnemy = map.enemies.map((enemy, index) => {
      if (
        moveUtil.checkBorder(enemyMovemant.current[index]) ||
        moveUtil.checkOverlap(enemyMovemant.current[index], map.obstacles) ||
        moveUtil.checkOverlap(enemyMovemant.current[index], map.enemies) ||
        moveUtil.checkOverlap(enemyMovemant.current[index], map.points)
      ) {
        return [enemy[0], enemy[1]] as TPosition;
      } else {
        return enemyMovemant.current[index] as TPosition;
      }
    });
    return tempEnemy;
  }, [map]);

  const handleWin = useCallback(() => {
    if (!map.points[0]) {
      setGameState(EGameState.Win);
      diff.current = changeDifficulty(diff);
      requestMap(diff.current, setMap);
    }
  }, [setGameState, setMap, diff, map]);

  const handleLoss = useCallback(() => {
    if (
      map.enemies.filter((enemy) => {
        return JSON.stringify(map.player) === JSON.stringify(enemy);
      })[0]
    ) {
      playerMovemant.current = [map.player[0], map.player[1]];
      setGameState(EGameState.Loss);
    }
  }, [map, setGameState]);

  const collectPoint = useCallback(
    (tempPlayer: TPosition, tempEnemy: TPosition[]) => {
      const tempMap: IMapData = {
        ...map,
        points: map.points.filter((point) => {
          return JSON.stringify(point) !== JSON.stringify(tempPlayer);
        }),
        player: tempPlayer,
        enemies: tempEnemy,
      };
      setScore((curr) => curr + 1);
      setMap(tempMap);
    },
    [map, setMap, setScore]
  );

  const move = useCallback(() => {
    const tempEnemy: TPosition[] = handleEnemyMovement();
    const tempPlayer: TPosition = moveUtil.handlePlayerMovemant(
      map,
      playerMovemant
    );
    if (moveUtil.checkOverlap(tempPlayer, map.points)) {
      collectPoint(tempPlayer, tempEnemy);
    } else {
      const tempMap: IMapData = {
        ...map,
        player: tempPlayer,
        enemies: tempEnemy,
      };
      setMap(tempMap);
    }
  }, [map, setMap, collectPoint, handleEnemyMovement]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "w" || e.key === "W") {
      playerMovemant.current = moveUtil.generateNewPosition(
        playerMovemant.current,
        movement.up
      );
      document.removeEventListener("keypress", handleKey);
    }
    if (e.key === "s" || e.key === "S") {
      playerMovemant.current = moveUtil.generateNewPosition(
        playerMovemant.current,
        movement.down
      );
      document.removeEventListener("keypress", handleKey);
    }
    if (e.key === "a" || e.key === "A") {
      playerMovemant.current = moveUtil.generateNewPosition(
        playerMovemant.current,
        movement.left
      );
      document.removeEventListener("keypress", handleKey);
    }
    if (e.key === "d" || e.key === "D") {
      playerMovemant.current = moveUtil.generateNewPosition(
        playerMovemant.current,
        movement.right
      );
      document.removeEventListener("keypress", handleKey);
    }
  }, []);

  const pause = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " ") {
        switch (gameState) {
          case EGameState.OnGoing:
            e.preventDefault();
            setGameState(EGameState.Paused);
            break;
          case EGameState.Paused:
            e.preventDefault();
            setGameState(EGameState.OnGoing);
            break;
          case EGameState.Win:
            e.preventDefault();
            setGameState(EGameState.OnGoing);
            break;
          default:
            break;
        }
      }
    },
    [gameState, setGameState]
  );

  const switchFrame = useCallback(() => {
    switch (frame.current) {
      case 1:
        frame.current = 2;
        break;
      case 2:
        frame.current = 1;
        break;
    }
  }, [frame]);

  useEffect(() => {
    document.addEventListener("keypress", pause);
    if (gameState === EGameState.OnGoing) {
      playerMovemant.current = [map.player[0], map.player[1]];
      enemyMovemant.current = [...map.enemies];
      document.addEventListener("keypress", handleKey);
      if (frame.current === 1) moveUtil.moveAllEnemies(map, enemyMovemant);
      setTimeout(() => {
        handleLoss();
        handleWin();
        move();
        switchFrame();
      }, 250);
    }
    return () => {
      document.removeEventListener("keypress", handleKey);
      document.removeEventListener("keypress", pause);
    };
  }, [
    pause,
    map,
    setMap,
    handleKey,
    move,
    handleWin,
    handleLoss,
    gameState,
    setGameState,
    switchFrame,
  ]);
};
