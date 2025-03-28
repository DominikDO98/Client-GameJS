import { useState } from "react";
import { Map } from "../components/map/Map";
import { Score } from "../components/score/Score";
import { ScoreContext } from "../context/ScoreContext";
import { EGameState } from "../enums/gameState.enum";
import { GameStateContext } from "../context/GameStateContext";

export const GamePage = () => {
  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<EGameState>(EGameState.OnGoing);

  return (
    <>
      <ScoreContext.Provider value={{ score, setScore }}>
        <GameStateContext.Provider value={{ gameState, setGameState }}>
          <Map></Map>
        </GameStateContext.Provider>
        <Score></Score>
      </ScoreContext.Provider>
    </>
  );
};
