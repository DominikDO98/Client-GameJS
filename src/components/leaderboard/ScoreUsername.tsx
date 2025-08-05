interface IProps {
  username: string;
}

export const ScoreUsername = (props: IProps) => (
  <div className="score-username">{props.username}</div>
);
