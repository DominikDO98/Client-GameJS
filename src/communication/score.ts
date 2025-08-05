import { API_URL } from "../constants/api";
import { ELeaderboardType } from "../enums/leaderboard.enum";
import { Tleaderboard, TleaderboardType } from "../types/leaderboard";

export const loadLeaderboard = async (
  type: TleaderboardType,
  setLeaderboard: React.Dispatch<React.SetStateAction<Tleaderboard | null>>
) => {
  try {
    console.log(await fetch(`${API_URL}/score/personal`));
  } catch (err) {
    console.error(err);
  }
  const leaderBoard: Tleaderboard = [
    {
      userId: 111111,
      userLogin: "Dominik",
      avatarUrl: "https://avatars.githubusercontent.com/u/123335551?v=4",
      score: 9,
    },

    {
      userId: 222222,
      userLogin: "DominikToo",
      avatarUrl: "https://avatars.githubusercontent.com/u/123335551?v=4",
      score: 10,
    },
  ];
  const personalBest: Tleaderboard = [
    {
      userId: 111111,
      userLogin: "Dominikkkkkkkkk",
      avatarUrl: "https://avatars.githubusercontent.com/u/123335551?v=4",
      score: 9,
    },
    {
      userId: 222222,
      userLogin: "Dominikkkkkk",
      avatarUrl: "https://avatars.githubusercontent.com/u/123335551?v=4",
      score: 10,
    },
  ];
  if (type === ELeaderboardType.global) setLeaderboard(leaderBoard);
  if (type === ELeaderboardType.personal) setLeaderboard(personalBest);
};

export const getPersonalBest = () => {
  const personalBest = "high";
  return personalBest;
};

export const sendScore = (score: number) => {
  console.log(score);
};
