import React from 'react';
import { css } from 'emotion'
import { connect } from 'react-redux';
import { CELL_STATE_CLEAR, CELL_STATE_FILLED, CELL_STATE_START_POINT, CELL_STATE_END_POINT, gridCellToggle } from "../reducers/grid";
import { findClearGridPath } from "../lib/find-clear-grid-path";
import { convertSolutionPathToCoordinates, isXYInCoords } from "../lib/utils";

const cellCss = css`
  border: 1px solid rgb(212, 212, 212);
  width: 100%; height: 100%;
`

const filled = css`
  background-color: rgb(237, 237, 237)
`
const clear = css`
  background-color: white;
`
const startPoint = css`
  background-color: rgb(111, 206, 27);
`
const endPoint = css`
  background-color: rgb(82, 134, 37);
`
const down = css`
  &:active:hover {
    background-color: rgb(219, 219, 219);
  }
`
const hover = css`
  &:hover {
    background-color: rgb(246, 246, 246);
  }
`
const solution = css`
  background-color: rgb(240, 149, 28);
`

const _GridsterGrid = ({ grid, dispatch: d }) => {

  const namedCells = grid.map((row, y) => row.map((cell, x) => `cell-${y}-${x} ${cell}`));
  const gridTemplateAreas = grid.map((row, y) => row.map((cell, x) => `cell-${y}-${x}`)).map(row => {
    return `'${row.join(" ")}'`;
  }).join("\n")

  const solutionPath = findClearGridPath(grid);
  let solutionCoords;
  if (solutionPath) {
    solutionCoords = convertSolutionPathToCoordinates(grid, solutionPath);
  }

  return (
      <div style={{ display: 'grid', gridTemplate: gridTemplateAreas, width: '800px', height: '800px' }}>
        {namedCells.map((row, y) => row.map((cell, x) => {
          let colorClass;
          if (solutionCoords && isXYInCoords(solutionCoords, x, y)) {
            colorClass = solution
          } else if (cell.indexOf(CELL_STATE_FILLED) !== -1) {
            colorClass = filled;
          } else if (cell.indexOf(CELL_STATE_CLEAR) !== -1) {
            colorClass = clear;
          } else if (cell.indexOf(CELL_STATE_END_POINT) !== -1) {
            colorClass = endPoint;
          } else if (cell.indexOf(CELL_STATE_START_POINT) !== -1) {
            colorClass = startPoint;
          }
          return (
              <div
                  key={cell}
                  className={`${cellCss} ${colorClass} ${cell} ${hover} ${down}`}
                  onClick={() => d(gridCellToggle(x, y))}
              ></div>)
        }))}
      </div>
  )
}

export const GridsterGrid = connect(
    (state) => {
      const { grid: { width, height, grid } } = state;
      return { width, height, grid };
    },
    null
)(_GridsterGrid);

export default GridsterGrid;
