import React, {useState} from 'react';
import './App.css';
import {GameOfLifeGrid} from "./components/GameOfLifeGrid";
import {Menu} from "./components/menu/Menu";
import {runningContext} from "./hooks/runningContext";
import {speedContext} from "./hooks/speedContext";
import {colorContext} from "./hooks/colorContext";
import {currentPatternContext} from "./hooks/currentPatternContext";
import {hoverGridContext} from "./hooks/hoverGrid";
import {Pattern} from "./utils/Pattern";

function App() {

    let [isRunning, setRunning] = useState<boolean>(false);
    let [speed, setSpeed] = useState<number>(50);
    let [color, setColor] = useState<string>("#01A2E8");
    let [pattern, setPattern] = useState<Pattern>(new Pattern([],"","",0,0,"", false));
    let [hoverGrid, setHoverGrid] = useState<[boolean[]]>([[]]);

    const toggleRunning = () => {setRunning(isRunning => !isRunning)}

    document.documentElement.style.setProperty('--color', color);
    document.documentElement.style.setProperty('--color-with-transparency', color+"4D");

  return (
    <div className="App">
        <speedContext.Provider value={speed}>
            <runningContext.Provider value={isRunning}>
                <colorContext.Provider value={color}>
                    <currentPatternContext.Provider value={pattern}>
                        <hoverGridContext.Provider value={hoverGrid}>
                            <div id="grid">
                                <GameOfLifeGrid/>
                            </div>
                            <div id="menu">
                                <Menu toggleRunning={toggleRunning} setSpeed={setSpeed} setColor={setColor} setPattern={setPattern} ></Menu>
                            </div>
                        </hoverGridContext.Provider>
                    </currentPatternContext.Provider>
                </colorContext.Provider>
            </runningContext.Provider>
        </speedContext.Provider>
    </div>
  );
}

export default App;
