import RectangleState from "./RectangleState";
import { RendererInterface } from "../../Influencets/Abstract/RendererInterface";

export default class RectangleRenderer implements RendererInterface {

    Render(state: RectangleState, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = state.color.toString();
        ctx.fillRect(
            state.position.x - state.size.width / 2,
            state.position.y - state.size.height / 2,
            state.size.width,
            state.size.height
        );
    }

}
