import { random, chunk, cloneDeep, get } from 'lodash';

export const GRID_SETUP = 'GRID_SETUP';
export const GRID_CELL_TOGGLE = 'GRID_CELL_TOGGLE';
export const GRID_CONFIG_WIDTH_CHANGE = 'GRID_CONFIG_WIDTH_CHANGE';
export const GRID_CONFIG_HEIGHT_CHANGE = 'GRID_CONFIG_HEIGHT_CHANGE';

export const CELL_STATE_START_POINT = 'CELL_STATE_START_POINT';
export const CELL_STATE_END_POINT = 'CELL_STATE_END_POINT';
export const CELL_STATE_FILLED = 'CELL_STATE_FILLED';
export const CELL_STATE_CLEAR = 'CELL_STATE_CLEAR';

const makeGrid = (x, y) =>
    chunk(`${CELL_STATE_FILLED},`.repeat(x*y).slice(0, -1).split(','), x);
const gridAssignValToRandomCellInCol = (grid, width, height, val, x) => {
  if (x >= width) throw new Error("X coordinate larger than width!");
  const y = random(0, height-1);
  grid[y][x] = val;
}
const assignStartEndPointGrid = (grid, width, height, x) => {
  gridAssignValToRandomCellInCol(grid, width, height, CELL_STATE_START_POINT, 0);
  gridAssignValToRandomCellInCol(grid, width, height, CELL_STATE_END_POINT, x);
}

const initGridXY = 10;
const grid = makeGrid(initGridXY, initGridXY);
assignStartEndPointGrid(grid, initGridXY, initGridXY, initGridXY-1)
const initState = {
  width: initGridXY,
  height: initGridXY,
  grid,
};

export const gridSetup = () => ({ type: GRID_SETUP, payload: { } });
export const gridCellToggle = (x, y) => ({ type: GRID_CELL_TOGGLE, payload: { x, y } });
export const gridConfigWidthChange = (width) => ({ type: GRID_CONFIG_WIDTH_CHANGE, payload: { width } });
export const gridConfigHeightChange = (height) => ({ type: GRID_CONFIG_HEIGHT_CHANGE, payload: { height } });

export const gridReducer = (state = initState, action) => {
  const x = get(action, 'payload.x');
  const y = get(action, 'payload.y');
  const width = get(action, 'payload.width');
  const height = get(action, 'payload.height');
  switch (action.type) {
    case GRID_SETUP:
      const grid = makeGrid(state.width, state.height);
      assignStartEndPointGrid(grid, state.width, state.height, state.width-1);
      return { ...state, grid }

    case GRID_CELL_TOGGLE:
      const newGrid = cloneDeep(state.grid);
      let val = newGrid[y][x];
      if (val === CELL_STATE_FILLED) {
        val = CELL_STATE_CLEAR;
      } else if (val === CELL_STATE_CLEAR) {
        val = CELL_STATE_FILLED;
      }
      newGrid[y][x] = val;
      return { ...state, grid: newGrid };

    case GRID_CONFIG_WIDTH_CHANGE:
      return { ...state, width: parseInt(width), };

    case GRID_CONFIG_HEIGHT_CHANGE:
      return { ...state, height: parseInt(height), };

    default:
      return state;
  }
}
export default gridReducer;
