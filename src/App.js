import React, { Component } from 'react';
import GridsterLogo from './assets/Gridster-Logo.png';
import './App.css';
import { connect } from 'react-redux';
import { GridsterGrid } from "./components/GridsterGrid";
import { GridsterConfig } from "./components/GridsterConfig";


class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="App-header">
            <img src={GridsterLogo} alt="logo"/>
          </div>
          <GridsterConfig/>
          <GridsterGrid/>
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
