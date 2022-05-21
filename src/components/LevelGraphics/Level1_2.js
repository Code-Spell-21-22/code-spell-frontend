import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createScene, createCamera} from './createEnvironment';
import {createPlayer} from './createPlayer';
import {createBlueprint} from './createBlueprint';
import {createText} from './createText';

let camera, scene, renderer;

const Level1_2 = () => {
 
    useEffect(() => {
        
        // create camera and scene
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 6, 20, 0, 6, 0 );
        scene = createScene();
    
        const player = createPlayer();
        player.position.set(8 ,2, -4)
        scene.add(player); 

        // create blueprint => THIS IS GOING TO BE TRIGGERED BY USER CODE
        const blueprint =  createBlueprint("SquareBox");
        scene.add(blueprint)
        
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
  
 export default Level1_2;