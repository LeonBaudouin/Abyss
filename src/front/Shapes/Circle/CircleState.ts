import Color from "../../Influencets/CustomTypes/Color";
import { StateObjectInterface } from "../../Influencets/Abstract/StateObjectInterface";
import { Point } from "../../Influencets/CustomTypes/Point";
import { OneDimensionSizeState, PositionState } from "../../Influencets/Abstract/BaseStates";

export default class CircleState implements StateObjectInterface, CircleStateParams {

    public color: Color;
    public size: number;
    public position: Point;

    constructor({color, size, position}: CircleStateParams) {
        this.color = color;
        this.size = size;
        this.position = {...position};
    }

    Clone(): CircleState {
        return new CircleState(this);
    }


}

export interface CircleStateParams extends OneDimensionSizeState, PositionState {
    color: Color
}
