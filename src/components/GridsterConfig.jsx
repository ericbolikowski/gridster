import React from 'react';
import { css } from 'emotion'
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import { gridSetup, gridConfigHeightChange, gridConfigWidthChange } from "../reducers/grid";

const label = css`
  font-size: 10pt;
  font-weight: normal;
  color: grey;
`
const panelCell = css`
  float: left;
  margin: 0 8px;
`
const formControl = css`
  width: 60px;
  text-align: center;
`
const generateBtnDefault = css`
  background-color: rgb(60, 123, 219);
  border: none;
`
const generateBtnHover = css`
  &:hover {
    background-color: rgb(100, 164, 255);
  }
`
const generateBtnDown = css`
  &:active:hover {
    background-color: rgb(28, 68, 132);
  }
`

const _GridsterConfig = ({ width, height, dispatch: d }) => (
    <Panel style={{ backgroundColor: 'rgb(237, 237, 237)', padding: '12px 30px', boxShadow: 'none', overflow: 'auto' }}>
      <Form>
        <div className={`${panelCell}`}>
          <FormGroup>
            <ControlLabel className={label}>Rows</ControlLabel>
            <FormControl
                type="number"
                min="2"
                max="20"
                className={`${formControl}`}
                value={height}
                onChange={({ target: { value } }) => value > 1 && value <= 20 && d(gridConfigHeightChange(value))}
            />
          </FormGroup>
        </div>
        <div className={`${panelCell}`} style={{ paddingTop: '32px' }}>
          x
        </div>
        <div className={`${panelCell}`}>
          <FormGroup>
            <ControlLabel className={label}>Columns</ControlLabel>
            <FormControl
                type="number"
                min="2"
                max="20"
                className={`${formControl}`}
                value={width}
                onChange={({ target: { value } }) => value > 1 && value <= 20 && d(gridConfigWidthChange(value))}
            />
          </FormGroup>
        </div>
        <div className={`${panelCell}`} style={{ paddingTop: '26px', paddingLeft: '5px' }}>
          <Button
              bsStyle="primary"
              onClick={() => d(gridSetup())}
              className={`${generateBtnDefault} ${generateBtnDown} ${generateBtnHover}`}
          >Generate</Button>
        </div>
      </Form>
    </Panel>
);
export const GridsterConfig = connect(
    (state) => {
      const { grid: { width, height, grid } } = state;
      return { width, height, grid };
    },
    null
)(_GridsterConfig);

export default GridsterConfig;
