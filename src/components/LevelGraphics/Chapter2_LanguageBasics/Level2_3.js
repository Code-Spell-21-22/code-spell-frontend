import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {createDay, createNight} from '../Builders/createSky';
import {createPlayer} from '../Builders/createPlayer';
import {createText} from '../Builders/createText';

let camera, scene, renderer;
var step1 = true; var step2 = true; var step3 = true;

// * The if-then and if-then-else Statements
const Level2_3 = () => {
 
    useEffect(() => {
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 7, 34, 0, 4, 0);
        scene = createScene();
        
        const player = createPlayer();
        player.position.set(0 ,2, 12)
        scene.add(player); 

        /* 
        boolean day = true;
        int stars;

        if (day) {
            stars = 0;
            dayTime();
        } else {
            stars = 10;
            nightTime();  
        }

        */



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
  
 export default Level2_3;