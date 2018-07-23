import React, { Component } from 'react';
import GridsterLogo from './assets/Gridster-Logo.png';
import './App.css';
import { css } from 'emotion'
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import { gridSetup, gridConfigHeightChange, gridConfigWidthChange } from "./reducers/grid";
import { GridsterGrid } from "./components/GridsterGrid";
import { GridsterConfig } from "./components/GridsterConfig";


class App extends Component {
  render() {
    const { width, height, dispatch: d } = this.props;
    return (
        <div className="App">
          <div className="App-header">
            <img src={GridsterLogo} alt="logo"/>
          </div>
          <GridsterConfig />
          <GridsterGrid />
        </div>
    );
  }
}

export default connect(
    (state) => {
      const { grid: { width, height, grid } } = state;
      return { width, height, grid };
    },
    null
)(App);
