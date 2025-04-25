import { createContext } from "react";
import React from "react";
import { EGameState } from "../enums/gameState.enum";

interface IGameStateContext {
  gameState: EGameState;
  setGameState: React.Dispatch<React.SetStateAction<EGameState>>;
}
export const GameStateContext = createContext<IGameStateContext>({
  gameState: EGameState.OnGoing,
  setGameState: () => {},
});
