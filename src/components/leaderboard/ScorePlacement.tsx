interface IProps {
  placement: number;
}

export const ScorePlacement = (props: IProps) => {
  return <div className="score-placement">{props.placement + "."}</div>;
};
