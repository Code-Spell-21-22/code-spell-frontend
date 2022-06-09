import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {resizeMovement, showObject} from '../Builders/tweenMotions';
import {createText, showText} from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
import {createTree} from '../Builders/createItems'

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;
var step1 = false; var step2 = false;

// * Hello World
const Level1_1 = () => {
 
    useEffect(() => {
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 7, 34, 0, 5, 0);
        scene = createScene();
        if (step1 === false && step2 === false){ showObject(scene, camera); } else { scene.add( camera ); }
        if (step2 === false && step2 === false){ showObject(scene, scene); } else { scene.add( scene ); }
        
        // SPOTLIGHT ///////////////////////////
        const spotLight = new THREE.SpotLight( 0xffffff, 2, -Math.PI );
    
        spotLight.position.set( 0, 13, 0 );
    
        const targetObject = new THREE.Object3D();
        targetObject.position.set(0, 13, -200)
        scene.add(targetObject);
    
        spotLight.target = targetObject;
        scene.add( spotLight );
        /////////////////////////////////////////

        var player;
        // * create player => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 1
        if (step1 === true) {
            player = createPlayer();
            player.position.z = 12
            if (step2 === false){ showObject(scene, player); } else { scene.add( player ); }

            const tree1 = createTree();
            tree1.position.x = 10;
            if (step2 === false){ showObject(scene, tree1); } else { scene.add( tree1 ); }

            const tree2 = createTree();
            tree2.position.set(-6, 0, -15);
            tree2.rotateY(Math.PI/3)
            if (step2 === false){ showObject(scene, tree2); } else { scene.add( tree2 ); }
        }
        
        // ! this response comes from backend
        const step2_response = "Hello World!";
        
        // * create text => THIS IS GOING TO BE TRIGGERED BY USER CODE -STEP 2
        // const createText = (text, fontSize, textColor, hasSpeechBubble, hasTri, bubbleColor)
        if (step2 === true){ showText(createText(step2_response, 0.5, 0x171717, true, true, 0xffffff), scene, player) } 
        
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