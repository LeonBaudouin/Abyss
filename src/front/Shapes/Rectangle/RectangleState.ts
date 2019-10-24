import Color from "../../Influencets/CustomTypes/Color";
import { Size } from "../../Influencets/CustomTypes/Size";
import { PositionState, TwoDimensionSizeState } from "../../Influencets/Abstract/BaseStates";
import { StateObjectInterface } from "../../Influencets/Abstract/StateObjectInterface";
import { Point } from "../../Influencets/CustomTypes/Point";

export default class RectangleState implements StateObjectInterface, RectangleStateParams {

    position: Point;
    size: Size;
    color: Color;

    constructor({position, size, color}: RectangleStateParams) {
        this.position = {...position};
        this.size = {...size};
        this.color = color;
    } 

    Clone(): RectangleState {
        return new RectangleState(this);
    }
    
}

interface RectangleStateParams extends PositionState, TwoDimensionSizeState {
    color: Color
}
