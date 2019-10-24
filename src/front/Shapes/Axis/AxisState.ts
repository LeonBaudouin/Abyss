import Color from "../../Influencets/CustomTypes/Color";
import { StateObjectInterface } from "../../Influencets/Abstract/StateObjectInterface";
import { Point } from "../../Influencets/CustomTypes/Point";
import { PositionState, TwoDimensionSizeState } from "../../Influencets/Abstract/BaseStates";
import { Size } from "../../Influencets/CustomTypes/Size";

export default class AxisState implements StateObjectInterface, AxisStateParams {

    public color: Color;
    public size: Size;
    public position: Point;

    constructor({color, size, position}: AxisStateParams) {
        this.color = color;
        this.size = {...size};
        this.position = {...position};
    }

    Clone(): AxisState {
        return new AxisState(this);
    }


}

export interface AxisStateParams extends TwoDimensionSizeState, PositionState {
    color: Color
}
