import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {createText, showText} from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
import {createNight} from '../Builders/createSky';

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;
var step1 = false; var step2 = false;

// * The switch Statement
const Level2_4 = () => {
 
    useEffect(() => {
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 7, 34, 0, 4, 0);
        scene = createScene();
        
        const player = createPlayer();
        player.position.set(0 ,2, 12)
        scene.add(player); 

        var stars = 50;
        scene.background = new THREE.Color(0x142433);
        scene.add(createNight(stars))


        //* STEP1 -Rewrite the if-then-else statement from the previous level into a switch statement
        // ! this response comes from backend
        var step1_response = [50, "So many stars!", 40, "What a starry sky!","What a beautiful sky!"] 
        
        //* STEP2 - Change the value of the variable stars to study the behavior of the switch statement
        // ! this response comes from backend
        var step2_response = 80;    // player can change stars value 
        
        if (step1 === true) {

            if (step2 === true) { stars = step2_response }

            if (stars === step1_response[0]) { 
                showText(createText(step1_response[1], 0.5, 0x171717, true, true, 0xffffff), scene, player) 
            } 
            else if (stars === step1_response[2]) { 
                showText(createText(step1_response[3], 0.5, 0x171717, true, true, 0xffffff), scene, player) 
            } 
            else { 
                showText(createText(step1_response[4], 0.5, 0x171717, true, true, 0xffffff), scene, player) 
            }

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
  
 export default Level2_4;