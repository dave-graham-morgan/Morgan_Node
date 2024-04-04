import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  console.log(board)
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let i = 0;i<nrows;i++){
      initialBoard[i]=[]
      for(let j = 0;j<ncols;j++){
        initialBoard[i].push(getRandomLighting());
      }
    }
    return initialBoard
  }

  function getRandomLighting(){
    return Math.floor(Math.random()*2) === 1 ? true : false;
  }

  function hasWon(board) {
    //check the board in state to determine whether the player has won.
    for(let i = 0;i<nrows;i++){
      if(board[i].some(element => element === true)){
        return false;
      }
      return true; //TODO this is only looking one row deep
    }
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const boardCopy = oldBoard.map(row=> [...row]);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      flipCell(y, x, boardCopy)
      return boardCopy
    });
  }

  //if the game is won, just show a winning msg & render nothing else
  if(hasWon(board)){
    return <h1>You Won</h1>
  }

  return (
      <div>
        <table>
          <thead>
            <tr>
              {board.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((isLitBoolean, colIndex) => (
                        <Cell key={`${rowIndex}-${colIndex}`}
                              isLit={isLitBoolean}
                              flipCellsAroundMe={flipCellsAround}
                              x={rowIndex}
                              y={colIndex}
                        />
                    ))}
                  </tr>
              ))}
            </tr>
          </thead>
        </table>
      </div>
  )
}



export default Board;
