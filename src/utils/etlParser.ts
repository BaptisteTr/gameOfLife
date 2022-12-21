import {Pattern} from "./Pattern";

export const parseEtl = (eltString : string) : Pattern => {
    let name = "",comment = "";
    let x = 0,y = 0;
    let grid : [boolean[]] = [[]];
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

                while((result = regexp.exec(lineEncoded)) !== null) {

                    console.log(result);
                }

            })

        }
    });

    console.log(new Pattern(grid, name, comment, x, y ,""));

    return new Pattern(grid, name, comment, x, y ,"");
}
