import * as THREE from "three";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import boxmodel from '../../../models/box/Box.OBJ'
import swordmodel from '../../../models/sword/sword.obj'
import shieldmodel from '../../../models/shield/source/shield.obj'
import shieldtexture from '../../../models/shield/textures/shieldtexture.png'

export const createInventory = (scene) => {
        // Instantiate a loader
        const obj = new OBJLoader();

        // Load a glTF resource
        obj.load(
            // resource URL
            boxmodel,
            // called when the resource is loaded
            function ( object ) {
                object.scale.set( 14, 14, 14 ) // scale here
                object.position.set( 4.8, 2, 4 ) // scale here
                object.rotateX(-Math.PI / 2);

                // For any meshes in the model, add our material.
                object.traverse( function ( node ) {
                    if ( node.isMesh ) node.material = new THREE.MeshPhongMaterial({color: 0x78522f});;
                } );

                scene.add(object)
            }
        );
}

export const createSword = (scene) => {
    // Instantiate a loader
    const obj = new OBJLoader();

    obj.load(
        // resource URL
        swordmodel,
        // called when the resource is loaded
        function ( object ) {
            object.scale.set( 5, 5, 5 ) // scale here
            object.position.set( 5.5, -1, 5 ) // scale here
            object.rotation.x = 1;
            object.rotation.z = 0.4;
            
            scene.add(object)
        }
    );
}

export const createShield = (scene) => {

    var textureLoader = new THREE.TextureLoader();
    var map = textureLoader.load(shieldtexture);
    var material = new THREE.MeshPhongMaterial({map: map});

    // Instantiate a loader
    const obj = new OBJLoader();

    // Load a glTF resource
    obj.load(
        // resource URL
        shieldmodel,
        // called when the resource is loaded
        function ( object ) {
            object.scale.set( 0.16, 0.16, 0.16 ) // scale here
            object.position.set( 6, 8, 5 ) // scale here
            object.rotateX(Math.PI / 2);

            // For any meshes in the model, add our material.
            object.traverse( function ( node ) {
                if ( node.isMesh ) node.material = material;
            } );

            scene.add(object)
        }
    );

}
