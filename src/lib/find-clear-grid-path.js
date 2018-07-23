import { cloneDeep } from 'lodash';
import PriorityQueue from 'priorityqueue';
import {
  CELL_STATE_CLEAR,
  CELL_STATE_END_POINT
} from "../reducers/grid";
import { findStartCoordinates } from "./utils";

export const NORTH = 'NORTH';
export const EAST = 'EAST';
export const SOUTH = 'SOUTH';
export const WEST = 'WEST';

const VALID = 'VALID';
const INVALID = 'INVALID';
const BLOCKED = 'BLOCKED';
const UNKNOWN = 'UNKNOWN';
const VISITED = 'VISITED';

export const findClearGridPath = function(_grid) {

  const grid = cloneDeep(_grid);
  const queue = new PriorityQueue();

  const startCoordinates = findStartCoordinates(grid);

  const distanceFromTop = startCoordinates[0];
  const distanceFromLeft = startCoordinates[1];

  const location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'Start'
  };

  queue.enqueue(location);

  while (queue.size() > 0) {
    const currentLocation = queue.dequeue();
    let newLocation;

    newLocation = exploreInDirection(grid, currentLocation, NORTH);
    if (newLocation.status === CELL_STATE_END_POINT) {
      return newLocation.path;
    } else if (newLocation.status === VALID) {
      queue.enqueue(newLocation);
    }

    newLocation = exploreInDirection(grid, currentLocation, EAST);
    if (newLocation.status === CELL_STATE_END_POINT) {
      return newLocation.path;
    } else if (newLocation.status === VALID) {
      queue.enqueue(newLocation);
    }

    newLocation = exploreInDirection(grid, currentLocation, SOUTH);
    if (newLocation.status === CELL_STATE_END_POINT) {
      return newLocation.path;
    } else if (newLocation.status === VALID) {
      queue.enqueue(newLocation);
    }

    newLocation = exploreInDirection(grid, currentLocation, WEST);
    if (newLocation.status === CELL_STATE_END_POINT) {
      return newLocation.path;
    } else if (newLocation.status === VALID) {
      queue.enqueue(newLocation);
    }
  }

  return false;
};

const locationStatus = function(grid, location) {
  const gridSize = grid.length;
  const dft = location.distanceFromTop;
  const dfl = location.distanceFromLeft;

  if (location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= gridSize ||
      location.distanceFromTop < 0 ||
      location.distanceFromTop >= gridSize) {

    return INVALID;
  } else if (grid[dft][dfl] === CELL_STATE_END_POINT) {
    return CELL_STATE_END_POINT;
  } else if (grid[dft][dfl] !== CELL_STATE_CLEAR) {
    return BLOCKED;
  } else {
    return VALID;
  }
};

const exploreInDirection = function(grid, currentLocation, direction) {
  const newPath = currentLocation.path.slice();
  newPath.push(direction);

  let dft = currentLocation.distanceFromTop;
  let dfl = currentLocation.distanceFromLeft;

  if (direction === NORTH) {
    dft -= 1;
  } else if (direction === EAST) {
    dfl += 1;
  } else if (direction === SOUTH) {
    dft += 1;
  } else if (direction === WEST) {
    dfl -= 1;
  }

  const newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: UNKNOWN
  };
  newLocation.status = locationStatus(grid, newLocation);

  if (newLocation.status === VALID) {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = VISITED;
  }

  return newLocation;
};
