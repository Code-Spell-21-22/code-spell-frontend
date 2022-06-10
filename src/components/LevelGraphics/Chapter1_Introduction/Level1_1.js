import React, {useEffect, useState} from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {jumpingMovement, resizeMovement, rotationMovement, showObject} from '../Builders/tweenMotions';
import {createText, hideText, popUpText, showText} from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
import {createTree} from '../Builders/createItems'

const TWEEN = require('@tweenjs/tween.js')

let currentFrame = 1;

// * Hello World
const Level1_1 = (props) => {

    let renderer, camera, scene;

    let [executionStatus, setExecutionStatus] = useState(undefined);
    let [steps, setSteps] = useState(undefined);
    let [args, setArgs] = useState('');
    let [animationCount, setAnimationCount] = useState(0);

    // Adding onWindowResize event when the component is mounted
    useEffect(() => {

        let onWindowResize = function () {
            camera.aspect = window.innerWidth / 3 / (window.innerHeight - window.innerHeight / 5);
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth / 3, window.innerHeight - window.innerHeight / 5);
        };
        window.addEventListener('resize', onWindowResize);

    }, []);

    // When the steps props change we will update the steps and arguments
    useEffect(() => {

        if (props.steps) {

            let stepsList = [props.steps[0].successful, props.steps[1].successful, props.steps[2].successful];

            setSteps(stepsList);
            setArgs(props.steps[2].args);

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
        startAnimation();
    }, [steps, executionStatus]);

    const renderAnimation = () => {

        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 7, 34, 0, 5, 0);
        scene = createNewScene();

        /////////////////////////////////////////////////////////////
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth / 3, window.innerHeight - window.innerHeight / 5);
        renderer.shadowMap.enabled = true;
        renderer.autoClear = true;
        renderer.resetState();

        setAnimationCount(animationCount++);

    };

    const createNewScene = () => {

        let scene = createScene(0x348C31, true);

        scene.add(camera);

        // SPOTLIGHT ///////////////////////////
        const spotLight = new THREE.SpotLight( 0xffffff, 2, -Math.PI);

        spotLight.position.set( 0, 13, 0 );

        const targetObject = new THREE.Object3D();
        targetObject.position.set(0, 13, -200)
        scene.add(targetObject);

        spotLight.target = targetObject;
        scene.add( spotLight );
        /////////////////////////////////////////

        let player;
        // * create player => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 1

        let tree1 = createTree();
        tree1.position.x = 10;

        const tree2 = createTree();
        tree2.position.set(-6, 0, -15);
        tree2.rotateY(Math.PI/3)

        //showObject(scene, tree1, 750, '-' + (currentFrame));
        //showObject(scene, tree2, 750, '-' + (currentFrame*100));

        scene.add(tree1)
        scene.add(tree2)

        if (steps && steps[0]) {

            const step2_response = ['Hey', 'Hello', 'How are you?'];

            player = createPlayer();
            player.position.z = 12


            showObject(scene, player, 300, -10000*(animationCount-1));
            jumpingMovement(player, 3);

            if (steps[1]) {

                step2_response.forEach(response => {
                    let text = createText(response, 0.5, 0x171717, true, true, 0xffffff);
                    popUpText(text, scene, player);
                });

            }

        }

        return scene;

    }

    const clearAnimation = () => {

        let newThreeJsDiv = document.createElement("div");
        newThreeJsDiv.id = "three_js";

        let canvasElements = document.getElementsByTagName("canvas");

        if (canvasElements.length !== 0) {
            canvasElements[0].replaceWith(newThreeJsDiv, canvasElements[0]);
            canvasElements[0].remove();
        }

        animationCount++;

    };

    const startAnimation = () => {

        TWEEN.update()

        currentFrame = requestAnimationFrame(startAnimation)
        renderer.render(scene, camera)

        if (document.getElementById("three_js"))
            document.getElementById("three_js").parentNode.replaceChild(renderer.domElement, document.getElementById("three_js"));

    };

    return(
       <div id="three_js"></div>
    );

 };
  
 export default Level1_1;