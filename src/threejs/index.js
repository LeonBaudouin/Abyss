import * as THREE from "three";
import BaseObject3d from './Abstract/BaseObject3d.class';
import ThreeScene from './ThreeScene';
import GLTFLoader from './Loader/GLTFloader';
import { Refractor } from './jsm/Refractor';
import { WaterRefractionShader } from './jsm/WaterRefractionShader';
import VolumetricSpotLightMaterial from "./Threex/threex.volumetricspotlightmaterial";
import SubmarineController from "./Controllers/SubmarineController";
import CameraController from "./Controllers/CameraController";
import ParticleController from "./Controllers/ParticleController";
import SubmarineLightController from "./Controllers/SubmarineLightController";
import { transformRange } from "../front/Influencets/CustomTypes/Interval";

const modelPath = [
    'assets/model/sousmarin.glb',
    'assets/model/macropinnamicrostoma.glb',
    'assets/model/calamar.glb',
    'assets/model/tutu.glb',
    'assets/model/mangeurdenemo.glb',
    'assets/model/epongelampadaire.glb',
    'assets/model/beroeforskalii.glb',
    'assets/model/dumbo.glb'
]

export function startThree() {
    GLTFLoader.load(modelPath).then(createObjects);
}

function createObjects(data) {
    let titleTarget;
    let spotTargetRight;
    let spotTargetLeft;
    let skalii;
    let sponge;
    let tutu;
    let nemo;
    let dumbo;
    let calamar;
    let macropinnamicrostoma;
    let submarine;

    const camera = new BaseObject3d(
        () => {
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera.position.set(0, 0, 5);
            return camera;
        },
        [
            new CameraController()
        ]
    )
                
    const xInterval = {min: -10, max: 10};
    const yInterval = {min: -90, max: 10};
    const zInterval = {min: 0, max: 3};

    const objects = [
        new BaseObject3d(
            () => {
                const particleNbr = 1000;
                const particles = new THREE.Geometry();
                for (let i = 0; i < particleNbr; i++) {
                    const x = transformRange(Math.random(), {min: 0, max: 1}, xInterval);
                    const y = transformRange(Math.random(), {min: 0, max: 1}, yInterval);
                    const z = transformRange(Math.random(), {min: 0, max: 1}, zInterval);
                    particles.vertices.push(new THREE.Vector3(x, y, z));
                }

                const particleMaterial = new THREE.PointsMaterial(
                    {
                        color: 0xcccccc,
                        size: 0.03,
                        opacity: 0.5,
                        map: THREE.ImageUtils.loadTexture("assets/particle.png"),
                        transparent: true,
                    });
        
                return new THREE.Points(particles, particleMaterial);
            },
            [
                new ParticleController({
                    x: xInterval,
                    y: yInterval,
                    z: zInterval
                })
            ]
        ),
        new BaseObject3d(
            () => {
                macropinnamicrostoma = data[1].scene;
                const material = macropinnamicrostoma.children[0].children[2].material;

                material.opacity = 0.4;
                material.transparent = true;
                macropinnamicrostoma.position.set(3, -11.5, 0);
                macropinnamicrostoma.rotateY(Math.PI - Math.PI / 4);

                return macropinnamicrostoma;
            }
        ),
        new BaseObject3d(
            () => {
                calamar = data[2].scene;
                calamar.rotateY(Math.PI + Math.PI / 3);
                calamar.position.set(-6, -24, -2);
                return calamar;
            }
        ),
        new BaseObject3d(
            () => {
                tutu = data[3].scene;
                const material = tutu.children[0].children[1].material;

                material.opacity = 0.4;
                material.transparent = true;
                tutu.rotateY(Math.PI + Math.PI / 3);
                tutu.position.set(0, -41, 2);
                return tutu;
            }
        ),
        new BaseObject3d(
            () => {
                nemo = data[4].scene;
                const material = nemo.children[0].children[2].material;

                material.opacity = 0.4;
                material.transparent = true;
                nemo.rotateY(Math.PI - Math.PI / 3);
                nemo.rotateX(- Math.PI / 8);
                nemo.position.set(4, -54, -2);
                return nemo;
            }
        ),
        new BaseObject3d(
            () => {
                sponge = data[5].scene;
                sponge.scale.set(1.3, 1.3, 1.3);
                const material = sponge.children[0].children[1].material;
                material.emissive = new THREE.Color(0x649ac6);
                material.emissiveIntensity = 0.5;
                material.opacity = 0.4;
                material.transparent = true;
                sponge.rotateY(Math.PI);
                const factor = 5.4 / 900;
                const diff = window.innerWidth - 636;
                const x = - 2 -factor * diff;
                sponge.position.set(x, -70, -1);
                return sponge;
            },
            [],
            [
                new BaseObject3d(
                    () => {
                        var light = new THREE.PointLight( 0x649ac6, 2, 3 );
                        light.position.set(-0.4, 0.45, 0);
                        return light;
                    }
                )
            ]
        ),
        new BaseObject3d(
            () => {
                skalii = data[6].scene;
                const material = skalii.children[0].children[1].material;

                material.opacity = 0.4;
                material.transparent = true;
                skalii.rotateY(Math.PI - Math.PI / 3);
                skalii.position.set(2.5, -81.5, 1);
                return skalii;
            }
        ),
        new BaseObject3d(
            () => {
                dumbo = data[7].scene;
                dumbo.position.set(0, -91, 1.8);
                dumbo.rotateY(Math.PI / 2);
                dumbo.rotateZ(-Math.PI / 12);
                return dumbo;
            }
        ),
        new BaseObject3d(
            () => {
                titleTarget = new THREE.Object3D();
                titleTarget.position.set(-1, -2, 5);
                return titleTarget; 
            }
        ),
        // new BaseObject3d(
        //     () => {
        //         var curve = new THREE.CubicBezierCurve3(
        //             new THREE.Vector3(-4, 2, -5),
        //             new THREE.Vector3( 0, -1, 8),
        //             new THREE.Vector3(-20, -5, -5),
        //             new THREE.Vector3(-8, -10, -3.5)
        //         )
                
        //         var points = curve.getPoints( 50 );
        //         var geometry = new THREE.BufferGeometry().setFromPoints( points );
                
        //         var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
        //         return new THREE.Line( geometry, material );
        //     }
        // ),
        // new BaseObject3d(
        //     () => {
        //         var curve = new THREE.CubicBezierCurve3(
        //             new THREE.Vector3(-8, -10, -3.5),
        //             new THREE.Vector3( 3, -13, -2),
        //             new THREE.Vector3(15, -15, -20),
        //             new THREE.Vector3(6, -24, -6)
        //         )
                
        //         var points = curve.getPoints( 50 );
        //         var geometry = new THREE.BufferGeometry().setFromPoints( points );
                
        //         var material = new THREE.LineBasicMaterial( { color : 0x00ff00 } );
        //         return new THREE.Line( geometry, material );
        //     }
        // ),
        // new BaseObject3d(
        //     () => {
        //         var curve = 
        //         new THREE.CubicBezierCurve3(
        //             new THREE.Vector3(6, -24, -6),
        //             new THREE.Vector3(-25, -35, 35),
        //             new THREE.Vector3(-15, -38, -40),
        //             new THREE.Vector3(-4, -40, -5)
        //         )
                
        //         var points = curve.getPoints( 50 );
        //         var geometry = new THREE.BufferGeometry().setFromPoints( points );
                
        //         var material = new THREE.LineBasicMaterial( { color : 0x0000ff } );
        //         return new THREE.Line( geometry, material );
        //     }
        // ),
        // new BaseObject3d(
        //     () => {
        //         var curve = 
        //         new THREE.CubicBezierCurve3(
        //             new THREE.Vector3(-7, -55, -6),
        //             new THREE.Vector3(20, -40, 10),
        //             new THREE.Vector3(30, -60, -30),
        //             new THREE.Vector3(4, -70, -5)
        //         )
                
        //         var points = curve.getPoints( 50 );
        //         var geometry = new THREE.BufferGeometry().setFromPoints( points );
                
        //         var material = new THREE.LineBasicMaterial( { color : 0xff00ff } );
        //         return new THREE.Line( geometry, material );
        //     }
        // ),
        // new BaseObject3d(
        //     () => {
        //         var curve = 
        //         new THREE.CubicBezierCurve3(
        //             new THREE.Vector3(-4, -40, -5),
        //             new THREE.Vector3(0, -50, 30),
        //             new THREE.Vector3(-35, -60, -15),
        //             new THREE.Vector3(-7, -55, -6)
        //         )
                
        //         var points = curve.getPoints( 50 );
        //         var geometry = new THREE.BufferGeometry().setFromPoints( points );
                
        //         var material = new THREE.LineBasicMaterial( { color : 0xffff00 } );
        //         return new THREE.Line( geometry, material );
        //     }
        // ),
        // new BaseObject3d(
        //     () => {
        //         var curve = 
        //         new THREE.CubicBezierCurve3(
        //             new THREE.Vector3(4, -70, -5),
        //             new THREE.Vector3(-20, -76, 25),
        //             new THREE.Vector3(-15, -78, -30),
        //             new THREE.Vector3(-2, -80, -5)
        //         )
                
        //         var points = curve.getPoints( 50 );
        //         var geometry = new THREE.BufferGeometry().setFromPoints( points );
                
        //         var material = new THREE.LineBasicMaterial( { color : 0x00ffff } );
        //         return new THREE.Line( geometry, material );
        //     }
        // ),
        // new BaseObject3d(
        //     () => {
        //         var curve = 
        //         new THREE.CubicBezierCurve3(
        //             new THREE.Vector3(-2, -80, -5),
        //             new THREE.Vector3(20, -70, 25),
        //             new THREE.Vector3(-2, -89, -40),
        //             new THREE.Vector3(-1, -91, -3.5)
        //         )
                
        //         var points = curve.getPoints( 50 );
        //         var geometry = new THREE.BufferGeometry().setFromPoints( points );
                
        //         var material = new THREE.LineBasicMaterial( { color : 0xffffff } );
        //         return new THREE.Line( geometry, material );
        //     }
        // ),
        // new BaseObject3d(
        //     () => {
		// 		const refractorGeometry = new THREE.PlaneBufferGeometry(10, 10);

		// 		const refractor = new Refractor(refractorGeometry, {
		// 			color: 0x999999,
		// 			textureWidth: 1024,
		// 			textureHeight: 1024,
		// 			shader: WaterRefractionShader
        //         });
                
        //         refractor.position.set(0, 0, 5);
        //         return refractor;
        //     }
        // ),
        new BaseObject3d(
            () => {
                submarine = data[0].scene;
                const material = submarine.children[0].children[1].material;
                
                submarine.position.set(-4, 2, -5);
                
                material.opacity = 0.5;
                material.transparent = true;

                submarine.lookAt(titleTarget.position);

                return submarine;
            },
            [
                new SubmarineController(
                    [new THREE.Vector3(-4, 2, -5), new THREE.Vector3(-8, -10, -3.5)],
                    [titleTarget, macropinnamicrostoma]
                )
            ],
            [
                new BaseObject3d(
                    () => {
                        spotTargetRight = new THREE.Object3D();
                        spotTargetRight.position.set(1.8, -1.6, 2.7);
                        return spotTargetRight;
                    }
                ),
                new BaseObject3d(
                    () => {
                        spotTargetLeft = new THREE.Object3D();
                        spotTargetLeft.position.set(-1.8, -1.6, 2.7);
                        return spotTargetLeft;
                    }
                ),
                new BaseObject3d(
                    () => {
                        const spot = new THREE.SpotLight(0xffffff, 2);
                        spot.penumbra = 0.5;
                        spot.angle = Math.PI/3;
                        spot.position.set(1.8, -1.6, 2.6);
                        spot.target = spotTargetRight;
                        return spot;
                    },
                    [new SubmarineLightController()]
                ),
                new BaseObject3d(
                    () => {
                        const spot = new THREE.SpotLight(0xffffff, 2);
                        spot.penumbra = 0.5;
                        spot.angle = Math.PI/3;
                        spot.position.set(-1.8, -1.6, 2.6);
                        spot.target = spotTargetLeft;
                        return spot;
                    },
                    [new SubmarineLightController()]
                ),
                // new BaseObject3d(
                //     () => {
                //         const geometry	= new THREE.CylinderGeometry(0.07, 1.5, 12, 32*2, 20, true);
                //         const material = new VolumetricSpotLightMaterial();
                //         const mesh = new THREE.Mesh(geometry, material);
                //         mesh.position.set(0, 0, 2 + 0.5);
                //         mesh.rotateX(- Math.PI / 2);
                //         material.uniforms.lightColor.value.set(0xffffff);
                //         material.uniforms.spotPosition.value = mesh.position
                //         return mesh;
                //     }
                // )   
            ]
        ),
        new BaseObject3d(
            () => new THREE.AmbientLight(0xffffff, 0.3),
        ),
        new BaseObject3d(
            () => {
                const spot = new THREE.SpotLight(0xffffff, 1.2, 50);
                spot.penumbra = 0.5;
                spot.position.set(-3, 0, 6);

                spot.target = submarine;
                return spot;
            }
        ),
        new BaseObject3d(
            () => {
                const spot = new THREE.SpotLight(0xffffff, 5, 30);
                spot.penumbra = 0.5;
                spot.position.set(6, -7, 2);

                spot.target = macropinnamicrostoma;
                return spot;
            }
        ),
        new BaseObject3d(
            () => {
                const spot = new THREE.SpotLight(0xffffff, 2, 30);
                spot.penumbra = 0.5;
                spot.angle = Math.PI / 3
                spot.position.set(13, -55, 0);

                spot.target = nemo;
                return spot;
            }
        ),
        new BaseObject3d(
            () => {
                const spot = new THREE.SpotLight(0xffffff, 1, 30);
                spot.penumbra = 0.5;
                spot.angle = Math.PI / 3
                spot.position.set(5, -80, 5);

                spot.target = skalii;
                return spot;
            }
        ),
        new BaseObject3d(
            () => {
                const spot = new THREE.SpotLight(0xffffff, 1);
                spot.penumbra = 0.5;
                spot.position.set(6, -40, 0);

                spot.target = tutu;
                return spot;
            }
        ),
        new BaseObject3d(
            () => {
                const spot = new THREE.SpotLight(0xffffff, 0.5);
                spot.penumbra = 0.5;
                spot.position.set(4, -90, 5);

                spot.target = dumbo;
                return spot;
            }
        )
        // new BaseObject3d(
        //     () => {
        //         return new THREE.AmbientLight(0xffffff)
        //     }
        // )
    ]

    const threeScene = new ThreeScene(camera, objects);
    raf(threeScene)

}

function raf(threeScene) {
    requestAnimationFrame(() => raf(threeScene))
    threeScene.update();
}
