import { useEffect, useState } from "react";
import "../../styles/map.css";
import { IMapData } from "../../types/map";
import { useMovement } from "../../hooks/useMovement";
import { displayMap } from "../../utils/map.utils";
import { Line } from "./line";

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
};
export function Map() {
  const [map, setMap] = useState<IMapData | null>(recivedData);

  useMovement(map, setMap);

  //for debuging, delete later
  useEffect(() => {
    console.log(displayMap(map));
  }, [map]);

  if (!map) return <></>;
  return displayMap(map).map((array, index) => (
    <div className="line" key={index}>
      <Line array={array}></Line>
    </div>
  ));
}
