import { GLTFLoader as NativeGLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class GLTFLoader {

    static load(modelPath) {
        return Promise.all(modelPath.map(GLTFLoader.loadOne));
    }

    static loadOne(path) {
        const loader = GLTFLoader.getNativeLoader();
        loader.setCrossOrigin('anonymous');
        return new Promise((resolve, reject) => {
            loader.load(
                path,
                resolve,
                () => GLTFLoader.updateXhr,
                reject
            );
        })
    }

    static updateXhr(xhr) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    }

    static getNativeLoader() {
        if (_nativeLoader == null) {
            _nativeLoader = new NativeGLTFLoader();
        }
        return _nativeLoader;
    }

}

let _nativeLoader = null;