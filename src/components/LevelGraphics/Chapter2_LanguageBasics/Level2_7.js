import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {resizeMovement, createMovement, rotationMovement, jumpingMovement} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createText, showText} from '../Builders/createText';
import {createDay} from '../Builders/createSky'
import {createPlayer} from '../Builders/createPlayer';

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;
var step1 = true; var step2 = true;

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
        player.position.set(0, 2, -4)
        scene.add(player); 

        const fruits = ["apple", "orange", "apple", "blueberry", "melon", "orange", "orange"];
        const fruitspositions = [-15, -10, -5, 0, 5, 10, 15];
        const fruitobjects = [];

        for (var f in fruits){

            var currfruit = fruits[f];
            switch(currfruit){
                case "apple":
                    currfruit = new THREE.Mesh(new THREE.SphereGeometry(0.75, 20, 20), new THREE.MeshPhongMaterial({color : 0xeb4034}))
                    currfruit.name = "apple";
                    break;
                case "orange":
                    currfruit = new THREE.Mesh(new THREE.SphereGeometry(0.80, 20, 20), new THREE.MeshPhongMaterial({color : 0xf59031}))
                    currfruit.name = "orange";
                    break;
                case "blueberry":
                    currfruit = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 20), new THREE.MeshPhongMaterial({color : 0x2d0770}))
                    currfruit.name = "blueberry";
                    break;
                case "melon":
                    currfruit = new THREE.Mesh(new THREE.SphereGeometry(0.95, 20, 20), new THREE.MeshPhongMaterial({color : 0xbfed61}))
                    currfruit.name = "melon";
                    break;
            }

            currfruit.position.set(fruitspositions[f], 12, -16)
            fruitobjects.push(currfruit)
            scene.add(currfruit)
        }
        
         //* STEP1 -Write a for statement that iterates through the elements of variable fruits 
         //* and prints “Found an apple!” after finding the first “apple”. 
         //* Stop the loop with the break statement after finding the first “apple”.

        // ! this response comes from backend (will either return true or false if function is correct, also fruit used and print)
        var step1_response = [true, "blueberry", "Found a blueberry!"]
       
        //* STEP2 - Write a new for statement that iterates through the elements of variable fruits and calls the method jump()
        //* if the element isn’t an “orange”. Use the continue statement to ignore the “orange”s.

       // ! this response comes from backend (will either return true or false if function is correct, also fruit)
       var step2_response = [true, "orange"]


        if (step1 === true && step1_response[0] === true){

            // andar para o 1º elemento do array
            createMovement(player, fruitobjects[0].position.x, 2, fruitobjects[0].position.z, 1000, 3000)

            // iterar cada elemento da lisra
            for (var f in fruitobjects){
                const fruit = fruitobjects[f];
                createMovement(player, fruit.position.x, 2, fruit.position.z, 1000, 3000)

                if (step2 === false){
                    if (fruit.name === step1_response[1]){
                        rotationMovement(player, fruit, 4, 2, 800, 2000)
    
                        const text = createText(step1_response[2], 0.8, 0x171717, true, true, 0xffffff)
                        text.scale.set(0, 0, 0)
                        text.position.set(fruit.position.x, player.position.y-2, fruit.position.z)
    
                        scene.add(text)
                        resizeMovement(text, 1, 1, 1, 1000, '+1000');
                        
                        break;
                    }
                } else if (step2 === true) {
                    if (fruit.name !== step2_response[1]){
                        rotationMovement(player, fruit, 4, 2, 800, 2000)
                    }
                }
            } 
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