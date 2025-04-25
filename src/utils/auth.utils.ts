import { IGithubUserDTO } from "../types/githubUser";

export const getUser = async (
  setUser: React.Dispatch<React.SetStateAction<null | IGithubUserDTO>>
) => {
  if (getLogged()) {
    const res = await fetch("http://localhost:3000/user", {
      method: "get",
      credentials: "include",
      headers: { "access-control-allow-origin": "http://localhost:5173" },
    });
    await res.json().then((data: IGithubUserDTO) => {
      const user: IGithubUserDTO = {
        ...data,
      };
      setUser(user);
    });
  }
};

export const logOut = async (
  setUser: React.Dispatch<React.SetStateAction<null | IGithubUserDTO>>
) => {
  await fetch("http://localhost:3000/logout", {
    method: "get",
    credentials: "include",
    headers: { "access-control-allow-origin": "http://localhost:5173" },
  }).then(() => {
    setUser(null);
  });
};

const getLogged = () => {
  const loggedCookie = document.cookie
    .split(";")
    .filter((cookie) => cookie.split("=")[0] === "LoggedIn");
  if (loggedCookie[0] && loggedCookie[0].split("=")[1] === "true") return true;
  else return false;
};

export const goToLogin = () => {
  window.location.href = "http://localhost:3000/login";
};
