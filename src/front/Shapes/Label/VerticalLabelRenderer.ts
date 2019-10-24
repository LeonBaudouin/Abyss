import { RendererInterface } from "../../Influencets/Abstract/RendererInterface";
import LabelState from "./LabelState";

export default class VerticalLabelRenderer implements RendererInterface {
    
    Render({position, text, size, color}: LabelState, ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(position.x + 15, position.y);
        ctx.rotate(- Math.PI / 2);
        ctx.font = `${size}px poiret one`;
        ctx.fillStyle = color.toString();
        ctx.fillText(text, 5, 0);
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.lineTo(3, -4);
        ctx.stroke();
        ctx.restore();
    }
    
}