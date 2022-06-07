import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {resizeMovement, showObject} from '../Builders/tweenMotions';
import {createPlayer} from '../Builders/createPlayer';
import {createTree} from '../Builders/createItems'
import {createText} from '../Builders/createText';

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;
var step1 = true; var step2 = true;

// * Hello World
const Level1_1 = () => {
 
    useEffect(() => {
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 7, 24, 0, 5, 0);
        scene = createScene();
        
        // * create player => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 1
        if (step1 === true) {
            showObject(scene, createPlayer());
            showObject(scene, createTree());

        }
        
        // ! this response comes from backend
        const step2_response = "Hello World!";
        
        // * create text => THIS IS GOING TO BE TRIGGERED BY USER CODE -STEP 2
        // const createText = (text, fontSize, textColor, hasSpeechBubble, hasTri, bubbleColor)
        if (step2 === true){
            const text =  createText(step2_response, 0.5, 0x171717, true, true, 0xffffff);
            text.scale.set(0, 0, 0)
            scene.add(text);
            resizeMovement(text, 1, 1, 1, 1000, '+2000');
        } 
        
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
            TWEEN.update(time)
            requestAnimationFrame(animate);
            renderer.render( scene, camera ); 
        };

        animate();

    }, []);

    return(
       <div id="threejs"></div>
    );

 };
  
 export default Level1_1;