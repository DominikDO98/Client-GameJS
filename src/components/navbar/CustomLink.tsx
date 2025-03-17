import { Link } from "react-router-dom";

interface IProps {
  to: string;
  text: string;
}

export const CustomLink = (props: IProps) => (
  <Link className="link" to={props.to}>
    <li className="link-text">{props.text}</li>
  </Link>
);
