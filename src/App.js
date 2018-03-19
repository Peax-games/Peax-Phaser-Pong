import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pong from './Pong/Pong';
import game from './Game'

class App extends Component {
  render() {
    // game();
    Pong();
    return (
      <div id="myCanvas">

      </div>
    );
  }
}

export default App;
