interface IProps {
  score: number;
}
export const ScoreNumber = (props: IProps) => (
  <div className="score-number">{props.score}</div>
);
