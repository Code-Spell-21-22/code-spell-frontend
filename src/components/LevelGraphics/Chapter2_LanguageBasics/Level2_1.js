import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {createPlayer} from '../Builders/createPlayer';
import {createText} from '../Builders/createText';
import {createInventory, createSword, createShield} from '../Builders/createInventory';
import {ageEditor} from '../Builders/ageEditor';

let camera, scene, renderer;
var step1 = true; var step2 = true; var step3 = false; var step4 = false;

// * Variables
const Level2_1 = () => {
    
    useEffect(() => {
        // create camera and scene
        

        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 6, 26, 0, 4, 0);
        scene = createScene();
        
        // player
        const player = createPlayer();
        player.position.set(-8 ,2, 0)
        scene.add(player); 

        // inventory
        const inventory = createInventory(scene);

        // sword
        const sword = createSword(scene);

        // shield
        const shield = createShield(scene);

        // ! this response is sent from backend
        // [player object, age]
        var step1_response = [player, 50];

        // * edit player age => THIS IS GOING TO BE TRIGGERED BY USER CODE -STEP 1
        if (step1 == true){
            const ageBox = ageEditor(step1_response);
            scene.add(ageBox);
        }

        // ! this response is sent from backend
        var step2_response = "Im learning variables";

        // * create text => THIS IS GOING TO BE TRIGGERED BY USER CODE -STEP 2
        // createText = (hasSpeechBubble, hasTri, , text, fontSize, textColor)
        if (step2 == true){
            const text =  createText(true, true, step2_response, 0.5, 0x171717);
            text.position.set(player.position.x, player.position.y-2, 0)
            scene.add(text)
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
  
 export default Level2_1;