import React, {useEffect, useState} from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {resizeMovement} from '../Builders/tweenMotions';
import {createPlayer} from '../Builders/createPlayer';
import {createText} from '../Builders/createText';

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
        // createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 7, 24, 0, 0, 0);
        scene = createScene();

        // * create player => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 1
        if (executionStatus && steps && steps[0]) {
            const player = createPlayer();
            scene.add(player);
        }

        // ! this response comes from backend
        const step2_response = args;

        // * create text => THIS IS GOING TO BE TRIGGERED BY USER CODE -STEP 2
        // const createText = (text, fontSize, textColor, hasSpeechBubble, hasTri, bubbleColor)
        if (executionStatus && steps && steps[1]){
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