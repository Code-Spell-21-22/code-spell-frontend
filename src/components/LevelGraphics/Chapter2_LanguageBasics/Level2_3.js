import React, { useEffect, useRef, useState } from "react";

import * as THREE from "three";

import {
    createMovement,
    transitionColor,
    showObject,
    clearTweenMovements,
    moveToRight,
    moveToLeft, moveToFront, resizeMovement
} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createDay, createNight} from '../Builders/createSky';
import {createText, popUpText, showText} from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
import {addPopUpToChain, clearPopUpChain, startPopUpChain} from "../Builders/chainPopupTest";

const TWEEN = require('@tweenjs/tween.js')

// * The if-then and if-then-else Statements
const Level2_3 = (props) => {

    let renderer, camera, scene;

    let [analysisStatus, setAnalysisStatus] = useState(undefined);
    let [steps, setSteps] = useState(undefined);
    let [args, setArgs] = useState('');

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

        let stepsList;

        if (props.steps) {

            stepsList = [props.steps[0].successful, props.steps[1].successful, props.steps[2].successful];

            let allArgs = []
            allArgs.push(props.steps[0].args);
            allArgs.push(props.steps[1].args);
            allArgs.push(props.steps[2].args);

            setArgs(allArgs);

        }

        setSteps(stepsList);

    }, [props.steps]);

    // When the execution status props change we will update the steps and arguments
    useEffect(() => {
        setAnalysisStatus(props.analysisStatus);
    }, [props.analysisStatus]);

    // When the steps change, we clear the current animation and start again.
    useEffect(() => {
        clearAnimation();
        renderAnimation();
        startAnimation();
    }, [steps, analysisStatus, props.codeId]);

    const renderAnimation = () => {

        camera = createCamera(0, 7, 34, 0, 5, 0);
        scene = createNewScene();

        /////////////////////////////////////////////////////////////
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth / 3, window.innerHeight - window.innerHeight / 5);
        renderer.shadowMap.enabled = true;
        renderer.autoClear = true;
        renderer.resetState();

    };

    const clearAnimation = () => {

        let newThreeJsDiv = document.createElement("div");
        newThreeJsDiv.id = "three_js";

        let canvasElements = document.getElementsByTagName("canvas");

        if (canvasElements.length !== 0) {
            canvasElements[0].replaceWith(newThreeJsDiv, canvasElements[0]);
            canvasElements[0].remove();
        }

        clearTweenMovements();
        clearPopUpChain();

    };

    const createNewScene = () => {

        let scene = createScene(0x348C31, true);

        // SPOTLIGHT ///////////////////////////
        const spotLight = new THREE.SpotLight( 0xffffff, 3, -Math.PI );

        spotLight.position.set( 0, 13, 12 );

        const targetObject = new THREE.Object3D();
        targetObject.position.set(0, 2, -4)
        scene.add(targetObject);

        spotLight.target = targetObject;
        scene.add( spotLight );
        /////////////////////////////////////////

        let player = createPlayer();
        let day = createDay();

        player.position.set(0, 2, -11.75);

        showObject(scene, player, 1250);


        if (!steps && !analysisStatus) {

            showObject(scene, day, 1500)

            moveToFront(player, 6, () => {
                let text = createText("Hello!", 0.5, 0x171717, true, true, 0xffffff);
                popUpText(text, scene, player);
                targetObject.position.set(player.position.x+5, player.position.y+2, player.position.z+5)
            });

        } else if (!steps && analysisStatus) {

            showObject(scene, day, 1500)

            moveToFront(player, 6, () => {
                let text1 = createText("Your code doesn't seem correct...", 0.5, 0x171717, true, true, 0xffffff);
                let text2 = createText("Maybe you should look for syntax errors?", 0.5, 0x171717, true, true, 0xffffff);
                popUpText(text1, scene, player, () => {
                    popUpText(text2, scene, player);
                    targetObject.position.set(player.position.x+5, player.position.y+2, player.position.z+5)
                });
            });

        } else if (steps && steps[0] && steps[1] && steps[2]) {

            let stars = parseInt(props.steps[1].args[props.steps[1].args.length-1]);
            let night = createNight(stars);

            createMovement(day, 50, 0, 0, 1000, 0, () => {
                night.position.set(-300, 0, 0);
                transitionColor(scene, 0x142433, 1000, '+0')
                createMovement(night, 0, 0, 0, 2000, '+0')
                scene.add(night)
            });

            moveToFront(player, 6, () => {

                clearPopUpChain();

                props.steps[2].args.forEach(response => {
                    let text = createText(response, 0.5, 0x171717, true, true, 0xffffff);
                    addPopUpToChain(text, scene, player);
                });

                startPopUpChain();

                targetObject.position.set(player.position.x+5, player.position.y+2, player.position.z+5);

            });

        } else if (steps && steps[0] && steps[1]) {

            let stars = parseInt(props.steps[1].args[props.steps[1].args.length-1]);
            let night = createNight(stars);

            createMovement(day, 50, 0, 0, 1000, 0, () => {
                night.position.set(-300, 0, 0);
                transitionColor(scene, 0x142433, 1000, '+0')
                createMovement(night, 0, 0, 0, 2000, '+0')
                scene.add(night)
            });

            moveToFront(player, 6, () => {

                clearPopUpChain();

                props.steps[2].args.forEach(response => {
                    let text = createText(response, 0.5, 0x171717, true, true, 0xffffff);
                    addPopUpToChain(text, scene, player);
                });

                startPopUpChain();

                targetObject.position.set(player.position.x+5, player.position.y+2, player.position.z+5);

            });

        } else if (steps && steps[0]) {

            let stars = parseInt(props.steps[0].args[props.steps[0].args.length-1]);
            let night = createNight(stars);

            createMovement(day, 50, 0, 0, 1000, 0, () => {
                night.position.set(-300, 0, 0);
                transitionColor(scene, 0x142433, 1000, '+0')
                createMovement(night, 0, 0, 0, 2000, '+0')
                scene.add(night)
            });

            moveToFront(player, 6, () => {
                let text1 = createText("It's night but, is it a starry sky?", 0.5, 0x171717, true, true, 0xffffff);
                popUpText(text1, scene, player);
                targetObject.position.set(player.position.x+5, player.position.y+2, player.position.z+5)
            });

        }  else if (steps) {

            showObject(scene, day, 1500)

            moveToFront(player, 6, () => {
                let text = createText("Your code is not following this level constraints!", 0.4, 0x171717, true, true, 0xffffff);
                popUpText(text, scene, player);
                targetObject.position.set(player.position.x+5, player.position.y+2, player.position.z+5)
            });

        }

        return scene;


    };

    const startAnimation = () => {

        TWEEN.update()

        requestAnimationFrame(startAnimation)
        renderer.render(scene, camera)

        if (document.getElementById("three_js"))
            document.getElementById("three_js").parentNode.replaceChild(renderer.domElement, document.getElementById("three_js"));

    };

    return(
       <div id="three_js"></div>
    );

 };
  
 export default Level2_3;