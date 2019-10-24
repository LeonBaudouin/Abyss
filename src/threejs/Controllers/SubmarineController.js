import * as THREE from "three";
import AbstractController from "../Abstract/AbstractController.class";
import { EventProvider } from "../../front/Events/EventProvider";
import Easing from "../Math/Easing";

export default class SubmarineController extends AbstractController {
    constructor(positions, objectToLookAt) {
        super();
        this.scrollIndex = 0;
        this.hasScroll = false;
        this.isMoving = false;
        this.timer = 0;
        this.duration = 120;
        this.positions = positions;
        this.currentCurve = null;
        this.objectsToLookAt = objectToLookAt;
        EventProvider.listenTo('scroll-to', (i) => {this.scrollIndex = i; this.hasScroll = true});
        this.curves = [null, new THREE.CurvePath(), new THREE.CurvePath(), new THREE.CurvePath(), new THREE.CurvePath(), new THREE.CurvePath(), new THREE.CurvePath(), new THREE.CurvePath()]
        
        this.curves[1].add(
            new THREE.CubicBezierCurve3(
                new THREE.Vector3(-4, 2, -5),
                new THREE.Vector3( 0, -1, 8),
                new THREE.Vector3(-20, -5, -5),
                new THREE.Vector3(-8, -10, -3.5)
            )
        );
        this.curves[2].add(
            new THREE.CubicBezierCurve3(
                new THREE.Vector3(-8, -10, -3.5),
                new THREE.Vector3( 3, -13, -2),
                new THREE.Vector3(15, -20, -18),
                new THREE.Vector3(6, -24, -6)
            )
        )

        this.curves[3].add(
            new THREE.CubicBezierCurve3(
                new THREE.Vector3(6, -24, -6),
                new THREE.Vector3(-25, -38, 35),
                new THREE.Vector3(-15, -39, -40),
                new THREE.Vector3(-4, -40, -5)
            )
        )

        this.curves[4].add(
            new THREE.CubicBezierCurve3(
                new THREE.Vector3(-4, -40, -5),
                new THREE.Vector3(0, -50, 30),
                new THREE.Vector3(-35, -60, -15),
                new THREE.Vector3(-7, -55, -6)
            )
        )

        this.curves[5].add(
            new THREE.CubicBezierCurve3(
                new THREE.Vector3(-7, -55, -6),
                new THREE.Vector3(20, -45, 10),
                new THREE.Vector3(30, -65, -30),
                new THREE.Vector3(4, -70, -5)
            )
        )

        this.curves[6].add(
            new THREE.CubicBezierCurve3(
                new THREE.Vector3(4, -70, -5),
                new THREE.Vector3(-20, -76, 25),
                new THREE.Vector3(-15, -78, -30),
                new THREE.Vector3(-2, -80, -5)
            )
        )

        this.curves[7].add(
            new THREE.CubicBezierCurve3(
                new THREE.Vector3(-2, -80, -5),
                new THREE.Vector3(20, -70, 25),
                new THREE.Vector3(5, -89, -40),
                new THREE.Vector3(1, -91, -3.5)
            )
        )
    }

    update(object3d, time) {
        if (this.hasScroll && this.curves[this.scrollIndex - 1] != null) {
            this.hasScroll = false;
            this.currentCurve = this.curves[this.scrollIndex - 1];
            this.isMoving = true;
        }

        if (this.timer >= this.duration) {
            this.isMoving = false;
            this.timer = 1;
        }

        if (this.isMoving) {
            this.moveOnCurentCurve(object3d);
            this.timer++;
        }
    }
    

    moveOnCurentCurve(object3d) {
        const progression = Easing.easeInOutQuad(this.timer, 0, 1, this.duration);
        const nextProgression = Easing.easeInOutQuad(this.timer + 1, 0, 1, this.duration);
        object3d.position.copy(this.currentCurve.getPoint(progression));
        object3d.lookAt(this.currentCurve.getPoint(nextProgression));
    }
}