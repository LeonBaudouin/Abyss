import AbstractController from "../Abstract/AbstractController.class";
import * as THREE from "three";

export default class ParticleController extends AbstractController {

    constructor({x, y, z}) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.particleVelocities;
    }

    onMount(object3d) {
        this.particleVelocities = object3d.geometry.vertices.map(vertex => {
            const y = - Math.random() * 0.001 - 0.002;
            return new THREE.Vector3(0, y, 0)
        });
    }

    update(object3d, time) {
        object3d.geometry.vertices.forEach((vertex, index) => {
            vertex.add(this.particleVelocities[index]);
            if (vertex.x > this.x.max) {
                vertex.x = this.x.min
            }
            if (vertex.x < this.x.min) {
                vertex.x = this.x.max
            }
            if (vertex.y > this.y.max) {
                vertex.y = this.y.min
            }
            if (vertex.y < this.y.min) {
                vertex.y = this.y.max
            }
        })
        object3d.geometry.verticesNeedUpdate = true;
    }
}