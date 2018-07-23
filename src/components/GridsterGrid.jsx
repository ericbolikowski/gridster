import React from 'react';
import { css } from 'emotion'
import { connect } from 'react-redux';
import { find, drop, dropRight } from 'lodash';
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

const cellTypeToCssClassMap = {
  [ CELL_STATE_FILLED ]: filled,
  [ CELL_STATE_CLEAR ]: clear,
  [ CELL_STATE_END_POINT ]: endPoint,
  [ CELL_STATE_START_POINT ]: startPoint,
}

const _GridsterGrid = ({ grid, dispatch: d }) => {

  const height = grid.length;
  const width = grid[ 0 ].length;

  const namedCells = grid.map((row, y) => row.map((cell, x) => `cell-${y}-${x} ${cell}`));
  const gridTemplateAreas = grid.map((row, y) => row.map((cell, x) => `cell-${y}-${x}`)).map(row => {
    return `'${row.join(" ")}'`;
  }).join("\n")

  const solutionPath = findClearGridPath(grid);
  let solutionCoords;
  if (solutionPath) {
    solutionCoords = convertSolutionPathToCoordinates(grid, solutionPath);
    solutionCoords = drop(dropRight(solutionCoords));
  }

  const gridWidth = 800;
  const gridAspectRatio = height / width;
  const gridHeight = gridWidth * gridAspectRatio;

  return (
      <div style={{ display: 'grid', gridTemplate: gridTemplateAreas, width: `${gridWidth}px`, height: `${gridHeight}px` }}>
        {namedCells.map((row, y) => row.map((cell, x) => {
          let colorClass;
          if (solutionCoords && isXYInCoords(solutionCoords, x, y)) {
            colorClass = solution
          } else {
            colorClass = find(cellTypeToCssClassMap, (v, k) => cell.indexOf(k) !== -1)
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
      const { grid: { grid } } = state;
      return { grid };
    },
    null
)(_GridsterGrid);

export default GridsterGrid;
