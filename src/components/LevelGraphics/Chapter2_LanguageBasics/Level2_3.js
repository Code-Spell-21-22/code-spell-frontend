import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createMovement, transitionColor} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createDay, createNight} from '../Builders/createSky';
import {createPlayer} from '../Builders/createPlayer';
import {createText, showText} from '../Builders/createText';

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;
var step1 = false; var step2 = false; var step3 = false;

// * The if-then and if-then-else Statements
const Level2_3 = () => {
 
    useEffect(() => {
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 7, 34, 0, 4, 0);
        scene = createScene();
        
        const player = createPlayer();
        player.position.set(0 ,2, 12)
        scene.add(player); 
        
        // by default is day
        scene.background = new THREE.Color(0x2f78e1)
        const day = createDay()
        scene.add(day)

        var stars = 50;
        
        //* STEP1 - Update the value of variable step1_response to false. (is true by default)
        // ! this response comes from backend
        var step1_response = false;  // should be false so it becomes night
        
        if (step1 == true){
            
            if (step1_response === false){   // then its night

                if (step2 === false ) { // lets make some transitions
                    createMovement(day, 50, 0, 0, 2000, '+2000')
    
                    const night = createNight(stars)
                    night.position.set(-300, 0, 0);
                    transitionColor(scene, 0x142433, 1000, '+0')
                    createMovement(night, 0, 0, 0, 2000, '+0')
                    scene.add(night)
                }
                
                if (step2 === true) {   // no transitions
                    scene.background = new THREE.Color(0x142433);
                    scene.remove(day)
                    scene.add(createNight(stars))
                }
            }
        }

        //* STEP2 - Write an if-then-else statement that evaluates if variable stars has a value greater than 40
        // ! this response comes from backend
        var step2_response = [40, "What a starry sky!","What a beautiful sky!"] 
        
        if (step2 === true && step3 === false){

            var step2_1 = step2_response[0]; var step2_2 = step2_response[1]; var step2_3 = step2_response[2];
            
            if (stars > step2_1) { showText(createText(step2_2, 0.5, 0x171717, true, true, 0xffffff), scene, player) } 
            else { showText(createText(step2_3, 0.5, 0x171717, true, true, 0xffffff), scene, player) }
        }

        //* STEP3 -Rewrite the previous if-then-else statement in order to only print "So many stars!" to standard output if the value of stars is equal to 50. 
        // ! this response comes from backend
        var step3_response = [50, "So many stars!", 40, "What a starry sky!","What a beautiful sky!"] 
        
        if (step3 === true) {

            var step3_1 = step3_response[0]; var step3_2 = step3_response[1]; var step3_3 = step3_response[2];
            var step3_4 = step3_response[3]; var step3_5 = step3_response[4];

            if (stars === step3_1) { showText(createText(step3_2, 0.5, 0x171717, true, true, 0xffffff), scene, player) } 
            else if (stars > step3_3) { showText(createText(step3_4, 0.5, 0x171717, true, true, 0xffffff), scene, player) } 
            else { showText(createText(step3_5, 0.5, 0x171717, true, true, 0xffffff), scene, player) }

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
  
 export default Level2_3;