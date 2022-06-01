import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createBlueprint, addBlueprintItems, addBlueprintLayout, buildBox} from '../Builders/createBlueprint';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createPlayer} from '../Builders/createPlayer';
import {createDay} from '../Builders/createSky'

let camera, scene, renderer;
var step1 = false; var step2 = false; var step3 = false; var step4 = false;

// * Objects
const Level3_2 = () => {
 
    useEffect(() => {

        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 8, 24, 0, 8, 0);
        scene = createScene();

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

        const day = createDay();
        day.position.set(10, 15, -30)
        scene.add(day)

        
    //* STEP1 - 

    // ! this response comes from backend
    var step1_response;
        
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

        var animate = function() { 
            requestAnimationFrame(animate);
            renderer.render( scene, camera ); 
        };

        animate();

    }, []);

    return(
       <div id="threejs"></div>
    );

 };
  
 export default Level3_2;