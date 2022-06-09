import React, {useEffect, useState} from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {resizeMovement, showObject} from '../Builders/tweenMotions';
import {createText, showText} from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
import {createTree} from '../Builders/createItems'

const TWEEN = require('@tweenjs/tween.js')

// * Hello World
const Level1_1 = (props) => {

    let renderer, camera, scene, frame;

    let [executionStatus, setExecutionStatus] = useState(undefined);
    let [steps, setSteps] = useState(undefined);
    let [args, setArgs] = useState('');

    // Adding onWindowResize event when the component is mounted
    useEffect(() => {

        let onWindowResize = function () {
            camera.aspect = window.innerWidth / 3 / (window.innerHeight - window.innerHeight / 5);
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth / 3, window.innerHeight - window.innerHeight / 5);
        };
        window.addEventListener('resize', onWindowResize);


    }, []);

    // When the steps props change we will update the steps and arguments
    useEffect(() => {

        if (props.steps) {

            let stepsList = [props.steps[0].successful, props.steps[1].successful, props.steps[2].successful];

            setSteps(stepsList);
            setArgs(props.steps[2].args[0]);

        }

    }, [props.steps]);

    // When the execution status props change we will update the steps and arguments
    useEffect(() => {
        setExecutionStatus(props.executionStatus);
    }, [props.executionStatus]);

    // When the steps change, we clear the current animation and start again.
    useEffect(() => {
        clearAnimation();
        renderAnimation();
        startAnimation(0);
    }, [steps, executionStatus]);

    const renderAnimation = () => {

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
        const step2_response = args;

        // * create text => THIS IS GOING TO BE TRIGGERED BY USER CODE -STEP 2
        // const createText = (text, fontSize, textColor, hasSpeechBubble, hasTri, bubbleColor)

        if (step2 === true){ showText(createText(step2_response, 0.5, 0x171717, true, true, 0xffffff), scene, player) } 
        
        /*
        if (executionStatus && steps && steps[1]){
            const text =  createText(step2_response, 0.5, 0x171717, true, true, 0xffffff);
            text.scale.set(0, 0, 0)
            scene.add(text);
            resizeMovement(text, 1, 1, 1, 1000, '+2000');
        }
        */

        /////////////////////////////////////////////////////////////
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth / 3, window.innerHeight - window.innerHeight / 5);
        renderer.shadowMap.enabled = true;

    };

    const clearAnimation = () => {

        let newThreeJsDiv = document.createElement("div");
        newThreeJsDiv.id = "three_js";

        let canvasElements = document.getElementsByTagName("canvas");

        if (canvasElements.length !== 0) {
            canvasElements[0].replaceWith(newThreeJsDiv, canvasElements[0]);
            canvasElements[0].remove();
        }

    };

    const startAnimation = (time) => {

        let animationDuration = 1000;

        TWEEN.update(time)

        if (frame % animationDuration === 0) {
            console.log("Stopping animation")
            cancelAnimationFrame(frame+1);
            return;
        }

        frame = requestAnimationFrame(startAnimation)
        renderer.render(scene, camera)

        if (document.getElementById("three_js"))
            document.getElementById("three_js").parentNode.replaceChild(renderer.domElement, document.getElementById("three_js"));


    };

    return(
       <div id="three_js"></div>
    );

 };
  
 export default Level1_1;