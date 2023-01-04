import React, {FunctionComponent} from 'react';
import style from './Cell.module.css';

type CellProps = {
    isAlive : boolean
    isHovered : boolean
    color? : string
    rowIndex : number
    columnIndex : number
    toggleValue : (rowIndex : number, columnIndex : number) => void
    handleCellHover : (rowIndex : number, columnIndex : number) => void
}

export const Cell: FunctionComponent<CellProps> = ({isAlive, toggleValue, rowIndex, columnIndex, isHovered, handleCellHover}) => {

    return <div onMouseOver={() => handleCellHover(rowIndex, columnIndex)} onClick={() => toggleValue(rowIndex, columnIndex)} className={style.cell +" "+ (isAlive ? style.colored : "")+" "+ (isHovered ? style.hovered : "")}>
</div>;
}