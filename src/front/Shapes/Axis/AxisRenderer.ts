import { RendererInterface } from "../../Influencets/Abstract/RendererInterface";
import AxisState from "./AxisState";

export default class AxisRenderer implements RendererInterface {

    Render({color, position, size}: AxisState, ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = color.toString();
        ctx.moveTo(position.x - size.width, position.y);
        ctx.lineTo(position.x, position.y);
        ctx.lineTo(position.x, position.y + size.height);
        ctx.stroke();
    }
}