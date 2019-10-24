import { RendererInterface } from "../../Influencets/Abstract/RendererInterface";
import LabelState from "./LabelState";

export default class LabelRenderer implements RendererInterface {
    
    Render({position, text, size, color}: LabelState, ctx: CanvasRenderingContext2D): void {
        ctx.font = `${size}px poiret one`;
        ctx.fillStyle = color.toString();
        ctx.fillText(text, position.x + 5, position.y + 0);
        ctx.beginPath();
        ctx.moveTo(position.x + 0, position.y - 4);
        ctx.lineTo(position.x + 3, position.y - 4);
        ctx.stroke();
    }
    
}