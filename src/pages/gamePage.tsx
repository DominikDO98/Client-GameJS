import { useState } from "react";
import { Map } from "../components/map/map";
import { Score } from "../components/score/score";
import { ScoreContext } from "../context/scoreContext";

export const GamePage = () => {
  const [score, setScore] = useState<number>(0);
  return (
    <>
      <ScoreContext.Provider value={{ score, setScore }}>
        <Map></Map>
        <Score></Score>
      </ScoreContext.Provider>
    </>
  );
};
