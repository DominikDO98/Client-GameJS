import { Links } from "./Links";
import "../../styles/navbar.css";
import { Account } from "../auth/Account";

export const NavBar = () => (
  <>
    <nav>
      <Links></Links>
      <Account></Account>
    </nav>
  </>
);
