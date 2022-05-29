import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createMovement, resizeMovement, transitionObjectColor} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createPlayer} from '../Builders/createPlayer';
import {createTree, createFence} from "../Builders/createItems";
import {createNight} from '../Builders/createSky';

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;
var step1 = true; var step2 = true; var step3 = true;

//* The while and do-while Statement
const Level2_6 = () => {
 
    useEffect(() => {
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 20, 48, 0, 4, -8);
        scene = createScene();

        const color = 0x142433;  // white
        const near = 5;
        const far = 90;
        scene.fog = new THREE.Fog(color, near, far);
        
        const player = createPlayer();
        player.position.set(0 ,2, 24)
        scene.add(player); 

        const tree = createTree();
        tree.position.set(16,0,-6) 
        tree.scale.set(1.3,1.3,1.3)
        scene.add(tree);

        scene.add(createFence())

        scene.background = new THREE.Color(0x142433);
        scene.add(createNight(100))

        /////////////////////////////////////////////////////////////
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth / 3, window.innerHeight - window.innerHeight / 5);
        renderer.shadowMap.enabled = true;
    
        // const controls = new THREE.OrbitControls( camera, renderer.domElement );
        document.getElementById("threejs").parentNode.replaceChild(renderer.domElement, document.getElementById("threejs"));

        var onWindowResize = function () {
            camera.aspect = window.innerWidth / 3 / (window.innerHeight - window.innerHeight / 5);
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth / 3, window.innerHeight - window.innerHeight / 5);

        };

        window.addEventListener( 'resize', onWindowResize );    

        var animate = function(time) {
            TWEEN.update(time);
            requestAnimationFrame(animate);
            renderer.render( scene, camera ); 
        };

        animate();

    }, []);

    return(
       <div id="threejs"></div>
    );

 };
  
 export default Level2_6;