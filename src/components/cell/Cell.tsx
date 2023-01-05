import React, {FunctionComponent, useContext} from 'react';
import style from './Cell.module.css';
import {currentPatternContext} from "../../hooks/currentPatternContext";

type CellProps = {
    isAlive : boolean
    isHovered : boolean
    color? : string
    rowIndex : number
    columnIndex : number
    toggleValue : (rowIndex : number, columnIndex : number) => void
    handleCellHover : (rowIndex : number, columnIndex : number) => void
    printPattern : (rowIndex : number, columnIndex : number) => void
}

export const Cell: FunctionComponent<CellProps> = ({isAlive, toggleValue, rowIndex, columnIndex, isHovered, handleCellHover, printPattern}) => {

    const currentPattern = useContext(currentPatternContext);

    return <div onMouseOver={() => handleCellHover(rowIndex, columnIndex)} onClick={() => { if(currentPattern.display){ printPattern(rowIndex, columnIndex) } else { toggleValue(rowIndex, columnIndex)}}} className={style.cell +" "+ (isAlive ? style.colored : "")+" "+ (isHovered ? style.hovered : "")}>
</div>;
}