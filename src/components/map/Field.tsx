import { TField } from "../../types/map";
import "../../styles/map.css";

export const Field = (props: { object: TField }) => {
  return <div className={props.object ? props.object : "field"}></div>;
};
