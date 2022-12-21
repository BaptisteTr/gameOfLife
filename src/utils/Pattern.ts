export class Pattern {
    private grid: boolean[][];
    public name: string;
    public comment: string;
    public x: number;
    public y: number;
    public rule: string;

    constructor(grid : boolean[][], name: string, comment:string, x:number, y:number, rule:string) {
        this.grid = grid;
        this.name = name;
        this.comment = comment;
        this.x = x;
        this.y = y;
        this.rule = rule;
    }


}