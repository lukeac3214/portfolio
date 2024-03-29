import { MinHeap } from '../DataStructs/Heap.js';

// A-star uses a heuristic to value each node's distance from the
// finish node
export function aStar(grid, startNode, finishNode) {
  // this min heap keeps node with the smallest distance to finish node at the front of the list
  let open = new MinHeap(grid.length * grid[0].length)
  const visitedNodesInOrder = [];
  startNode.g = 0;
  startNode.distance = heuristic([startNode.row, startNode.col], [finishNode.row, finishNode.col]);
  open.insert(startNode);
  visitedNodesInOrder.push(startNode);

  // runs until the min heap's length is 0
  // this means all feasible nodes have been considered
  // nodes with a higher or equal distance are not considered, unless necessary
  while (!!open.size) {
    const node = open.extractMin();

    // if current node if finish node, path has been found
    if (node.type === "finish") return visitedNodesInOrder;
    node.isVisited = true;

    // check all neighbors, add the ones with smallest distance to queue
    for (let neigh of node.neighbors) {
      // use coords to grab actual node from 2d grid array
      neigh = grid[neigh[0]][neigh[1]];

      // if wall, then ignore
      if (neigh.type === "wall") continue;
      let tempGScore = node.g + 1;

      if (tempGScore < neigh.g) {
        neigh.parentNode = node;
        neigh.g = tempGScore;
        neigh.distance = tempGScore + heuristic([neigh.row, neigh.col], [finishNode.row, finishNode.col])

        if (!open.contains(neigh)) {
          visitedNodesInOrder.push(neigh);
          open.insert(neigh);
        }
      }
    }
  }
  return visitedNodesInOrder;
}

// calculate absolute distance between two coords
function heuristic([x1, y1], [x2, y2]) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}