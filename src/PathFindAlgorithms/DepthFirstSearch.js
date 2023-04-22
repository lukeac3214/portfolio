// Standard DFS using recursion to reach the "bottom" of a path before trying other paths
export function depthFirstSearch(grid, startNode) {
    let visitedNodesInOrder = [];
    visitedNodesInOrder.push(startNode);
    let time = 0;
    startNode.color = "black"
    startNode.distance = time;

    for (let node of startNode.neighbors) {
        node = grid[node[0]][node[1]];
        if (node.color === "white" && !(node.type === "wall")) {
            node.parentNode = startNode;
            dfsVisit(node, time);
        }
    }

    return visitedNodesInOrder;

    function dfsVisit(node, time) {
        time++;
        node.distance = time;
        node.color = "grey";
        visitedNodesInOrder.push(node);
        for (let neighbor of node.neighbors) {
            neighbor = grid[neighbor[0]][neighbor[1]];
            if (neighbor.color === "white" && !(neighbor.type === "wall")) {
                neighbor.parentNode = node;
                dfsVisit(neighbor, time);
            }
        }
        node.color = "black";
        time++;
        node.finishTime = time;
        return visitedNodesInOrder;
    }
}