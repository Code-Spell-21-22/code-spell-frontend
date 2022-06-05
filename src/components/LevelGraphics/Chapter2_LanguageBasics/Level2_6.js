import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createMovement, transitionObjectColor} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createTree, createFence} from "../Builders/createItems";
import {createText, showText} from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
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
        camera = createCamera(0, 18, 44, 0, 10, 0);
        scene = createScene();
        scene.fog = new THREE.Fog(0x142433, 5, 90);
        
        const player = createPlayer();
        player.position.set(0 ,2, 20)
        scene.add(player); 

        const tree = createTree();
        tree.position.set(16 , 0, 4) 
        tree.scale.set(1.3,1.3,1.3)
        scene.add(tree);

        const fence = createFence()
        fence.position.z = -10
        scene.add(fence)

        scene.background = new THREE.Color(0x142433);
        scene.add(createNight(100))

        const totalSteps = 12;  

        // walk forward x number of steps
        var walkForward = (steps) => { createMovement(player, 0, 2, player.position.z - 4*(steps), 2000, '+2000'); }

        var createPath = (i, color) => {

            var plane;

            // grid
            const gridHelper = new THREE.GridHelper( 4, 1 );
            gridHelper.position.set(0, 0.01, (-28+4*i))
            scene.add( gridHelper );
            
            plane = new THREE.Mesh( new THREE.PlaneGeometry( 4, 4 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
            plane.rotateX( - Math.PI / 2 );
            plane.position.set(0, 0.01, (-28+4*i))
            
            transitionObjectColor(plane, color, 350, '+2000');

            scene.add( plane, gridHelper );
        }


         //* STEP1 -Call the method walkFoward() once
        // ! this response comes from backend (will either return true or false)
        var step1_response = true

        if (step1 === true && step1_response === true){ 
            if (step2 === false){ walkForward(1); }
            else { player.position.set(0, 2, 16)}
        }


        //* STEP2 - Write a while statement that calls the method walkFoward() until the value of variable atDoor is true.
        // ! this response comes from backend (will be a number (should be totalSteps-1))
        var step2_response = true;
        if (step2 === true && step2_response === true ){ 
            if (step3 === false){ walkForward(totalSteps-1); }
            else { player.position.set(0, 2, -28) }
        }

        //   //* STEP3 - Obtain the number of steps taken in total (including the first step) and store that value in a variable named totalSteps. 
        // ! this response comes from backend)
        var step3_response = [true, totalSteps-1];

        if (step3 === true && step3_response[0] === true) { 
            for (var i  = 1; i <= step3_response[1]; i++){
                if (i < step3_response[1]){ createPath(i, 0x8bccd9); } // path
                else { createPath(i, 0x111412); }   // final block
            }

            const point = new THREE.Object3D(new THREE.Vector3());
            point.position.set(6,0,24)

            const text = createText("Steps taken: " + step3_response[1], 0.5, 0xffffff, true, false, 0x142433);
            text.rotation.x -= 0.4
            showText(text, scene, point);
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
  
 export default Level2_6;