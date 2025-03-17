import { createContext } from "react";
import React from "react";
import { IGithubUserDTO } from "../types/githubUser";

interface IUserContext {
  user: IGithubUserDTO | null;
  setUser: React.Dispatch<React.SetStateAction<null | IGithubUserDTO>>;
}
export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});
