export interface IScoreRecord {
  userId: number;
  userLogin: string;
  avatarUrl: string;
  score: number;
}

export type Tleaderboard = IScoreRecord[];

export type TleaderboardType = "global" | "personal";
