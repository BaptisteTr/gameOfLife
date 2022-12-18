import React, {FunctionComponent, useContext, useRef} from 'react';
import style from './Menu.module.css';
import {runningContext} from "../../hooks/runningContext";
import {speedContext} from "../../hooks/speedContext";
import {colorContext} from "../../hooks/colorContext";

type MenuProps = {
    toggleRunning : () => void,
    setSpeed : (speed : number) => void,
    setColor : (color : string) => void,
}

export const Menu: FunctionComponent<MenuProps> = ({toggleRunning,setSpeed, setColor}) => {

    const isRunning = useContext(runningContext);
    const speed = useContext(speedContext);
    const color = useContext(colorContext);
    const tabGame = useRef(null);

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

    /*const openTab = (event : React.MouseEvent<HTMLElement> , tab : React.MutableRefObject<null> ) => {
        // Declare all variables
        /*var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }*/

        /*let targetTab : MutableRefObject<HTMLDivElement> = tab.current;

        targetTab.style.display = "block";*/

        /*event.currentTarget.className += " active";
    }*/


    return <>
        <div className={style.tabs}>
            <button className={style.tab} onClick={() => {}}>Game</button>
            <button className={style.tab} onClick={() => {}}>Items</button>
        </div>
        <div id={style["gameTab"]} className={style.tabContent} ref={tabGame}>
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

    </>;
}

