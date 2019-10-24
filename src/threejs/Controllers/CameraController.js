import * as THREE from "three";
import AbstractController from "../Abstract/AbstractController.class";
import { EventProvider } from "../../front/Events/EventProvider";
import Easing from "../Math/Easing";

export default class CameraController extends AbstractController {
    constructor() {
        super();
        this.scrollIndex = 0;
        this.hasScroll = false;
        this.isMoving = false;
        this.timer = 0;
        this.duration = 140;
        this.positions = [
            new THREE.Vector3(0, 0, 5),
            null,
            new THREE.Vector3(0, -10, 5),
            new THREE.Vector3(0, -24, 5),
            new THREE.Vector3(0, -40, 5),
            new THREE.Vector3(0, -55, 5),
            new THREE.Vector3(0, -70, 5),
            new THREE.Vector3(0, -80, 5),
            new THREE.Vector3(0, -90, 5)
        ]
        this.lastPosition = this.positions[0];
        this.targetPosition = this.positions[0];
        EventProvider.listenTo('scroll-to', (i) => {this.scrollIndex = i; this.hasScroll = true});
    }

    update(object3d, time) {
        if (this.hasScroll && this.positions[this.scrollIndex] != null) {
            this.timer = 0;
            this.hasScroll = false;
            this.targetPosition = this.positions[this.scrollIndex];
            this.lastPosition = object3d.position;
            this.isMoving = true;
        }

        if (this.timer > this.duration) {
            this.isMoving = false;
            this.timer = 0;
        }

        if (this.isMoving) {
            this.moveToTargetPosition(object3d);
            this.timer++;
        }
    }

    moveToTargetPosition(object3d) {
        const {x: tx, y: ty, z: tz} = this.targetPosition;
        const {x: lx, y: ly, z: lz} = this.lastPosition;
        const nx = Easing.easeInOutQuad(this.timer, lx, tx - lx, this.duration);
        const ny = Easing.easeInOutQuad(this.timer, ly, ty - ly, this.duration);
        const nz = Easing.easeInOutQuad(this.timer, lz, tz - lz, this.duration);
        object3d.position.set(nx, ny, nz);
    }

}