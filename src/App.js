import React, { Component } from 'react';
import './App.css';

import SelectionArea from './Containers/SelectionArea';
import Clocks from './Containers/ClockList/ClockListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SelectionArea />
        <Clocks />
      </div>
    );
  }
}

export default App;
