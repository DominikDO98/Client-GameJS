import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar/NavBar";
import { UserContext } from "./context/UserContext";
import { GamePage } from "./pages/GamePage";
import { HomePage } from "./pages/HomePage";
import "./styles/map.css";
import { IGithubUserDTO } from "./types/githubUser";
import { LeaderboardPage } from "./pages/LeaderboardPage";

export function App() {
  const [user, setUser] = useState<null | IGithubUserDTO>(null);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
