import { useEffect, useRef, useState } from "react";
import { requestMap } from "../../communication/map";
import { DEFAULT_DIFFICULTY } from "../../constants/difficulty";
import "../../styles/map.css";
import { IDifficultySettings, IMapData } from "../../types/map";
import { Grid } from "./Grid";

// const recivedData: IMapData = {
//   player: [2, 1],
//   obstacles: [
//     [3, 3],
//     [3, 4],
//     [3, 5],
//     [4, 5],
//     [5, 5],
//     [6, 5],
//   ],
//   points: [
//     [9, 0],
//     [8, 3],
//     [4, 4],
//   enemies: [
//     [9, 9],
//     [8, 9],
//   ],
// };
export function Map() {
  const [map, setMap] = useState<IMapData | null>(null);
  const diff = useRef<IDifficultySettings>(DEFAULT_DIFFICULTY);
  useEffect(() => {
    try {
      requestMap(diff.current, setMap);
    } catch (error) {
      console.log(error);
    }
  }, [diff]);
  if (!map) return <>Loading the map...</>;
  return <Grid map={map} setMap={setMap} diff={diff}></Grid>;
}
