import { CELL_STATE_START_POINT } from "../reducers/grid";
import { each, last, some } from 'lodash';
import { NORTH, EAST, SOUTH, WEST } from './find-clear-grid-path'

export const findStartCoordinates = grid => {
  let startCoordinates;
  each(grid, (row, y) => {
    each(row, (cell, x) => {
      if (cell === CELL_STATE_START_POINT) startCoordinates = [y, x];
    });
  });
  if (startCoordinates) return startCoordinates;
  return false;
};

export const convertSolutionPathToCoordinates = (grid, path) => {
  const startCoordinates = findStartCoordinates(grid);
  const coords = [startCoordinates];
  each(path, direction => {
    const lastCoords = last(coords);
    const newCoords = [lastCoords[0], lastCoords[1]];
    if (direction === NORTH) {
      newCoords[ 0 ]--;
    } else if (direction === EAST) {
      newCoords[ 1 ]++;
    } else if (direction === SOUTH) {
      newCoords[ 0 ]++;
    } else if (direction === WEST) {
        newCoords[1]--;
    }
    coords.push(newCoords);
  })
  return coords;
}

export const isXYInCoords = (coords, x, y) => some(coords, c => c[0] === y && c[1] === x);
