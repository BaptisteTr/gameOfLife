import React, {FunctionComponent, useEffect, useState} from 'react';
import style from './GameOfLifeGrid.module.css';
import {Cell} from "./cell/Cell";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {Menu} from "./menu/Menu";

type GameOfLifeGridProps = {
}

export const GameOfLifeGrid: FunctionComponent<GameOfLifeGridProps> = () => {

    function calculateNextIteration(grid : [boolean[]]) : [boolean[]] {
        let nextGrid : [boolean[]] = [[]];

        nextGrid.pop();
        grid.forEach( (cellLine, rowIndex) => {

            let newRow : boolean[] = []
            cellLine.forEach( (cell, columnIndex) => {
                newRow.push(isAliveNextIteration(grid, rowIndex, columnIndex))
            })
            nextGrid.push(newRow)
        })

        return nextGrid;
    }

    function copyGrid (grid : [boolean[]]) : [boolean[]] {
        let nextGrid : [boolean[]] = [[]];

        nextGrid.pop();
        grid.forEach( (cellLine, rowIndex) => {
            let newRow : boolean[] = []
                newRow.push(...grid[rowIndex])
            nextGrid.push(newRow)
        })

        return nextGrid;
    }

    function isAliveNextIteration(grid : [boolean[]], rowNumber : number, columnNumber : number) {
        let res : boolean = false;

        let adjacentCellsAlive = 0;


        const isAlive = grid[rowNumber][columnNumber];

        for(let j = Math.max(0,rowNumber-1); j <= Math.min(rowNumber+1, grid.length-1); j++) {
            for(let i = Math.max(0,columnNumber-1); i <= Math.min(columnNumber+1, grid[0].length-1 ); i++){
                if(!(i === columnNumber && j === rowNumber) && grid[j][i]){
                    adjacentCellsAlive++;
                }
            }
        }

        if(isAlive && adjacentCellsAlive >= 2 && adjacentCellsAlive <= 3) {
            res = true;
        } else if(!isAlive && adjacentCellsAlive === 3) {
            res = true
        }

        return res;
    }

    const { height, width } = useWindowDimensions();
    const linesNumber = Math.round((height * 0.5)/10);
    const columnsNumber = Math.round((width * 0.5)/10);



    let firstGrid : [boolean[]] = [[]]
    firstGrid.pop()
    for(let i = 0; i < linesNumber; i++) {
        let cellLine : boolean[] = [];
        for(let j = 0; j < columnsNumber; j++) {
            cellLine.push(Math.random() > 0.7);
        }
        firstGrid.push(cellLine);
    }

    let [grid, setGrid] = useState<[boolean[]]>(firstGrid);
    let [isRunning, setRunning] = useState<boolean>(false);
    let [speed, setSpeed] = useState<number>(50);

    function handleChildClick(rowIndex : number, columnIndex : number) {
        const newGrid = copyGrid(grid)
        newGrid[rowIndex][columnIndex] = !newGrid[rowIndex][columnIndex];
        setGrid(newGrid)
    }

    document.documentElement.style.setProperty('--lines-number', linesNumber.toString());
    document.documentElement.style.setProperty('--columns-number', columnsNumber.toString());
    document.documentElement.style.setProperty('--grid-height', Math.round((height * 0.8)+linesNumber)+'px');
    document.documentElement.style.setProperty('--grid-width', Math.round((width * 0.8)+columnsNumber)+'px');

    useEffect(() => {
        if(isRunning) {
            const interval = setInterval(() => {setGrid(calculateNextIteration(grid))}, 150 * (50/speed));
            return () => clearInterval(interval);
        }
    }, )



    let cells = grid.map((cellLine : boolean[], rowIndex) => {
        return cellLine.map((cell : boolean, columnIndex) => {
            return <Cell  key={rowIndex+"-"+columnIndex} isAlive={cell} columnIndex={columnIndex} rowIndex={rowIndex} toggleValue={handleChildClick}></Cell>;
        })
    });


    return <>
        <div id={style["grid"]}> {cells}
        </div>
        <div id={style["menu"]}>
            <Menu isRunning={isRunning} setRunning={setRunning} speed={speed} setSpeed={setSpeed}></Menu>
        </div>
    </>;
}