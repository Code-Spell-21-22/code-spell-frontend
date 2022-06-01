
import * as THREE from "three";
let camera, scene;
 
export const createCamera = (posx, posy, posz, lx, ly, lz) => {
    camera = new THREE.PerspectiveCamera( 60, 0.9, 1, 2000 );
    camera.position.set( posx, posy, posz );
    camera.lookAt( lx, ly, lz );

    return camera;
}

export const createScene = () => {    

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2e78e1);
    
    // The X axis is red. The Y axis is green. The Z axis is blue.
    const axesHelper = new THREE.AxesHelper( 10 );
    // scene.add( axesHelper );

    // grid
    const gridHelper = new THREE.GridHelper( 60, 15 );
    scene.add( gridHelper );

    // plane
    const plane = new THREE.Mesh( new THREE.PlaneGeometry( 60, 60 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
    plane.rotateX( - Math.PI / 2 );
    plane.receiveShadow = true;
    scene.add( plane );

    // lights    
    const ambientLight = new THREE.AmbientLight( 0x606060, 1 );
    scene.add( ambientLight );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    scene.add( directionalLight );

    // const spotLight = new THREE.SpotLight( 0xffffff, 3, -Math.PI );
    
    // spotLight.position.set( 0, 40, 20 );

    // const targetObject = new THREE.Object3D();
    // targetObject.position.set(0, 20, -10)
    // scene.add(targetObject);

    // spotLight.target = targetObject;
    // scene.add( spotLight );

    return scene;
}