import React, { FunctionComponent } from 'react';
import style from './Cell.module.css';

type CellProps = {
    isAlive : boolean
    color? : string
    rowIndex : number
    columnIndex : number
    toggleValue : (rowIndex : number, columnIndex : number) => void
}

export const Cell: FunctionComponent<CellProps> = ({isAlive, color = "lightBlue", toggleValue, rowIndex, columnIndex}) => {


return <div onClick={() => toggleValue(rowIndex, columnIndex)} className={style.cell +" "+ (isAlive ? style[color] : "")}>
</div>;
}