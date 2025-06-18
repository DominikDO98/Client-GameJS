import { useMovemant } from "../../hooks/useMovement";
import { IDifficultySettings, IMapData } from "../../types/map";
import { displayMap } from "../../utils/map.utils";
import { Line } from "./Line";

interface IProps {
  map: IMapData;
  setMap: React.Dispatch<React.SetStateAction<IMapData | null>>;
  diff: IDifficultySettings;
  setDiff: React.Dispatch<React.SetStateAction<IDifficultySettings>>;
}
export const Grid = (props: IProps) => {
  useMovemant(props.map, props.setMap, props.diff, props.setDiff);

  return (
    <div className="map">
      {displayMap(props.map).map((array, index) => (
        <div className="line" key={index}>
          <Line array={array}></Line>
        </div>
      ))}
    </div>
  );
};
