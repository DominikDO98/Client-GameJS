import { useContext } from "react";
import { ScoreContext } from "../../context/ScoreContext";
import "../../styles/score.css";

export const Score = () => {
  const { score } = useContext(ScoreContext);

  return (
    <>
      <div className="score">Score: {score}</div>
    </>
  );
};
