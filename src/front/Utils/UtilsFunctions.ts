import { Point } from "../Influencets/CustomTypes/Point";

export namespace MathFunc {

  export function getDistance(p1: Point, p2: Point): number {
    return Math.sqrt(
      (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y)
    );
  }

  export function getAngle(p1: Point, p2: Point): number {
    let distance = getDistance(p1, p2);
    let angle = Math.acos((p1.x - p2.x) / distance);
    if (p1.y > p2.y) {
      return angle;
    } else {
      return -angle;
    }
  }

  export function easeInOutQuad(progression: number) {
    return progression<.5 ? 2*progression*progression : -1+(4-2*progression)*progression
  }; 
}

export function GetWindowHeight(): number {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}