import Color from "../../Influencets/CustomTypes/Color";
import { StateObjectInterface } from "../../Influencets/Abstract/StateObjectInterface";
import { Point } from "../../Influencets/CustomTypes/Point";
import { PositionState, OneDimensionSizeState } from "../../Influencets/Abstract/BaseStates";
import { Size } from "../../Influencets/CustomTypes/Size";

export default class LabelState implements StateObjectInterface, LabelStateParams {

    public color: Color;
    public size: number;
    public position: Point;
    public text: string;

    constructor({color, size, position, text}: LabelStateParams) {
        this.color = color;
        this.size = size;
        this.position = {...position};
        this.text = text;
    }

    Clone(): LabelState {
        return new LabelState(this);
    }
}

export interface LabelStateParams extends OneDimensionSizeState, PositionState {
    color: Color
    text: string
}
