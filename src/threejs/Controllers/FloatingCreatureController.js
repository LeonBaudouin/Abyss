import AbstractController from "../Abstract/AbstractController.class";

export default class FloatingCreatureController extends AbstractController {

    constructor() {
        super()
        this.defaultY;
    }
    onMount(object3d) {
        this.defaultY = object3d.position.y;
    }

    update(object3d, time) {
        object3d.position.y = this.defaultY + Math.cos(time * 0.02) * 0.1;
    }
}