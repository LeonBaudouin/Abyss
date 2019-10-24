import { StateObjectInterface } from "../../Influencets/Abstract/StateObjectInterface";
import { Point } from "../../Influencets/CustomTypes/Point";
import Color from "../../Influencets/CustomTypes/Color";

export default class LineState implements StateObjectInterface {
    from: Point
    to: Point
    color: Color
    lineWidth: number

    constructor({from, to, color: {r, g, b}, lineWidth}: {from: Point, to: Point, color: Color, lineWidth: number}) {
        this.color = new Color(r, g, b);
        this.lineWidth = lineWidth;
        this.from = {...from};
        this.to = {...to};
    }

    Clone(): LineState {
        return new LineState(this);
    }
}