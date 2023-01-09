import React from 'react';
import GridSquare from './GridSquare.js';
import { dijkstra } from '../PathFindAlgorithms/Dijkstra.js';
import { aStar } from '../PathFindAlgorithms/AStar.js';
import { breadthFirstSearch } from '../PathFindAlgorithms/BreadthFirstSearch.js';
import { depthFirstSearch } from '../PathFindAlgorithms/DepthFirstSearch.js';
import Slider from '@material-ui/core/Slider';
import { Grid, Box, Button } from '@material-ui/core';
import Popup from '../components/Popup.js';
import { useEffect, useState } from 'react';
import '../styles/PathFindingVisualizer.css';

const windowHeightDivisor = 54;
const windowWidthDivisor = 28;
let numRows = Math.floor(window.innerHeight / windowHeightDivisor);
let numCols = Math.floor(window.innerWidth / windowWidthDivisor);
let timers = [];
let valid = true;
let walls = false;
let animationSpeedMs = (window.innerWidth < 835) ? 10 : 5;
let pathLen = 0;
let startRow = (Math.ceil(numRows / 4) < numRows) ? Math.ceil(numRows / 4) : 0;
let startCol = Math.ceil(numCols / 4);
let finishRow = ((numRows - startRow) < numRows) ? numRows - startRow : 0;
let finishCol = numCols - startCol;
let foundPath = false

const NODE_SIZE_PX = 25;
const marks = [
  {
    value: 2,
    label: '2ms',
  },
  {
    value: 5,
    label: '5ms',
  },
  {
    value: 10,
    label: '10ms',
  },
  {
    value: 25,
    label: '25ms',
  },
];

// Visualizes the action of A-Star, Djikstra's, BFS, and DFS pathfinding algorithms
export default function PathfindingVisualizer() {

  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [shortestPath, setShortestPath] = useState(true);

  // window resize event listener and grid reset
  useEffect(() => {
    // on component mount, create default grid and add window resize listener
    resetGrid();
    window.addEventListener('resize', handleResize.bind(this));

    return () => {
      // on component unmount, remove window resize listener and create default grid
      window.removeEventListener('resize', handleResize.bind(this));
      resetGrid();
    };

  }, []);

  // resets the grid, global vars and state to initial defaults
  function resetGrid() {
    // clear any animation timers
    for (let timer of timers) {
      clearTimeout(timer);
      timer = null;
    }
    timers = [];

    // iterate through all squares in the grid, resetting them to default unclicked value
    for (let x = 0; x < numCols; x++) {
      for (let y = 0; y < numRows; y++) {
        if (document.getElementById(`grid-${y}-${x}`) !== null) {
          let nodeToReset = document.getElementById(`grid-${y}-${x}`);
          if (y === startRow && x === startCol) {
            nodeToReset.className = 'gridSquare start';
            nodeToReset.type = "start";
          }
          else if (y === finishRow && x === finishCol) {
            nodeToReset.className = 'gridSquare finish';
            nodeToReset.type = "finish";
          }
          else {
            nodeToReset.className = 'gridSquare';
            nodeToReset.type = "";
          }
        } else {
          break;
        }
      }
    }

    const newGrid = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < numCols; col++) {
        currentRow.push(createSquare(col, row));
      }
      newGrid.push(currentRow);
    }
    valid = true;
    walls = false;
    foundPath = false;
    setPopUp(false);
    setShortestPath(true);
    setGrid(newGrid);
  };

  // handles the mouse click event on a grid square
  function handleMouseDown(row, col) {
    let invalidNode = grid[row][col].type === "start" || grid[row][col].type === "finish";
    if (!valid || invalidNode) return;
    const newGrid = getWallToggledGrid(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  // handles a mount being clicked and dragged across grid square(s)
  function handleMouseEnter(row, col) {
    let invalidNode = grid[row][col].type === "start" || grid[row][col].type === "finish";
    if (!mouseIsPressed || !valid || invalidNode) return;
    const newGrid = getWallToggledGrid(grid, row, col);
    setGrid(newGrid);
  }

  // handles the mount being released
  function handleMouseUp() {
    setMouseIsPressed(false)
  }

  // calculates the number of rows to display based on window height, with a minimum of 1 row
  function calcRows() {
    const rows = Math.floor(window.innerHeight / windowHeightDivisor);
    if (rows > 0) return rows;
    else return 1;
  }

  // calculates the number of cols to display based on window width, with a minimum of 10 cols
  function calcCols() {
    const cols = Math.floor(window.innerWidth / windowWidthDivisor);
    if (cols > 9) return cols;
    else return 10;
  }

  // handles the window resized event by calculating the new number of rows/cols and
  // generates a new grid
  function handleResize() {
    numRows = calcRows();
    numCols = calcCols();

    startRow = (Math.ceil(numRows / 4) < numRows) ? Math.ceil(numRows / 4) : 0;
    startCol = Math.ceil(numCols / 4);
    finishRow = ((numRows - startRow) < numRows) ? numRows - startRow : 0;
    finishCol = numCols - startCol;

    resetGrid();
  }

  // animatePath first animates the path of visited nodes in order,
  // then animates the shortest path followed by the popup. If no shortest path exists, then just trigger the popup
  function animatePath(visitedNodesInOrder, nodesInShortestPathOrder) {
    // first animate the visited nodes path
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      timers.push(setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!(node.type === "start" || node.type === "finish")) {
          document.getElementById(`grid-${node.row}-${node.col}`).className =
            'gridSquare visited';
        }
      }, animationSpeedMs * i));
    }

    // next, animate the shortest path (if none exists, trigger popup) 
    timers.push(setTimeout(() => {
      if (foundPath) animateShortestPath(nodesInShortestPathOrder);
      else setPopUp(true);
    }, animationSpeedMs * visitedNodesInOrder.length));


  }

  // animates the shortest path found
  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      timers.push(setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!(node.type === "start" || node.type === "finish")) document.getElementById(`grid-${node.row}-${node.col}`).className =
          'gridSquare shortest-path';
        if (i === nodesInShortestPathOrder.length - 1) {
          setPopUp(true);
        }
      }, 2 * animationSpeedMs * i));
    }

  }

  // iterates backwards from the finishNode to find the shortest path found from A-Star, Djikstra's and BFS
  // if DFS is used then path is not garaunteed to be shortest
  function getShortestPath(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      if (currentNode.type === "start") foundPath = true;
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.parentNode;
    }
    return nodesInShortestPathOrder;
  }

  // handles the button click for each pathfinding algo
  function handleAlgoBtnClick(type) {
    if (!valid) return;
    valid = false;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    let visitedNodesInOrder;

    switch (type) {
      case "aStar":
        visitedNodesInOrder = aStar(grid, startNode, finishNode);
        break;

      case "Djikstra":
        visitedNodesInOrder = dijkstra(grid, startNode);
        break;

      case "BFS":
        visitedNodesInOrder = breadthFirstSearch(grid, startNode);
        break;

      case "DFS":
        setShortestPath(false);
        visitedNodesInOrder = depthFirstSearch(grid, startNode);
        break;

      default:
        break;
    }
    const nodesInShortestPathOrder = getShortestPath(finishNode);
    pathLen = nodesInShortestPathOrder.length;
    animatePath(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  // creates and sets random walls on the grid
  function createRandWalls() {
    if (!valid || walls) return;
    walls = true;
    const newGrid = getGridRandWallsToggled(grid);
    setGrid(newGrid);
  }

  // get neighbors uses the total number of rows and columns to determine which nodes will be
  // neighbors of a given node on creation
  // ie if the neighbors x,y coords are in range of the grid then its a neighbor
  function getNeighbors(col, row) {
    const neighbors = [];

    if (row + 1 < numRows) {
      neighbors.push([row + 1, col]);
    }
    if (row - 1 >= 0) {
      neighbors.push([row - 1, col]);
    }
    if (col + 1 < numCols) {
      neighbors.push([row, col + 1]);
    }
    if (col - 1 >= 0) {
      neighbors.push([row, col - 1]);
    }

    return neighbors;
  }

  // returns if a grid square is a start node, finish node, or regular
  function getType(col, row) {
    if (row === startRow && col === startCol) return "start";
    else if (row === finishRow && col === finishCol) return "finish";
    else return "";
  }

  // creates a grid square with default values
  function createSquare(col, row) {
    return {
      col,
      row,
      type: getType(col, row),
      distance: Infinity,
      isVisited: false,
      parentNode: null,
      neighbors: getNeighbors(col, row),
      color: "white",
      g: Infinity,
    };
  };

  // returns a new grid with the selected wall toggled on/off
  function getWallToggledGrid(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      type: (node.type === "wall") ? "" : "wall",
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  // returns a new grid with random walls toggled
  function getGridRandWallsToggled(grid) {
    const newGrid = grid.slice();

    const density = 0.25;
    const numWalls = Math.floor(newGrid.length * newGrid[0].length * density);

    for (let i = 0; i < numWalls; i++) {
      const row = Math.floor(Math.random() * newGrid.length);
      const col = Math.floor(Math.random() * newGrid[0].length);
      const bool = newGrid[row][col].type === "wall" || newGrid[row][col].type === "start" || newGrid[row][col].type === "finish";
      if (bool) {
        continue;
      }
      else newGrid[row][col].type = "wall";
    }
    return newGrid;
  };

  return (
    <Box
      className={(window.innerWidth < 835) ? "pathFind-small-device" : "pathFind-large-device"}
      style={{ width: numCols * NODE_SIZE_PX }}>

      {/* Outer Grid for all Buttons and Slider */}
      <Grid container item xs={12}>
        <Grid container item xs={12}>

          {/* Animation Delay title and Slider */}
          <Grid item xs={(window.innerWidth < 835) ? 9 : 11}>
            <h2 className="pathFind-title">Animation Delay</h2>
            <div className="pathFind-slider">
              <Slider
                size="small"
                aria-label='Default'
                className="pathFind-slider-inner"
                style={{
                  color: "black",
                  width: "85%",
                  justifyContent: "center"
                }}
                marks={marks}
                step={null}
                defaultValue={(window.innerWidth < 835) ? 10 : 5}
                min={2}
                max={25}
                onChange={(_, value) => animationSpeedMs = value} />
            </div>
          </Grid>

          {/* Clear Grid and Random Walls buttons */}
          <Grid item xs={(window.innerWidth < 835) ? 3 : 1}>
            <Button
              className="pathFind-btn-small"
              variant='outlined'
              onClick={() => resetGrid()}>
              Clear Grid
            </Button>

            <Button
              className="pathFind-btn-small"
              variant='outlined' onClick={() =>
                createRandWalls()}>
              Random Walls
            </Button>
          </Grid>

        </Grid>

        {/* Algo buttons */}
        <Grid container item xs={12}>
          <Grid item xs={3}>
            <Button
              className="pathFind-btn-large"
              variant='outlined'
              onClick={() => handleAlgoBtnClick("aStar")}>
              A-Star
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              className="pathFind-btn-large"
              variant='outlined'
              onClick={() => handleAlgoBtnClick("Djikstra")}>
              Dijkstra
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              className="pathFind-btn-large"
              variant='outlined'
              onClick={() => handleAlgoBtnClick("BFS")}>
              Breadth-First
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              className="pathFind-btn-large"
              variant='outlined'
              onClick={() => handleAlgoBtnClick("DFS")}>
              Depth-First
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Div for Grid of squares */}
      <div className="pathFind-grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, type } = node;
                return (
                  <GridSquare
                    key={nodeIdx}
                    col={col}
                    row={row}
                    type={type}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}>
                  </GridSquare>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Popup with shortest pathlength if availabile */}
      <Popup trigger={popUp} setTrigger={() => setPopUp(false)} >
        {shortestPath ? <h1>Shortest path was found!</h1> : <h1>A path was found!</h1>}
        {foundPath ? <p>Path is {pathLen} units long</p> : <p>Path not possible!</p>}
      </Popup>

    </Box >
  );
}