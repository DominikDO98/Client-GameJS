import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getUser, goToLogin } from "../../communication/auth";
import { Button } from "../common/Botton";
import { User } from "./User";

export const Account = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("useEffect logging fired");

    getUser(setUser);
  }, [setUser]);

  if (!user) {
    return (
      <div id="account-container">
        <Button text="Log in" callback={goToLogin} />
      </div>
    );
  } else {
    return (
      <div id="account-container">
        <User></User>
      </div>
    );
  }
};
