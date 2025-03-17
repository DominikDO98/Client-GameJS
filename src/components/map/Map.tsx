import { useState } from "react";
import { useMovemant } from "../../hooks/useMovement";
import "../../styles/map.css";
import { IMapData } from "../../types/map";
import { displayMap } from "../../utils/map.utils";
import { Line } from "./Line";

const recivedData: IMapData = {
  player: [2, 1],
  obstacles: [
    [3, 3],
    [3, 4],
    [3, 5],
    [4, 5],
    [5, 5],
    [6, 5],
  ],
  points: [
    [9, 0],
    [8, 3],
    [4, 4],
  ],
  enemy: [
    [9, 9],
    [8, 9],
  ],
};
export function Map() {
  const [map, setMap] = useState<IMapData>(recivedData);

  useMovemant(map, setMap);

  if (!map) return <></>;
  return (
    <div className="map">
      {displayMap(map).map((array, index) => (
        <div className="line" key={index}>
          <Line array={array}></Line>
        </div>
      ))}
    </div>
  );
}
