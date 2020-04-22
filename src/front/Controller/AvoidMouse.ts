import { ControllerInterface } from "../Influencets/Abstract/ControllerInterface";
import { StateObjectInterface } from "../Influencets/Abstract/StateObjectInterface";
import { PositionState } from "../Influencets/Abstract/BaseStates";
import { MouseMoveListener } from "../Influencets/Events/EventListeners/MouseMoveListener";
import { ListenEvent } from "../Influencets/Events/EventListeners/SimpleEventListener";
import { Canvas } from "../Influencets/Canvas";
import { transformRange } from "../Influencets/CustomTypes/Interval";
import { Point } from "../Influencets/CustomTypes/Point";

type PositionStateType= StateObjectInterface & PositionState;

export default class AvoidMouse implements ControllerInterface {

    private mouseMoveListener: ListenEvent;

    constructor() {
        this.mouseMoveListener = MouseMoveListener.getInstance();
    }

    Update(currentState: PositionStateType, defaultState: PositionStateType): PositionStateType {
        const newState = <PositionStateType>currentState.Clone();
        const mousePosition = this.mouseMoveListener.getValue();
        const canvasBoundRect = Canvas.getHTMLElement().getBoundingClientRect();
        const newMousePosition = {x: mousePosition.x - canvasBoundRect.left, y: mousePosition.y - canvasBoundRect.top};
        const distance = Point.getDistance(defaultState.position, newMousePosition);
        const factor = distance > 40 ? 1 : distance / 40
        const angle = Point.getAngle(defaultState.position, newMousePosition);
        newState.position = {x: defaultState.position.x - Math.cos(angle) * factor * 5, y: defaultState.position.y - Math.sin(angle) * factor * 5}
        return newState;
    }
    
}