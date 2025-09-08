interface IProps {
  text: string;
  callback: () => void;
}

export const Button = (props: IProps) => {
  const callbackWrapper = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.callback();
  };

  return (
    <button
      className="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        callbackWrapper(e);
      }}
    >
      {props.text}
    </button>
  );
};
