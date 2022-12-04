import React, { FunctionComponent } from 'react';
import style from './Cell.module.css';

type CellProps = {
    isAlive : boolean
    color? : string
}

export const Cell: FunctionComponent<CellProps> = ({isAlive, color = "lightBlue"}) => {


return <div className={style.cell +" "+ (isAlive ? style[color] : "")}>
</div>;
}