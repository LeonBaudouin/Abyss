import { Canvas } from "./Influencets/Canvas";
import BaseDrawable from "./Influencets/Abstract/BaseDrawable";
import RectangleState from "./Shapes/Rectangle/RectangleState";
import Color from "./Influencets/CustomTypes/Color";
import RectangleRenderer from "./Shapes/Rectangle/RectangleRenderer";
import AxisState from "./Shapes/Axis/AxisState";
import AxisRenderer from "./Shapes/Axis/AxisRenderer";
import LabelState from "./Shapes/Label/LabelState";
import VerticalLabelRenderer from "./Shapes/Label/VerticalLabelRenderer";
import LabelRenderer from "./Shapes/Label/LabelRenderer";
import CircleState from "./Shapes/Circle/CircleState";
import { transformRange } from "./Influencets/CustomTypes/Interval";
import { Point } from "./Influencets/CustomTypes/Point";
import CircleRenderer from "./Shapes/Circle/CircleRenderer";
import { PositionState } from "./Influencets/Abstract/BaseStates";
import { StateObjectInterface } from "./Influencets/Abstract/StateObjectInterface";
import LineState from "./Shapes/Line/LineState";
import LineRenderer from "./Shapes/Line/LineRenderer";


const sin = (time: number, amount: number, offset: number) => Math.sin(time * 0.03 + offset * Math.PI * 2) * amount
const cos = (time: number, amount: number, offset: number) => Math.cos(time * 0.03 + offset * Math.PI * 2) * amount

export function CanvasSetup(data: Array<any>) {

    const htmlCanvas = <HTMLCanvasElement>document.querySelector('.graphicCanvas');
    const context = htmlCanvas.getContext('2d');
    const width = htmlCanvas.clientWidth;
    const height = htmlCanvas.clientHeight;
    const center = {x: width / 2, y: height / 2}

    const dates = (new Array(28)).fill(0).map((el, i) => generateDate(i, width, height))
    const amounts = (new Array(7)).fill(0).map((el, i) => generateAmount(i, width, height))
    const points = data.map((point) => generatePoint(point, width, height))
    const actualPoints = points.map(cur => <Point & {selected: boolean}>(<PositionState & StateObjectInterface>cur.getState()).position)
    // const topLeft = {x: 0, y: 0};
    // let lines : BaseDrawable[] = []
    // actualPoints.forEach((point) => {
    //     const closestPoints = actualPoints.reduce((acc, cur) => {
    //         if (cur.selected) return acc;
    //         const distance = Point.getDistance(cur, point)
    //         const index = acc.reduce((accClose, closePoint, index) => Point.getDistance(point, closePoint) > distance ? index : accClose, -1)
    //         const newAcc = [...acc];
    //         if (index > -1) {
    //             newAcc[index] = cur;
    //         }
    //         return newAcc
    //     }, [{...topLeft}, {...topLeft}, {...topLeft}])
    //     lines = lines.concat(closestPoints.map(closePoint =>
    //         new BaseDrawable(
    //             new LineState({
    //                 from: point,
    //                 to: closePoint,
    //                 color: new Color(255, 255, 255),
    //                 lineWidth: 1
    //             }),
    //             new LineRenderer()
    //         )
    //     ))
    //     point.selected = true;
    // })
    // console.log(lines)
    // const lines = actualPoints.map((point, index, array) => {
    //     if (index == array.length - 1) return null;
    //     return new BaseDrawable(
    //         new LineState({
    //             from: point,
    //             to: array[index + 1],
    //             color: new Color(255, 255, 255),
    //             lineWidth: 0.2
    //         }),
    //         new LineRenderer()
    //     )
    // })
    // lines.pop()
    const avgPoints = actualPoints.map((point, index, array) => {
        const newArray = array.slice(index, index + 30)
        return {
            x: point.x,
            y: newArray.reduce((acc, cur) => acc + cur.y, 0) / newArray.length
        }
    })

    const lines = avgPoints.map((point, index, array) => {
        if (index == array.length - 1) return null;
        return new BaseDrawable(
            new LineState({
                from: point,
                to: array[index + 1],
                color: new Color(255, 0, 0),
                lineWidth: 0.5
            }),
            new LineRenderer()
        )
    })
    lines.pop()

    const drawnObject = [
        new BaseDrawable(
            new RectangleState({
                color: new Color(0, 0, 0),
                size: {width, height},
                position: {...center},
            }),
            new RectangleRenderer()
        ),
        new BaseDrawable(
            new AxisState({
                color: new Color(255, 255, 255),
                size: {width: width * 0.9, height: height * 0.9},
                position: {x: width * 0.92, y: height * 0.08}
            }),
            new AxisRenderer()
        ),
        ...dates,
        ...amounts,
        ...points,
        ...lines
    ]

    return new Canvas(drawnObject, htmlCanvas, context);
}

function generateDate(i: number, width: number, height: number) {
    return new BaseDrawable(
        new LabelState({
            color: new Color(255, 255, 255),
            size: 8,
            position: {x: width * 0.93 * i / 28, y: height * 0.08},
            text: (i * 10 + 1750).toString()
        }),
        new VerticalLabelRenderer()
    )
}

function generateAmount(i: number, width: number, height: number) {
    return new BaseDrawable(
        new LabelState({
            color: new Color(255, 255, 255),
            size: 8,
            position: {x: width * 0.92, y: height * 0.09 + i * height * 0.90 / 6},
            text: (3000 - i * 500).toString()
        }),
        new LabelRenderer()
    )
}

function generatePoint(data: Point, width: number, height: number) {
    const entryXInterval = {min: 1750, max: 2020};
    const exitXInterval = {min: 2, max: width * 0.92};
    const entryYInterval = {min: 0, max: 3000};
    const exitYInterval = {min: height * 0.02, max: height * 0.92};
    return new BaseDrawable(
        new CircleState({
            color: new Color(255, 255, 255),
            size: 1.5,
            position: {
                x: transformRange(data.x, entryXInterval, exitXInterval),
                y: height - transformRange(data.y, entryYInterval, exitYInterval)
            }
        }),
        new CircleRenderer()
    )
}