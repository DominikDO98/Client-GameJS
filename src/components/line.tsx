import { TField } from "../types/map";
import { Field } from "./field";

export const Line = (props: { array: TField[] }) => {
  return props.array.map((field, index) => (
    <Field object={field} key={index}></Field>
  ));
};
