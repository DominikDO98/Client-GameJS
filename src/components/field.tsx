import "../styles/map.css";
import { TField } from "../types/map";

export const Field = (props: { object: TField }) => {
  return <div className={props.object ? props.object : "field"}></div>;
};
