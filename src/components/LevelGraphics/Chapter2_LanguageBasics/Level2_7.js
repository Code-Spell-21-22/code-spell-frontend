import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {resizeMovement, createMovement, rotationMovement, jumpingMovement} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createText, showText} from '../Builders/createText';
import {createDay} from '../Builders/createSky'
import {createPlayer} from '../Builders/createPlayer';

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;
var step1 = true; var step2 = false;

//* Branching Statements
const Level2_7 = () => {
 
    useEffect(() => {
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 8, 24, 0, 8, 0);
        scene = createScene();
        
        const day = createDay();
        day.position.set(10, 15, -30)
        scene.add(day)

        // spotlight /////////////////
        const spotLight = new THREE.SpotLight( 0xffffff, 1.2, -Math.PI );
        spotLight.position.set( 0, 40, -20 );

        const targetObject = new THREE.Object3D();
        targetObject.position.set(0, 20, -50)
        scene.add(targetObject);

        spotLight.target = targetObject;
        scene.add( spotLight );

        //////////////////////////////
        const player = createPlayer();
        player.position.set(0, 2, -12)
        scene.add(player); 

        const fruits = ["apple", "orange", "apple", "blueberry", "melon", "orange", "orange"];
        const fruitobjects = [];

        for (var f in fruits){

            var currfruit = fruits[f];
            switch(currfruit){
                case "apple":
                    currfruit = new THREE.Mesh(new THREE.SphereGeometry(0.50, 20, 20), new THREE.MeshPhongMaterial({color : 0xeb4034}))
                    currfruit.name = "apple";
                    break;
                case "orange":
                    currfruit = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 20), new THREE.MeshPhongMaterial({color : 0xf59031}))
                    currfruit.name = "orange";
                    break;
                case "blueberry":
                    currfruit = new THREE.Mesh(new THREE.SphereGeometry(0.30, 20, 20), new THREE.MeshPhongMaterial({color : 0x2d0770}))
                    currfruit.name = "blueberry";
                    break;
                case "melon":
                    currfruit = new THREE.Mesh(new THREE.SphereGeometry(0.70, 20, 20), new THREE.MeshPhongMaterial({color : 0xbfed61}))
                    currfruit.name = "blueberry";
                    break;
            }

            currfruit.position.set(-11.5+(f*3.8), 10, 0)
            fruitobjects.push(currfruit)
            scene.add(currfruit)
        }
        
         //* STEP1 -Write a for statement that iterates through the elements of variable fruits 
         //* and prints “Found an apple!” after finding the first “apple”. 
         //* Stop the loop with the break statement after finding the first “apple”.

        // ! this response comes from backend (will either return true or false if function is correct, also fruit used and print)
        var step1_response = [true, "apple", "Found an apple!"]

        if (step1 === true && step1_response[0] === true){

            for (var f in fruitobjects){
                const fruit = fruitobjects[f];
                if (fruit.name === step1_response[1]){
                    createMovement(player, fruit.position.x, 2, fruit.position.z-12, 1000, 3000)
                }
            }

            // rotationMovement(player, 3.5, 2, 600, 3000)
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
  
 export default Level2_7;