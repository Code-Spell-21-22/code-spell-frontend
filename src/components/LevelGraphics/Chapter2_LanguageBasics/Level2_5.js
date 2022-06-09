import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createMovement, resizeMovement, transitionObjectColor, showObject} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createTree, createFence} from "../Builders/createItems";
import {createText, showText} from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
import {createDay} from '../Builders/createSky';

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;
var step1 = false; var step2 = false; var step3 = false;

// * The for Statement
const Level2_5 = () => {
 
    useEffect(() => {
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 18, 44, 0, 10, 0);
        scene = createScene();
        
        // SPOTLIGHT ////////////////////////////////////
        const spotLight = new THREE.SpotLight( 0xffffff, 2, 100, -Math.PI);
    
        spotLight.position.set( 0, 16, 24 );
    
        const targetObject = new THREE.Object3D();
        targetObject.position.set(0, 16, -12)
        scene.add(targetObject);
    
        spotLight.target = targetObject;
        scene.add( spotLight );
        //*//////////////////////////////////////////////

        const player = createPlayer();
        player.position.set(0 ,2, 20)
        if (step1 === false && step2 === false && step3 === false){ showObject(scene, player) } else { scene.add(player); }  

        const tree = createTree();
        tree.position.set(16,0,4) 
        tree.scale.set(1.3,1.3,1.3)
        if (step1 === false && step2 === false && step3 === false){ showObject(scene, tree) } else { scene.add(tree); }  

        const fence = createFence();
        fence.position.set( 7.2, 0, -24 ) // scale here
        if (step1 === false && step2 === false && step3 === false){ showObject(scene, fence) } else { scene.add(fence); }  


        const day = createDay();
        day.position.set(-25, 10, -40);
        if (step1 === false && step2 === false && step3 === false){ showObject(scene, day) } else { scene.add(day); }  

        const totalSteps = 12;  

        // walk forward x number of steps
        var walkForward = (steps) => { createMovement(player, 0, 2, player.position.z - 4*(steps), 1500, '+2000'); }


        var createPath = (i, color, isStep3) => {

            var plane;

            // grid
            const gridHelper = new THREE.GridHelper( 4, 1 );
            gridHelper.position.set(0, 0.01, (16-4*i))
            scene.add( gridHelper );
            
            if (isStep3 === true){  // if step3 then no animation
                plane = new THREE.Mesh( new THREE.PlaneGeometry( 4, 4 ), new THREE.MeshBasicMaterial( { color: color } ) );
                
            } else {
                plane = new THREE.Mesh( new THREE.PlaneGeometry( 4, 4 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
                transitionObjectColor(plane, color, 350, '+1000');
            }
            
            plane.rotateX( - Math.PI / 2 );
            plane.position.set(0, 0.01, (16-4*i))

            scene.add( plane, gridHelper );
        }


        //* STEP1 -Call the method walkFoward() once
        // ! this response comes from backend (will either return true or false)
        var step1_response = true

        if (step1 === true && step1_response === true){ 
            if (step2 === false){ walkForward(1); }
            else { player.position.set(0, 2, 16)}
        }

        //* STEP2 - initialize remainingSteps - difference between the total number of steps and the steps already taken
        // ! this response comes from backend (will be a number (should be 9))
        var step2_response = totalSteps-1;

        var text;
        if (step2 === true){
            
                if (step2_response > 11){ 
                    for (var i  = 1; i <= 11; i++){
                        if (i < step2_response){ createPath(i, 0x8bccd9, step3); } // path
                        else { createPath(i, 0x111412, step3); }   // final block
                    }

                    text = createText("That's too many steps, you'll fall!", 0.6, 0xffffff, true, true, 0x171717);  
                    text.rotation.x -= 0.4;
                    showText(text, scene, player)  

                } else if (step2_response < 11) {
                    for (var i  = 1; i <= step2_response; i++){
                        if (i < step2_response){ createPath(i, 0x8bccd9, step3); } // path
                        else { createPath(i, 0x111412, step3); }   // final block
                    }

                    text = createText("Not enough steps, try again!", 0.6, 0xffffff, true, true, 0x171717);
                    text.rotation.x -= 0.4;
                    showText(text, scene, player)

                } else {
                    for (var i  = 1; i <= 11; i++){
                        if (i < step2_response){ createPath(i, 0x8bccd9, step3); } // path
                        else { createPath(i, 0x111412, step3); }   // final block
                    }
                }
                               
        }

        //* STEP3 - Write a for statement that calls the method walkFoward() as many times as the value of variable remainingSteps.
        // ! this response comes from backend (will be a number (number of times walkForward was called inside the loop))
        var step3_response = totalSteps - 1;

        if (step3 === true){ walkForward(step3_response); }


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
  
 export default Level2_5;