import React, { FunctionComponent } from 'react';
import style from './Item.module.css';
import {parseRLE} from "../../../utils/rleParser";
import {Pattern} from "../../../utils/Pattern";

type Props = {
    rle : string
    setPattern : (pattern : Pattern) => void
}

export const Item : FunctionComponent<Props> = ({rle,setPattern}) => {

    const pattern : Pattern = parseRLE(rle);


return <div className={style.item} onClick={() => setPattern(pattern)}>
        {pattern.name}
        <img src={pattern.image} alt={pattern.name} className={style.itemImage} />
    </div>;
}
