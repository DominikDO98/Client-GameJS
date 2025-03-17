import { useState } from "react";
import { Map } from "../components/map/Map";
import { Score } from "../components/score/Score";
import { ScoreContext } from "../context/ScoreContext";

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
