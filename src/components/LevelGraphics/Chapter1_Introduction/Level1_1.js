import React, {useEffect, useMemo, useState} from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {
    clearTweenMovements,
    jumpingMovement, moveToLeft, moveToRight,
} from '../Builders/tweenMotions';
import {createText, popUpText} from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
import {createTree} from '../Builders/createItems'
import {addPopUpToChain, clearPopUpChain, startPopUpChain} from "../Builders/chainPopupTest";

const TWEEN = require('@tweenjs/tween.js')

// * Hello World
const Level1_1 = (props) => {

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
            setArgs(props.steps[2].args);
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

    };

    const createNewScene = () => {

        let scene = createScene( 0x348C31, true);

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

        player = createPlayer();
        player.position.z = 12
        player.position.x = -16

        scene.add(player);

        if (steps && steps[0] && steps[1]) {

            const step2_response = args;

            moveToRight(player, 3, () => {
                jumpingMovement(player, 3, true, () => {

                    if (steps[2]) {

                        clearPopUpChain();

                        step2_response.forEach(response => {
                            let text = createText(response, 0.5, 0x171717, true, true, 0xffffff);
                            addPopUpToChain(text, scene, player);
                        });

                        startPopUpChain();

                    } else {

                        let text = createText("?????", 0.5, 0x171717, true, true, 0xffffff);
                        popUpText(text, scene, player);

                    }

                });
            });

        } else if (steps && steps[0]) {

            moveToRight(player, 3, () => {
                let text1 = createText("Something is not right...", 0.5, 0x171717, true, true, 0xffffff);
                popUpText(text1, scene, player, () => {
                    moveToLeft(player, 3);
                });
            });

        } else if (!steps && !analysisStatus) {

            moveToRight(player, 3, () => {
                let text = createText("Hello!", 0.5, 0x171717, true, true, 0xffffff);
                popUpText(text, scene, player, () => {
                    moveToLeft(player, 3);
                });
            });

        }  else if (!steps && analysisStatus) {

            moveToRight(player, 3, () => {
                let text1 = createText("Your code doesn't seem correct...", 0.5, 0x171717, true, true, 0xffffff);
                let text2 = createText("Maybe you should look for syntax errors?", 0.5, 0x171717, true, true, 0xffffff);
                popUpText(text1, scene, player, () => {
                    popUpText(text2, scene, player, () => {
                        moveToLeft(player, 3);
                    });
                });
            });

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

        clearTweenMovements();
        clearPopUpChain();

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
  
 export default Level1_1;