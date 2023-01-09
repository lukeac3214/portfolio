export function depthFirstSearch(grid, startNode) {
    var visitedNodesInOrder = [];
    visitedNodesInOrder.push(startNode);  
    var time = 0;
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
        for (var nd of node.neighbors) {
            nd = grid[nd[0]][nd[1]];
            if (nd.color === "white" && !(nd.type === "wall")) {
                nd.parentNode = node;
                dfsVisit(nd, time);
            }
        }
        node.color = "black";
        time++;
        node.finishTime = time;
        return visitedNodesInOrder;
    }
}