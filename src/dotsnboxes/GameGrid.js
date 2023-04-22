import React, { Component } from 'react';
import Grid from './Grid';
import Popup from './Popup';
import '../styles/DotsNBoxes.css'

// each sublist represents a square, and contains the lines that make up that square
const squares = [['line1', 'line4', 'line5', 'line8'],
                ['line2', 'line5', 'line6', 'line9'],
                ['line3', 'line6', 'line7', 'line10'],
                ['line8', 'line11', 'line12', 'line15'],
                ['line9', 'line12', 'line13', 'line16'],
                ['line10', 'line13', 'line14', 'line17'],
                ['line15', 'line18', 'line19', 'line22'],
                ['line16', 'line19', 'line20', 'line23'],
                ['line17', 'line20', 'line21', 'line24']]

//selected squares contains a bool for each square, true if the square has been filled, false otherwise
const selectedSquares = [false, false, false, false, false, false, false, false, false]
// playerSquareWins keeps a running tally of each players points
const playerSquareWins = [0, 0, 0]
// selectedLines stores all lines which have been clicked
let selectedLines = []


export default class GameGrid extends Component {
  // initialize state with player 1 and gameover false
  constructor() {
    super();
    this.state = {
      player: 1,
      gameOver: false,
    };
  }

  // ensure correct state when component initially mounts
  // also adds the window resize event listener
  componentDidMount() {
    this.setState({ player: 1, gameOver: false });
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  // clear state and global vars to default when the component is unmounted
  // also removes the window resize event lisener
  componentWillUnmount() {
    this.restartGame();
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  // iterates through the list of selected lines and checks if the given lineID matches any selected line
  checkForSelectedLine(lineID) {
    for (let selectedLine of selectedLines) {
      if (lineID === selectedLine) { return (true) }
    }
    return (false)
  }

  // when window is resized, restart game incase smaller display is needed
  handleResize() {
    this.restartGame();
  }

  // getValidSquares returns a list of any completed squares, if any exist, or an empty list otherwise
  getValidSquares(lineID) {
    let validSquares = []
    let i = 1

    for (let square of squares) {
      let squareIsComplete = true

      for (let line of square) {
        // if line = currently selected line, ignore and continue
        if (line === lineID) { continue }
        // else if line hasn't been selected, then square is not complete
        else if (!this.checkForSelectedLine(line)) { squareIsComplete = false }
      }

      // if the square was completed, push value to validSquares if it does not exist in the selectedSquares list
      // ie this is the first time the sqaure has been completed
      if (squareIsComplete) {
        if (!selectedSquares[i - 1]) {
          selectedSquares[i - 1] = true;
          validSquares.push(`square${i}`)
        }
      }
      i++
    }

    return (validSquares)
  }

  // restartGame resets the global variables to their defaults, and resets the state to player 1 and gameover false
  restartGame() {
    let index
    for (let index in selectedSquares) { selectedSquares[index] = false }
    for (let index in playerSquareWins) { playerSquareWins[index] = 0 }
    selectedLines = []
    index = 1
    for (let square of squares) {
      // remove any text in square
      if (document.getElementById(`square${index}`) !== null) {
        document.getElementById(`square${index}`).textContent = "" 
      }
      index++
      // reset all selected lines to gamelines
      for (let line of square) {
        if (document.getElementById(line) !== null) {
          document.getElementById(line).setAttribute('class', 'gameline')
        }
        
      }
    }
    this.setState({ player: 1, gameOver: false });
  }

  // handleLineClick handles the game logic by updating the state as well as the global vars
  handleLineClick(lineID) {
    const clickedLine = document.getElementById(lineID)
    // if line has already been selected, return
    if (clickedLine.getAttribute('class') !== 'gameline') { return }
    let validSQs = []

    // handle turn differently based on player number
    switch (this.state.player) {
      case 1:
        selectedLines.push(lineID);
        // get list of completed squares (if any)
        validSQs = this.getValidSquares(lineID);
        clickedLine.setAttribute('class', 'selectedlinered');
        // fill completed squares with player number
        for (let validSQ of validSQs) {
          document.getElementById(validSQ).textContent = "Player 1";
          document.getElementById(validSQ).setAttribute('fill', "red");
          playerSquareWins[0]++
        }

        // if completed squares exist, player gets another turn
        if (validSQs.length > 0) {
          this.checkPlayer(1);
          break;
        }

        // if no completed squares exist, switch player
        this.switchPlayer(1);
        break;
      case 2:

        selectedLines.push(lineID);
        // get list of completed squares (if any)
        validSQs = this.getValidSquares(lineID);
        clickedLine.setAttribute('class', 'selectedlinegreen');
        // fill completed squares with player number
        for (let validSQ of validSQs) {
          document.getElementById(validSQ).textContent = "Player 2";
          document.getElementById(validSQ).setAttribute('fill', "green");
          playerSquareWins[1]++
        }

        // if completed squares exist, player gets another turn
        if (validSQs.length > 0) {
          this.checkPlayer(2);
          break;
        }

        // if no completed squares exist, switch player
        this.switchPlayer(2);
        break;
      case 3:
        selectedLines.push(lineID);
        // get list of completed squares (if any)
        validSQs = this.getValidSquares(lineID);
        clickedLine.setAttribute('class', 'selectedlineblue');
        // fill completed squares with player number
        for (let validSQ of validSQs) {
          document.getElementById(validSQ).textContent = "Player 3";
          document.getElementById(validSQ).setAttribute('fill', "blue");
          playerSquareWins[2]++
        }

        // if completed squares exist, player gets another turn
        if (validSQs.length > 0) {
          this.checkPlayer(3);
          break;
        }

        // if no completed squares exist, switch player
        this.switchPlayer(3);
        break;
      default:
        break;
    }
  }

  // checkPlayer checks if the game is over (if all squares are complete)
  // if not return control to same player
  // this function is called when a player completes a square and possibly gets another turn
  checkPlayer(playerNum) {
    let isGameOver = true
    for (let selectedSQ of selectedSquares) {
      if (!selectedSQ) {
        isGameOver = false
      }
    }
    if (isGameOver) {
      this.setState({ gameOver: true })
    }
    else {
      this.setState({ player: playerNum })
    }
  }

  // switchPlayer checks if the game is over (if all squares are complete)
  // if not switch control to the next player
  switchPlayer(playerNum) {
    let isGameOver = true
    for (let selectedSQ of selectedSquares) {
      if (!selectedSQ) {
        isGameOver = false
      }
    }

    if (isGameOver) {
      this.setState({ gameOver: true })
    }


    if (playerNum === 3) {
      this.setState({ player: 1 })
    }
    else {
      this.setState({ player: this.state.player + 1 })
    }
  }

  // getWinners returns a list of winners based on total points
  // if one or more players is tied for the highest score, return
  // all players which are tied for first place
  getWinners() {
    let max = Math.max(...playerSquareWins);
    let winners = []
    for (let index in playerSquareWins) {
      if (playerSquareWins[index] === max) { winners.push(++index) }
    }
    return (winners);
  }


  // showWinners displays the results from getWinners based on how many
  // winners there were.
  showWinners() {
    let winners = this.getWinners();
    if (winners.length === 3) {
      return(
        <h2>Three way tie between Players 1, 2 & 3!</h2>
      )
    }
    else if (winners.length === 2) {
      return(
        <h2>Two way tie between Players {winners[0]} & {winners[1]}!</h2>
      )
    }
    else {
      return(
        <h2>Player {winners[0]} has won!</h2>
      )
    }
  }


  //render displays the gameboard, title and reset button, as well as passing the onMouseDown function
  // to the grid component, the restart game function to its buttion, and the trigger needed to close the popup component
  render() {
    const { gameOver } = this.state;
    return (
      <div className='gamegrid'>
        {/* use innergg-small if window width < 1050 px */}
        <div className={(window.innerWidth < 1050) ? "innergg-small" : "innergg"}>
          <button onClick={() => this.restartGame()} className='restartbtn'>Restart Game</button>
          <div className='gamescores'>
            <h3 className='player1'>Player 1: {playerSquareWins[0]}</h3>
            <h3 className='player2'>Player 2: {playerSquareWins[1]}</h3>
            <h3 className='player3'>Player 3: {playerSquareWins[2]}</h3>
          </div>
          {/* if window width < 1050 px display the grid with height and width 300, 500 otherwise */}
          <Grid
            onMouseDown={(line) => this.handleLineClick(line)}
            {...(window.innerWidth < 1050) ? {width: 300, height: 300, textSize: 1} : {width: 500, height: 500, textSize: 1}}
          ></Grid>
          {/* if gameOver true, show popup. empty tag otherwise */}
          <Popup trigger={gameOver} setTrigger={() => this.setState({ gameOver: false })} >
            {this.showWinners()}
          </Popup>
        </div>
      </div>
    )
  }
}