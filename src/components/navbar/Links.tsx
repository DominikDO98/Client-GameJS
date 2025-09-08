import { CustomLink } from "./CustomLink";

export const Links = () => (
  <ul>
    <CustomLink to="/" text="Home"></CustomLink>
    <CustomLink to="/game" text="Game"></CustomLink>
    <CustomLink to="/leaderboard" text="Leaderboard"></CustomLink>
  </ul>
);
