export function breadthFirstSearch(grid, startNode) {
  const visitedNodesInOrder = [];
  startNode.color = "grey";
  startNode.distance = 0;
  visitedNodesInOrder.push(startNode);
  var queue = [];
  queue.push(startNode);
  while (!!queue.length) {
    const node = queue.shift();
    for (let neigh of node.neighbors) {
      neigh = grid[neigh[0]][neigh[1]];
      if (neigh.color === "white" && !(neigh.type === "wall")) {
        neigh.color = "grey";
        neigh.distance = node.distance + 1;
        neigh.parentNode = node;
        queue.push(neigh);
        visitedNodesInOrder.push(neigh);
      }
    }
    node.color = "black";
  }

  return visitedNodesInOrder;
}