import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import style from './GameOfLifeGrid.module.css';
import {Cell} from "./cell/Cell";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {runningContext} from "../hooks/runningContext";
import {speedContext} from "../hooks/speedContext";
import {currentPatternContext} from "../hooks/currentPatternContext";
import {Pattern} from "../utils/Pattern";

type GameOfLifeGridProps = {
    setPattern : (pattern : Pattern) => void
}

export const GameOfLifeGrid: FunctionComponent<GameOfLifeGridProps> = ({setPattern}) => {

    //TODO Passer ici un currentHover column et currentHover row que pourra setter la cellule actuellement survolée
    // S'en servir pour construire un masque du modèle à afficher et passer la grille de surbrillance aux cellules
    // Probablement dans un useEffect en dépendance sur le state du row/column

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

    function displayHoverCurrentPattern(currentHoverRow : number, currentHoverColumn : number, currentPattern : Pattern, linesNumber : number, columnsNumber : number)  : [boolean[]] {
        let resGrid : [boolean[]] = [[]];
        resGrid.pop();

        if(currentPattern.display) {

            let midSectionY = Math.round(currentPattern.y/2);
            let midSectionX = Math.round(currentPattern.x/2);
            let firstPrintCellY = (currentHoverRow - midSectionY);
            let lastPrintCellY = (currentHoverRow + midSectionY);
            let firstPrintCellX = (currentHoverColumn - midSectionX);
            let lastPrintCellX = (currentHoverColumn + midSectionX);

            for(let i = 0; i < linesNumber; i++) {
                let cellLine : boolean[] = [];
                for(let j = 0; j < columnsNumber; j++) {
                    if(i >= firstPrintCellY && i <= lastPrintCellY && j >= firstPrintCellX && j <= lastPrintCellX) {
                        if((i - firstPrintCellY) >= 0 && (j - firstPrintCellX) >= 0 && (i - firstPrintCellY) < currentPattern.y && (j - firstPrintCellX) < currentPattern.x) {
                            cellLine.push(currentPattern.grid[i - firstPrintCellY][j - firstPrintCellX]);
                        } else {
                            cellLine.push(false);
                        }
                    } else {
                        cellLine.push(false);
                    }
                }
                resGrid.push(cellLine);
            }
        } else {

        }

        return resGrid;
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

    function handleChildClick(rowIndex : number, columnIndex : number) {
        const newGrid = copyGrid(grid)
        newGrid[rowIndex][columnIndex] = !newGrid[rowIndex][columnIndex];
        setGrid(newGrid)
    }

    function printPattern(rowIndex : number, columnIndex : number) {
        const newGrid = copyGrid(grid)

        let midSectionY = Math.round(currentPattern.y/2);
        let midSectionX = Math.round(currentPattern.x/2);
        let firstPrintCellY = (rowIndex - midSectionY);
        let lastPrintCellY = (rowIndex + midSectionY);
        let firstPrintCellX = (columnIndex - midSectionX);
        let lastPrintCellX = (columnIndex + midSectionX);

        for(let i = 0; i < linesNumber; i++) {
            for(let j = 0; j < columnsNumber; j++) {
                if(i >= firstPrintCellY && i <= lastPrintCellY && j >= firstPrintCellX && j <= lastPrintCellX) {
                    if((i - firstPrintCellY) >= 0 && (j - firstPrintCellX) >= 0 && (i - firstPrintCellY) < currentPattern.y && (j - firstPrintCellX) < currentPattern.x) {
                        newGrid[i][j] = currentPattern.grid[i - firstPrintCellY][j - firstPrintCellX];
                    }
                }
            }
        }

        setGrid(newGrid)
    }

    function handleCellHover(rowIndex : number, columnIndex : number) {
        setCurrenHoverColumn(columnIndex);
        setCurrenHoverRow(rowIndex);
        setHoverGrid(displayHoverCurrentPattern(rowIndex, columnIndex, currentPattern, linesNumber, columnsNumber));
    }

    const { height, width } = useWindowDimensions();
    const linesNumber = Math.round((height * 0.5)/10);
    const columnsNumber = Math.round((width * 0.5)/10);

    let firstGrid : [boolean[]] = [[]]
    firstGrid.pop()
    for(let i = 0; i < linesNumber; i++) {
        let cellLine : boolean[] = [];
        for(let j = 0; j < columnsNumber; j++) {
            //cellLine.push(Math.random() > 0.7);
            cellLine.push(false);
        }
        firstGrid.push(cellLine);
    }

    useEffect(() => {
        if(isRunning) {
            const interval = setInterval(() => {setGrid(calculateNextIteration(grid))}, 150 * (50/speed));
            return () => clearInterval(interval);
        }
    }, )

    let [grid, setGrid] = useState<[boolean[]]>(firstGrid);
    let [hoverGrid, setHoverGrid] = useState<[boolean[]]>(firstGrid);
    let [, setCurrenHoverRow] = useState<number>(-1);
    let [, setCurrenHoverColumn] = useState<number>(-1);
    const isRunning = useContext(runningContext);
    const speed = useContext(speedContext);
    const currentPattern = useContext(currentPatternContext);

    document.documentElement.style.setProperty('--lines-number', linesNumber.toString());
    document.documentElement.style.setProperty('--columns-number', columnsNumber.toString());
    document.documentElement.style.setProperty('--grid-height', Math.round((height * 0.8)+linesNumber)+'px');
    document.documentElement.style.setProperty('--grid-width', Math.round((width * 0.8)+columnsNumber)+'px');

    let cells = grid.map((cellLine : boolean[], rowIndex) => {
        return cellLine.map((cell : boolean, columnIndex) => {
            let isHovered = (hoverGrid[rowIndex] && hoverGrid[rowIndex][columnIndex]) ? hoverGrid[rowIndex][columnIndex] : false;
            return <Cell  key={rowIndex+"-"+columnIndex} isAlive={cell} columnIndex={columnIndex} rowIndex={rowIndex} toggleValue={handleChildClick} handleCellHover={handleCellHover} isHovered={isHovered} printPattern={printPattern}></Cell>;
        })
    });

    return <>
        <div id={style["grid"]}  onMouseLeave={() => setHoverGrid([[]]) } > {cells}
        </div>
    </>;
}