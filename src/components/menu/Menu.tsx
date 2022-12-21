import React, {FunctionComponent, useContext, useRef} from 'react';
import Glider from '../../assets/glider.png';
import style from './Menu.module.css';
import {runningContext} from "../../hooks/runningContext";
import {speedContext} from "../../hooks/speedContext";
import {colorContext} from "../../hooks/colorContext";
import {parseEtl} from "../../utils/etlParser";
import {Pattern} from "../../utils/Pattern";

type MenuProps = {
    toggleRunning : () => void,
    setSpeed : (speed : number) => void,
    setColor : (color : string) => void,
}

export const Menu: FunctionComponent<MenuProps> = ({toggleRunning,setSpeed, setColor}) => {

    const isRunning = useContext(runningContext);
    const speed = useContext(speedContext);
    const color = useContext(colorContext);
    const tabGame = useRef<HTMLDivElement | null>(null);
    const tabItem = useRef<HTMLDivElement | null>(null);

    const testEtl = "#N Gosper glider gun\n" +
        "#O Bill Gosper\n" +
        "#C A true period 30 glider gun.\n" +
        "#C The first known gun and the first known finite pattern with unbounded growth.\n" +
        "#C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun\n" +
        "x = 36, y = 9, rule = B3/S23\n" +
        "24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8b\n" +
        "o3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!"

    const pattern : Pattern = parseEtl(testEtl);

    function PlayButton(isRunning : boolean, toggleRunning : () => void) {
        if(isRunning) {
            return (<button className={style.itemContent} onClick={toggleRunning}>Pause</button>);
        } else {
            return (<button className={style.itemContent} onClick={toggleRunning}>Play</button>);
        }
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
            <button className={style.buttonTab} onClick={(event) => {openTab(event,tabItem)}}>Items</button>
        </div>
        <div id={style["activeTab"]}  className={style.tabContent} ref={tabGame}>
            <div className={style.item}>
                { PlayButton(isRunning,toggleRunning) }
            </div>
            <div className={style.item}>
                { Range(speed,setSpeed) }
            </div>
            <div className={style.item}>
                { ColorPicker(color, setColor) }
            </div>
        </div>

        <div className={style.tabContent} ref={tabItem}>
            <div className={style.item}>
                <img src={Glider}  alt="glider"/>
            </div>
        </div>

    </>;
}

