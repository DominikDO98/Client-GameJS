import { createContext } from "react";
import React from "react";

interface IScoreContext {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}
export const ScoreContext = createContext<IScoreContext>({
  score: 0,
  setScore: () => {},
});
