import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import style from './Menu.module.css';

type MenuProps = {
    isRunning : boolean,
    setRunning : Dispatch<SetStateAction<boolean>>,
    speed : number,
    setSpeed : Dispatch<SetStateAction<number>>,
}

export const Menu: FunctionComponent<MenuProps> = ({isRunning,setRunning,speed,setSpeed}) => {

    function PlayButton(isRunning : boolean, setRunning : Dispatch<SetStateAction<boolean>>) {
        if(isRunning) {
            return (<button className={style.itemContent} onClick={() => setRunning(false)}>Pause</button>);
        } else {
            return (<button className={style.itemContent} onClick={() => setRunning(true)}>Play</button>);
        }
    }

    function Range(speed: number, setSpeed : Dispatch<SetStateAction<number>>) {

        return (
            <div className={style.itemContent}>
                <label htmlFor="speed">Game speed</label>
                <input type="range" id="speed" name="speed"
                       min="1" max="100" defaultValue={speed} onChange={(event) => setSpeed(parseInt(event.target.value))}/>
            </div>
        );
    }

    return <>
        <div className={style.item}>
            { PlayButton(isRunning,setRunning) }
        </div>
        <div className={style.item}>
            { Range(speed,setSpeed) }
        </div>
    </>;
}

