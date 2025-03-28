import { movement } from "../constants/movment";
import { IMapData, TPosition } from "../types/map";
import { INode } from "../types/pathFinding";

export const generateNewPosition = (pos: TPosition, move: TPosition) => {
  return [pos[0] + move[0], pos[1] + move[1]] as TPosition;
};

export const checkBorder = (position: TPosition) => {
  return (
    position[0] < 0 || position[0] > 9 || position[1] < 0 || position[1] > 9
  );
};

export const checkOverlap = (position: TPosition, array: TPosition[]) => {
  return JSON.stringify(array).includes(JSON.stringify(position));
};

export const moveAllEnemies = (
  map: IMapData,
  enemyMovemant: React.RefObject<TPosition[]>
) => {
  map.enemy.forEach((enemy, index) => {
    choosePath(map, enemy, index, enemyMovemant);
  });
};

export const handlePlayerMovemant = (
  map: IMapData,
  playerMovemant: React.RefObject<TPosition>
): TPosition => {
  if (
    checkBorder(playerMovemant.current) ||
    checkOverlap(playerMovemant.current, map.obstacles)
  ) {
    return [map.player[0], map.player[1]];
  } else {
    return playerMovemant.current;
  }
};

const calculateCost = (
  position: TPosition,
  node: TPosition,
  map: IMapData
): [number, number] => {
  const GCost: number =
    Math.abs(node[0] - position[0]) + Math.abs(node[1] - position[1]);
  const HCost: number =
    Math.abs(node[0] - map.player[0]) + Math.abs(node[1] - map.player[1]);
  return [GCost, HCost];
};

const checkDirection = (
  position: TPosition,
  map: IMapData,
  movement: TPosition
) => {
  return (
    !checkBorder(generateNewPosition(position, movement)) &&
    !checkOverlap(generateNewPosition(position, movement), [
      ...map.obstacles,
      ...map.points,
      ...map.enemy,
    ])
  );
};

const getOptions = (position: TPosition, map: IMapData) => {
  const options: TPosition[] = [];
  if (checkDirection(position, map, movement.up))
    options.push(generateNewPosition(position, movement.up));
  if (checkDirection(position, map, movement.down))
    options.push(generateNewPosition(position, movement.down));
  if (checkDirection(position, map, movement.left))
    options.push(generateNewPosition(position, movement.left));
  if (checkDirection(position, map, movement.right))
    options.push(generateNewPosition(position, movement.right));
  console.log("options", options);
  return options;
};

const calculateSurroundings = (
  position: TPosition,
  node: INode,
  map: IMapData
): INode[] => {
  return getOptions(node.node, map).map((option) => {
    return {
      node: option,
      cost: calculateCost(position, option, map),
      connection: [...node.connection, option],
    };
  });
};

const chooseLowestCost = (
  node: INode,
  searched: INode[],
  processed: INode[]
): INode => {
  const filtered = searched.filter(
    (value) => !JSON.stringify(processed).includes(JSON.stringify(value))
  );
  if (!filtered[0]) return node;
  return filtered.reduce((min, curr) => {
    if (min.cost[0] + min.cost[1] > curr.cost[0] + curr.cost[1]) return curr;
    if (min.cost[0] + min.cost[1] === curr.cost[0] + curr.cost[1])
      return min.cost[1] > curr.cost[1] ? curr : min;
    return min;
  });
};

const pathFinding = (position: TPosition, map: IMapData): TPosition[] => {
  const searched: INode[] = [];
  const processed: INode[] = [];
  let path: TPosition[] = [];
  let newPosition: INode = {
    node: [...position],
    cost: [0, 0],
    connection: [],
  };
  let i: number = 0;
  console.log(processed, searched);

  do {
    searched.push(...calculateSurroundings(position, newPosition, map));
    console.log("searched", searched);
    const lowest = chooseLowestCost(newPosition, searched, processed);
    processed.push(lowest);
    console.log("processed", processed);
    newPosition = {
      ...lowest,
    };
    path = [...newPosition.connection];
    i++;

    if (
      newPosition.node[0] === map.player[0] &&
      newPosition.node[1] === map.player[1]
    ) {
      break;
    }
  } while (i < 16);
  console.log("path at finding", path);
  return path;
};

const choosePath = (
  map: IMapData,
  position: TPosition,
  index: number,
  enemyMovemant: React.RefObject<TPosition[]>
) => {
  console.log("ENEMY INDEX", index);
  const path = pathFinding(position, map);
  console.log("path  ", path);

  if (
    !path[0] ||
    !path ||
    checkOverlap(path[0], enemyMovemant.current.slice(0, index))
  ) {
    return;
  } else {
    enemyMovemant.current[index] = path[0];
    return;
  }
};
