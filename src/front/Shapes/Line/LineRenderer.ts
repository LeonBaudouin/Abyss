import { RendererInterface } from "../../Influencets/Abstract/RendererInterface";
import LineState from "./LineState";

export default class LineRenderer implements RendererInterface {

    Render({lineWidth, from, to, color}: LineState, ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color.toString();
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }
    
}