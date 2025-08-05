interface IProps {
  userImage: string;
  index: number;
}

export const ScoreUserImage = (props: IProps) => (
  <img
    className="score-image"
    src={props.userImage}
    alt={props.index + 1 + " place"}
  />
);
