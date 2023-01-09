import React from 'react';
import '../styles/GridSquare.css';

export default function GridSquare(props) {
  const {
    col,
    row,
    type,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  } = props;

  return (
    <div
      id={`grid-${row}-${col}`}
      className={`gridSquare ${type}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}>
    </div>
  );
}