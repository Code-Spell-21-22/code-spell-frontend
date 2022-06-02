import * as THREE from "three";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import boxmodel from '../../../models/box/box.obj'
import treemodel from '../../../models/tree/Tree2.fbx'
import swordmodel from '../../../models/sword/sword.obj'
import applemodel from '../../../models/apple/apple.obj'
import appletexture from '../../../models/apple/apple.jpg'
import shieldmodel from '../../../models/shield/shield.obj'

export const createInventory = (scene) => {
        // Instantiate a loader
        const loader = new OBJLoader();

        loader.load(
            // resource URL
            boxmodel,
            // called when the resource is loaded
            function ( inventory ) {
                inventory.scale.set( 15, 15, 15 ) // scale here
                inventory.position.set( 4.8, 2, 12 ) // scale here
                inventory.rotateX(-Math.PI / 2);

                // For any meshes in the model, add our material.
                inventory.traverse( function ( node ) {
                    if ( node.isMesh ) node.material = new THREE.MeshPhongMaterial({color: 0x78522f});
                } );

                scene.add(inventory)
            }, 
            // called while loading is progressing
            function ( xhr ) { console.log( ('inventory ' + xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
            // called when loading has errors
            function ( error ) { console.log( 'An error happened '); }
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
            sword.position.set( 6.5, -3, 10 ) // scale here
            sword.rotation.x = 1;
            sword.rotation.z = 0.4;
            
            sword.traverse( function ( node ) {
                if ( node.isMesh ) node.material = new THREE.MeshPhongMaterial({color: 0xe3e3e3});
            } );

            group.add(sword)
        }, 
        // called while loading is progressing
        function ( xhr ) { console.log( ('sword ' + xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
        // called when loading has errors
        function ( error ) { console.log( 'An error happened' ); }
    );
    return group;
}

export const createShield = () => {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new OBJLoader();

    loader.load(
        // resource URL
        shieldmodel,
        // called when the resource is loaded
        function ( shield ) {
            shield.scale.set( 0.16, 0.16, 0.16 ) // scale here
            shield.position.set( 6, 8, 12 ) // scale here
            shield.rotateX(Math.PI / 2);

            // For any meshes in the model, add our material.
            shield.traverse( function ( node ) {
                if ( node.isMesh ) node.material = new THREE.MeshPhongMaterial({color: 0xe3e3e3});
            } );

            group.add(shield)
        }, 
        // called while loading is progressing
        function ( xhr ) { console.log( ('shield ' + xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
        // called when loading has errors
        function ( error ) { console.log( 'An error happened' ); }
    );
    return group;
}

export const createTree = () => {
    const group = new THREE.Group();

    // Instantiate a loader
    const loader = new FBXLoader();

    loader.load(
        // resource URL
        treemodel,
        // called when the resource is loaded
        function ( tree ) {
            tree.scale.set( 0.017, 0.017, 0.017 ) // scale here
            tree.position.set( 0, 0, -10 ) // scale here
            
            group.add(tree)
        }, 
        // called while loading is progressing
        function ( xhr ) { console.log( ('tree ' + xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
        // called when loading has errors
        function ( error ) { console.log( 'An error happened' ); }
    );
    return group;
}