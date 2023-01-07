import React, {FunctionComponent, useContext, useRef} from 'react';
import spaceships from "../../assets/spaceships";
import style from './Menu.module.css';
import {runningContext} from "../../hooks/runningContext";
import {speedContext} from "../../hooks/speedContext";
import {colorContext} from "../../hooks/colorContext";
import {Pattern} from "../../utils/Pattern";
import {Item} from "./item/Item";

type MenuProps = {
    toggleRunning : () => void,
    clearGrid : () => void,
    fillRandom : () => void,
    setSpeed : (speed : number) => void,
    setColor : (color : string) => void,
    setPattern : (pattern : Pattern) => void
}

export const Menu: FunctionComponent<MenuProps> = ({toggleRunning,setSpeed, setColor,setPattern,clearGrid, fillRandom}) => {

    const isRunning = useContext(runningContext);
    const speed = useContext(speedContext);
    const color = useContext(colorContext);
    const tabGame = useRef<HTMLDivElement | null>(null);
    const tabItem = useRef<HTMLDivElement | null>(null);
    let spaceshipsRle : string[] = spaceships.split("\n\n");

    function PlayButton(isRunning : boolean, toggleRunning : () => void) {
        if(isRunning) {
            return (<button className={style.itemContent} onClick={toggleRunning}>Pause</button>);
        } else {
            return (<button className={style.itemContent} onClick={toggleRunning}>Play</button>);
        }
    }

    function ClearButton(clear : () => void) {
        return <button className={style.itemContent} onClick={clear}>Clear</button>
    }

    function FillRandomly(fillRandomly : () => void) {
        return <button className={style.itemContent} onClick={fillRandomly}>Random</button>
    }

    function Range(speed: number, setSpeed : (speed : number) => void) {

        return (
            <div className={style.itemContent}>
                <label htmlFor="speed">Game speed</label>
                <input type="range" id="speed" name="speed"
                       min="1" max="100" defaultValue={speed} onChange={(event) => setSpeed(parseInt(event.target.value))}/>
            </div>
        );
    }

    function ColorPicker(color: string, setColor : (color : string) => void) {
        return (
            <input type="color" value={color} onChange={(event) => setColor(event.target.value)}></input>
        )
    }

    const openTab = (event: React.MouseEvent<HTMLElement>, tab: React.MutableRefObject<HTMLDivElement | null>) => {
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName(style.tabContent);
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].id = "";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName(style.buttonTab);
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].id = "";
        }

        if(tab.current != null) {
            tab.current.id = style["activeTab"];
        }

        event.currentTarget.id = style["activeTabLink"];
    }


    return <>
        <div className={style.tabs}>
            <button className={style.buttonTab} onClick={(event) => {openTab(event,tabGame)}}>Game</button>
            <button className={style.buttonTab} onClick={(event) => {openTab(event,tabItem)}}>Spaceships</button>
        </div>
        <div id={style["activeTab"]}  className={style.tabContent} ref={tabGame}>
            <div className={style.item}>
                { PlayButton(isRunning,toggleRunning) }
            </div>
            <div className={style.item}>
                { ClearButton(clearGrid) }
            </div>
            <div className={style.item}>
                { FillRandomly(fillRandom) }
            </div>
            <div className={style.item}>
                { Range(speed,setSpeed) }
            </div>
            <div className={style.item}>
                { ColorPicker(color, setColor) }
            </div>
        </div>

        <div className={style.tabContent} ref={tabItem}>
            {spaceshipsRle.map( spaceship => {
                return <Item rle={spaceship} setPattern={setPattern} />
            })}
        </div>

    </>;
}

