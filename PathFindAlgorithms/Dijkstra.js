import PriorityQueue from "../DataStructs/PriorityQueue";

export function dijkstra(grid, startNode) {
    let visitedNodesInOrder = [];
    startNode.distance = 0;
    let minQueue = new PriorityQueue();

    for (const row of grid) {
      for (const node of row) {
        minQueue.enqueue(node);
      }
    }
    
    while (!!minQueue.pQueue.length) {
      const closestNode = minQueue.dequeue();
      if (closestNode.type === "wall") continue;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode.type === "finish") return visitedNodesInOrder;
      relaxUnvisitedNeighbors(closestNode, grid, minQueue);
    }
    
  }
  
  function relaxUnvisitedNeighbors(node, grid, minQueue) {
    for (let neighbor of node.neighbors) {
      neighbor = grid[neighbor[0]][neighbor[1]];
      if (neighbor.isVisited) continue;
      neighbor.distance = node.distance + 1;
      neighbor.parentNode = node;
      minQueue.requeue(neighbor)
    }
  }
