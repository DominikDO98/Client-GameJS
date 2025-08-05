import { useState, useEffect } from "react";
import { loadLeaderboard } from "../../communication/score";
import { Tleaderboard, TleaderboardType } from "../../types/leaderboard";
import { ScoreRecord } from "./ScoreRecord";
import { ELeaderboardType } from "../../enums/leaderboard.enum";
import { SwitchLeaderboard } from "./SwitchLeaderboard";

export const Leaderboard = () => {
  const [type, setType] = useState<TleaderboardType>(ELeaderboardType.global);
  const [leaderboard, setLeadearboard] = useState<Tleaderboard | null>(null);

  useEffect(() => {
    loadLeaderboard(type, setLeadearboard);
    console.log(type);
  }, [setLeadearboard, type]);

  if (!leaderboard) {
    return <div>Loading leaderboard...</div>;
  }

  return (
    <>
      <SwitchLeaderboard type={type} setType={setType} />
      <ul id="leaderboard">
        {leaderboard.map((record, index) => (
          <li key={index}>
            <ScoreRecord index={index} record={record} />
          </li>
        ))}
      </ul>
    </>
  );
};
