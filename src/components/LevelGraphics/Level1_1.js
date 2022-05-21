import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createScene, createCamera} from './createEnvironment';
import {createPlayer} from './createPlayer';
import {createText} from './createText';

let camera, scene, renderer;

const Level1_1 = () => {
 
    useEffect(() => {
        
        // create camera and scene
        // this is default camera 
        camera = createCamera(0, 7, 24, 0, 0, 0);
        scene = createScene();
        
        //! create player => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 1
        const player = createPlayer();
        scene.add(player); 
    
        //! create text => THIS IS GOING TO BE TRIGGERED BY USER CODE -STEP 2
        // createText = (hasSpeechBubble , text, fontSize) 
        const text =  createText(true, "I'm trying different words, whats up?!", 0.5, 0x171717);
        scene.add(text)
        
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

        var animate = function() { 
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