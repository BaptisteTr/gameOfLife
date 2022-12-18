import React, { FunctionComponent, useContext} from 'react';
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



    return <>
        <div className={style.item}>
            { PlayButton(isRunning,toggleRunning) }
        </div>
        <div className={style.item}>
            { Range(speed,setSpeed) }
        </div>
        <div className={style.item}>
            { ColorPicker(color, setColor) }
        </div>
    </>;
}

