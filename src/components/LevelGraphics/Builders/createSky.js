import * as THREE from "three";

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import cloudmodel from '../../../models/cloud/cloud.obj'

export const createDay = () => {
    const day = new THREE.Group();

    const sun = new THREE.Mesh( new THREE.SphereGeometry( 7, 32, 32 ), new THREE.MeshBasicMaterial( { color: 0xffcb3b } ));
    sun.position.set(6, 25, -30);
  
    const loader = new OBJLoader();

    loader.load(
        // resource URL
        cloudmodel,
        // called when the resource is loaded
        function ( cloud ) {
            cloud.scale.set( 0.031, 0.031, 0.031 ) // scale here
            cloud.position.set( -6, 12, -24 ) // scale here
            
            day.add(cloud)
        }, 
        // called while loading is progressing
        function ( xhr ) { console.log( ('cloud ' + xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
        // called when loading has errors
        function ( error ) { console.log( 'An error happened '); }
    );

    day.add(sun)
    return day;
}

export const createNight = (stars) => {
    const night = new THREE.Group();

    const moon = new THREE.Mesh( new THREE.SphereGeometry( 3, 20, 20 ), new THREE.MeshBasicMaterial( { color: 0xdedede } ) );
    moon.position.set(-8, 30, -30);


    const star_vertices = [];

    for ( let i = 0; i < stars*10; i ++ ) {
        const x = THREE.MathUtils.randFloatSpread( 200 );
        const y = THREE.MathUtils.randFloatSpread( 200 );
        const z = THREE.MathUtils.randFloatSpread( 100 ) - 200; 
        star_vertices.push( x, y, z );
    
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( star_vertices, 3 ) );
    const points = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
        
    night.add(moon, points)
    return night;
}