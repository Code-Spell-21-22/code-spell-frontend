import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createInventory, createSword, createShield} from '../Builders/createItems';
import {createMovement, resizeMovement} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createText, showText} from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
import {ageEditor} from '../Builders/ageEditor'

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;

var step1 = false; var step2 = false; var step3 = false;

// * Variables
const Level2_1 = () => {
    
    useEffect(() => {
        
        var age, speech
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 6.5, 34, 0, 4, 0);
        scene = createScene();
        
        // player
        const player = createPlayer();
        player.position.set(-8 ,2, 8)
        scene.add(player); 

        // inventory
        createInventory(scene);

        // sword
        const sword = createSword();
        scene.add(sword);

        // shield
        const shield = createShield();
        scene.add(shield);


        // ! this response is sent from backend
        // [player object, age]
        var step1_response = [player, 30];
        
        // * edit player age => THIS IS GOING TO BE TRIGGERED BY USER CODE -STEP 1
        if (step1 === true){
            const ageBox = ageEditor(step1_response);
            scene.add(ageBox);
        }
        age = step1_response[1]
        
        // ! this response is sent from backend
        var step2_response = "I'm learning variables";
        
        // * create text => THIS IS GOING TO BE TRIGGERED BY USER CODE -STEP 2
        // createText = (text, fontSize, textColor, hasSpeechBubble, hasTri, bubbleColor)
        if (step2 === true){ showText(createText(step2_response, 0.5, 0x171717, true, true, 0xffffff), scene, player) }
        speech = step2_response;

        // * create movement => THIS IS GOING TO BE TRIGGERED BY USER CODE -STEP 3
        //  const createMovement = (obj, x, y, z, timeTo, delay)
        if (step3 === true){
            createMovement(sword, 1, -5.8, 0, 800, '+2000');
            createMovement(shield, -0.5, -5, 0, 800, '+2000'); 
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
            requestAnimationFrame(animate);
            TWEEN.update(time)
            renderer.render( scene, camera ); 
        };

        animate();

    }, []);

    return(
       <div id="threejs"></div>
    );

 };
  
 export default Level2_1;