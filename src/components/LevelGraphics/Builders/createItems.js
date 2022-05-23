import * as THREE from "three";

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import boxmodel from '../../../models/box/box.obj'
import swordmodel from '../../../models/sword/sword.obj'
import shieldmodel from '../../../models/shield/shield.obj'

export const createInventory = (scene) => {
        // Instantiate a loader
        const loader = new OBJLoader();

        // Load a glTF resource
        loader.load(
            // resource URL
            boxmodel,
            // called when the resource is loaded
            function ( inventory ) {
                inventory.scale.set( 15, 15, 15 ) // scale here
                inventory.position.set( 4.8, 2, 4 ) // scale here
                inventory.rotateX(-Math.PI / 2);

                // For any meshes in the model, add our material.
                inventory.traverse( function ( node ) {
                    if ( node.isMesh ) node.material = new THREE.MeshPhongMaterial({color: 0x78522f});
                } );

                scene.add(inventory)
            }
        );
}

export const createSword = () => {

    const group = new THREE.Group();
    // Instantiate a loader
    const loader = new OBJLoader();
    
    loader.load(
        // resource URL
        swordmodel,
        // called when the resource is loaded
        function ( sword ) {
            sword.scale.set( 6, 6, 6 ) // scale here
            sword.position.set( 6.5, -3, 0 ) // scale here
            sword.rotation.x = 1;
            sword.rotation.z = 0.4;
            
            sword.traverse( function ( node ) {
                if ( node.isMesh ) node.material = new THREE.MeshPhongMaterial({color: 0xe3e3e3});
            } );

            group.add(sword)
        }
    );
    return group;
}

export const createShield = () => {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new OBJLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        shieldmodel,
        // called when the resource is loaded
        function ( shield ) {
            shield.scale.set( 0.16, 0.16, 0.16 ) // scale here
            shield.position.set( 6, 8, 5 ) // scale here
            shield.rotateX(Math.PI / 2);

            // For any meshes in the model, add our material.
            shield.traverse( function ( node ) {
                if ( node.isMesh ) node.material = new THREE.MeshPhongMaterial({color: 0xe3e3e3});
            } );

            group.add(shield)
        }
    );
    return group;
}
