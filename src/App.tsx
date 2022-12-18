import React, {useState} from 'react';
import './App.css';
import {GameOfLifeGrid} from "./components/GameOfLifeGrid";
import {Menu} from "./components/menu/Menu";
import {runningContext} from "./hooks/runningContext";
import {speedContext} from "./hooks/speedContext";
import {colorContext} from "./hooks/colorContext";

function App() {

    let [isRunning, setRunning] = useState<boolean>(false);
    let [speed, setSpeed] = useState<number>(50);
    let [color, setColor] = useState<string>("#01A2E8");

    const toggleRunning = () => {setRunning(isRunning => !isRunning)}

    document.documentElement.style.setProperty('--color', color);
    document.documentElement.style.setProperty('--color-with-transparency', color+"4D");

  return (
    <div className="App">
        <speedContext.Provider value={speed}>
            <runningContext.Provider value={isRunning}>
                <colorContext.Provider value={color}>
                        <div id="grid">
                            <GameOfLifeGrid />
                        </div>
                        <div id="menu">
                            <Menu toggleRunning={toggleRunning} setSpeed={setSpeed} setColor={setColor}></Menu>
                        </div>
                </colorContext.Provider>
            </runningContext.Provider>
        </speedContext.Provider>
    </div>
  );
}

export default App;
