import { API_URL } from "../constants/api";
import { IDifficultySettings, IMapData } from "../types/map";

export const requestMap = async (
  diff: IDifficultySettings,
  setMap: React.Dispatch<React.SetStateAction<IMapData | null>>
) => {
  let retries = 0;
  while (retries < 10) {
    try {
      const response = await fetch(`${API_URL}/map`, {
        method: "post",
        credentials: "include",
        headers: {
          "access-control-allow-origin": "http://localhost:5173",
          "content-type": "application/json",
        },
        body: JSON.stringify(diff),
      });
      if (!response.ok) {
        retries++;
        continue;
      }
      if (response.ok) {
        const data: IMapData = await response.json();
        setMap(data);
        break;
      }
    } catch (error) {
      console.error("Network error", error);
      retries++;
    }
  }
  if (retries >= 10)
    throw new Error("Unable to fetch map data due to unkown causes");
};
