import CircleState from "./CircleState";
import { RendererInterface } from "../../Influencets/Abstract/RendererInterface";

export default class CircleRenderer implements RendererInterface {

    Render({color, position, size}: CircleState, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = color.toString();
        ctx.beginPath();
        ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

}
