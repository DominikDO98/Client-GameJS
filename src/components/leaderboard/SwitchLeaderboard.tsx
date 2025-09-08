import { ELeaderboardType } from "../../enums/leaderboard.enum";
import "../../styles/switch.css";
import { TleaderboardType } from "../../types/leaderboard";

interface IProps {
  type: TleaderboardType;
  setType: React.Dispatch<React.SetStateAction<TleaderboardType>>;
}

export const SwitchLeaderboard = (props: IProps) => {
  const changeLeaderboardType = () => {
    if (props.type === ELeaderboardType.global)
      props.setType(ELeaderboardType.personal);

    if (props.type === ELeaderboardType.personal)
      props.setType(ELeaderboardType.global);
  };

  return (
    <div id="switch-container">
      <label className="switch">
        <input type="checkbox" onClick={changeLeaderboardType}></input>
        <span className="slider"></span>
      </label>
    </div>
  );
};
