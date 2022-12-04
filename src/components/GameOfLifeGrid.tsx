import React, { FunctionComponent } from 'react';
import style from './GameOfLifeGrid.module.css';
import {Cell} from "./cell/Cell";
import useWindowDimensions from "../hooks/useWindowDimensions";

type GameOfLifeGridProps = {
}

export const GameOfLifeGrid: FunctionComponent<GameOfLifeGridProps> = () => {

    const { height, width } = useWindowDimensions();
    const linesNumber = Math.round((height * 0.8)/10);
    const columnsNumber = Math.round((width * 0.8)/10);

    let grid : [boolean[]] = [[]];

    grid.pop()
    for(let i = 0; i < linesNumber; i++) {
        let cellLine : boolean[] = [];
        for(let j = 0; j < columnsNumber; j++) {
            cellLine.push(Math.random() < 0.5);
        }
        grid.push(cellLine);
    }

    document.documentElement.style.setProperty('--lines-number', linesNumber.toString());
    document.documentElement.style.setProperty('--columns-number', columnsNumber.toString());
    document.documentElement.style.setProperty('--grid-height', Math.round((height * 0.8)+linesNumber)+'px');
    document.documentElement.style.setProperty('--grid-width', Math.round((width * 0.8)+columnsNumber)+'px');

    return <div id={style["grid"]}> {
            grid.map((cellLine : boolean[]) => {
                return cellLine.map((cell : boolean) => {
                    return <Cell isAlive={cell}></Cell>;
                })
            })
        }
    </div>;
}