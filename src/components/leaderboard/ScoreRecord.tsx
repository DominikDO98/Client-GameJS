import { IScoreRecord } from "../../types/leaderboard";
import { ScoreNumber } from "./ScoreNumber";
import { ScorePlacement } from "./ScorePlacement";
import { ScoreUserImage } from "./ScoreUserImage";
import { ScoreUsername } from "./ScoreUsername";

interface IProps {
  index: number;
  record: IScoreRecord;
}

export const ScoreRecord = (props: IProps) => {
  return (
    <>
      <div className="score-container">
        <ScorePlacement placement={props.index + 1} />
        <ScoreUserImage
          userImage={props.record.avatarUrl}
          index={props.index}
        />
        <ScoreUsername username={props.record.userLogin} />
        <ScoreNumber score={props.record.score} />
      </div>
    </>
  );
};
