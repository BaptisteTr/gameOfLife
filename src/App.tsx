import React from 'react';
import './App.css';
import {GameOfLifeGrid} from "./components/GameOfLifeGrid";

function App() {
  return (
    <div className="App">
        <div id="grid">
            <GameOfLifeGrid />
        </div>
    </div>
  );
}

export default App;
