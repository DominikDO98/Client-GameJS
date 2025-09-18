import { API_URL, CLIENT_URL, HEADERS } from "../constants/api";
import { IGithubUserDTO } from "../types/githubUser";

export const getUser = async (
  setUser: React.Dispatch<React.SetStateAction<null | IGithubUserDTO>>
) => {
  console.log("logged:   ", isLoggedIn());
  console.log(API_URL, CLIENT_URL);
  if (isLoggedIn()) {
    console.log("fired getUser");
    const res = await fetch(`${API_URL}/user`, {
      method: "get",
      credentials: "include",
      headers: HEADERS,
    });
    await res.json().then((data: IGithubUserDTO) => {
      const user: IGithubUserDTO = {
        ...data,
      };
      console.log(user);
      setUser(user);
    });
  }
};

export const logOut = async (
  setUser: React.Dispatch<React.SetStateAction<null | IGithubUserDTO>>
) => {
  await fetch(`${API_URL}/logout`, {
    method: "get",
    credentials: "include",
    headers: HEADERS,
  }).then(() => {
    setUser(null);
  });
};

const isLoggedIn = () => {
  console.log("tried to find if logged in");
  const loggedCookie = document.cookie
    .split(";")
    .filter((cookie) => cookie.split("=")[0] === "LoggedIn");
  if (loggedCookie[0] && loggedCookie[0].split("=")[1] === "true") return true;
  else return false;
};

export const goToLogin = () => {
  window.location.href = `${API_URL}/login`;
};
