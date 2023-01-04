import {Pattern} from "./Pattern";

export const parseRLE = (eltString : string) : Pattern => {
    let name = "",comment = "";
    let x = 0,y = 0;
    let grid : [boolean[]] = [[]];
    grid.pop();
    eltString.split("\n").forEach((value) => {
        if (value.startsWith("#N")) {
            name = value.substring(3);
        } else if(value.startsWith("#C")) {
            if(comment.length !== 0) {
                comment+="\n "+value.substring(3);
            } else {
                comment = value.substring(3);
            }
        } else if(value.startsWith("x")) {
            value.split(", ").forEach((val) => {
                let numberValue : RegExpMatchArray | null = val.match(/\d+/);
                if(val.startsWith("x") && numberValue != null) {
                    x = parseInt(numberValue[0]);
                } else if(val.startsWith("y") && numberValue != null) {
                    y = parseInt(numberValue[0]);
                }
            })
        } else if (value.endsWith("!")) {

            value.split("$").forEach((lineEncoded, index) => {
                let lineValue : boolean[] = [];
                const regexp = /[0-9]*[bo]/g;
                let result;
                let column = 0;

                while((result = regexp.exec(lineEncoded)) !== null) {

                    let isAlive = result[0].at(result[0].length-1) === 'o';

                    let thenum = result[0].match(/\d+/);
                    if(thenum) {
                        const numb : number = parseInt(thenum![0]);
                        for(let i = 0; i < numb; i++) {
                            lineValue.push(isAlive);
                            column++;
                        }
                    } else {
                        lineValue.push(isAlive);
                        column++;
                    }
                }

                while(column < x) {
                    lineValue.push(false);
                    column++;
                }

                grid.push(lineValue);
            })
        }
    });

    return new Pattern(grid, name, comment, x, y ,"", true);
}
