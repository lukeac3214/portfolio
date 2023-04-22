import { MinHeap } from "../DataStructs/Heap";

// Dijkstra's extracts each node once from the minHeap, and calculates the distance to each of its neigbors.
// Each node can have a max of 4 neighbors (up, down, left, right).
// The insert and changeKey operations take a max of log( V ) run-time for each neighbor on lines 35 and 42.
// Therefore, running time is V * 4log V, or O(V log V)
export function dijkstra(grid, startNode) {
  let visitedNodesInOrder = [];
  startNode.distance = 0;
  let minHeap = new MinHeap(grid.length * grid[0].length)
  minHeap.insert(startNode)

  // each node is extracted once, and all of its neighbors distances calculated
  while (!!minHeap.size) {
    const closestNode = minHeap.extractMin();
    if (closestNode.type === "wall") continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    relaxUnvisitedNeighbors(closestNode, grid, minHeap);
  }
  return visitedNodesInOrder;
}

// relaxUnvisitedNeighbors updates a nodes distance only if it hasn't been seen before,
// or if the new path to the node is shorter than the old path
function relaxUnvisitedNeighbors(node, grid, minHeap) {
  for (let neighbor of node.neighbors) {
    neighbor = grid[neighbor[0]][neighbor[1]];

    if (neighbor.isVisited) continue;

    // if neighbor not in minHeap then it hasnt been seen before,
    // assign it node.distance + 1
    if (!minHeap.contains(neighbor)) {
      neighbor.distance = node.distance + 1;
      neighbor.parentNode = node;
      minHeap.insert(neighbor)
    }
    // else node has been seen before,
    // only update distance if new distance is smaller
    else if (neighbor.distance > node.distance + 1) {
      neighbor.distance = node.distance + 1;
      neighbor.parentNode = node;
      minHeap.changeKey(neighbor)
    }
  }
}
