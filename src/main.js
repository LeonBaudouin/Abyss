import './sass/index.scss';
import { startThree } from './threejs';
import { startFront } from './front/ScriptLoader.ts';
import { createObjects } from './threejs/index';
import GLTFLoader from './threejs/Loader/GLTFloader';

const modelPath = [
    '../assets/model/sousmarin.glb',
    '../assets/model/macropinnamicrostoma.glb',
    '../assets/model/calamar.glb',
    '../assets/model/tutu.glb',
    '../assets/model/mangeurdenemo.glb',
    '../assets/model/epongelampadaire.glb',
    '../assets/model/beroeforskalii.glb',
    '../assets/model/dumbo.glb'
]

GLTFLoader.load(modelPath).then((data) => {createObjects(data); startFront()});