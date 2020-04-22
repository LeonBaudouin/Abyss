import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";
import { Raycaster } from "./Events/Raycaster.class";

export default class ThreeScene {
    constructor(cameraComponent, objects = []) {
        this.cameraComponent = cameraComponent;
        this.scene;
        this.renderer;
        this.raycaster = Raycaster.getInstance();
        this.objects = objects;
        this.controls;
        this.time = 0;

        this.bind();
        this.setupScene();
        this.setupControls();
    }

    setupScene() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();

        const fogColor = new THREE.Color(0x000000);

        this.scene.background = fogColor;
        this.scene.fog = new THREE.FogExp2(fogColor, 0.01);
        this.objects.forEach(obj => this.scene.add(obj.object3d));
    }

    setupControls() {
        this.controls = new OrbitControls(
            this.cameraComponent.object3d,
            this.renderer.domElement
        );
        this.controls.enabled = true;
        this.controls.maxDistance = 1500;
        this.controls.minDistance = 0;
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this);
        window.addEventListener("resize", this.resizeCanvas);
    }

    update() {
        this.raycaster.update(this.cameraComponent.object3d);
        this.cameraComponent.update(this.time);
        this.objects.forEach(obj => obj.update(this.time));
        this.renderer.render(this.scene, this.cameraComponent.object3d);
        this.time++;
    }

    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.cameraComponent.object3d.aspect =
            window.innerWidth / window.innerHeight;
        this.cameraComponent.object3d.updateProjectionMatrix();
    }
}
