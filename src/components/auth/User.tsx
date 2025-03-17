import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Button } from "../common/Botton";
import { logOut } from "../../utils/auth.utils";

export const User = () => {
  const { user, setUser } = useContext(UserContext);

  if (!user) return <></>;
  return (
    <>
      <div id="userAvatar-container">
        <img src={user.avatarUrl} alt="userAvatar" />
      </div>
      <ul id="right-container">
        <li>
          <div id="username">{user.login}</div>
        </li>
        <li>
          <Button
            text="Log out"
            callback={() => {
              logOut(setUser);
            }}
          />
        </li>
      </ul>
    </>
  );
};
