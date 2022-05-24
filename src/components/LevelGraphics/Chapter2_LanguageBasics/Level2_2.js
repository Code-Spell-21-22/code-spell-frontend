import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {createApple, createTree} from '../Builders/createItems';
import {createMovement} from '../Builders/createMovement';
import {createPlayer} from '../Builders/createPlayer';


const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;

var step1 = true; var step2 = false; var step3 = false; var step4 = false;

// * Variables
const Level2_1 = () => {
    
    useEffect(() => {
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 7, 34, 0, 4, 0);
        scene = createScene();
        
        // player
        const player = createPlayer();
        player.position.set(-8 ,2, 12)
        scene.add(player); 

        // friend
        const friend = createPlayer();
        friend.position.set(8 ,2 , 12)
        friend.material.color = new THREE.Color(0xffe603)
        scene.add(friend); 
        
        let apples = [];
        for (var i=1; i<=5; i++){ apples.push(createApple()); }
        
        for (var a in apples){
            apples[a].position.set( -3, 10, 16 ) 
            createMovement(apples[a], -3, a, 16, 500);
            scene.add(apples[a]);
        }

        const tree = createTree();
        scene.add(tree);


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
            requestAnimationFrame(animate);
            TWEEN.update(time)
            renderer.render( scene, camera ); 
        };

        animate();

    }, []);

    return(
       <div id="threejs"></div>
    );

 };
  
 export default Level2_1;