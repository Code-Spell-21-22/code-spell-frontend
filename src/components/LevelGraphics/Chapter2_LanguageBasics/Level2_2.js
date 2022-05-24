import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createScene, createCamera} from '../Builders/createEnvironment';
import {createApple, loadApples, createTree} from '../Builders/createItems';
import {createMovement, resizeMovement} from '../Builders/tweenMotions';
import {createPlayer} from '../Builders/createPlayer';


const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;

var step1 = true; var step2 = true; var step3 = false;

// * Variables
const Level2_1 = () => {
    
    useEffect(() => {
        
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 7, 34, 0, 4, 0);
        scene = createScene();

        for (var i = 1; i<= 4; i++){
            var apple = createApple();
            apple.name = "friendapple_"+i;
            apple.position.set(3, 10, 17)
            apple.rotation.y += i*2
            scene.add(apple);
            createMovement(apple, 3, 2+i,17, 600, '+2000')
        }

    
        // ! this response is sent from backend
        var step1_response = 5;

        // STEP1
        if (step1 == true){
            for (var i = 1; i<= step1_response; i++){
                var apple = createApple();
                apple.name = "myapple_"+i;
                apple.position.set(-3, 10, 17)
                apple.rotation.y += i
                scene.add(apple);
                createMovement(apple, -3, 2+i,17, 600, '+5000')
            }
        }
        
        // ! this response is sent from backend, should be [step1_response, step1_response], if not, then it's numbers
        var step2_response = [5, 5];

        // STEP2
        if (step2 == true){
            // these 2 should match
            var step2_1 = step2_response[0];
            var step2_2 = step2_response[1];

            for (var i = 1; i<= step2_1; i++){;
                var apple = createApple();
                apple.name = "friendapple_"+ (i+4);
                apple.position.set(3, 18, 17)
                apple.rotation.y += i
                scene.add(apple);
                createMovement(apple, 3, 6+i, 17, 500, '+10000')
            }
            
            for (var i = 1; i<= step2_2; i++){
                resizeMovement((scene.getObjectByName("myapple_" + i)), 0, 0, 0, 500, '+10000')
            }
                
        }

        
        // player
        const player = createPlayer();
        player.position.set(-8 ,2, 12)
        scene.add(player); 

        // friend
        const friend = createPlayer();
        friend.position.set(8 ,2 , 12)
        friend.material.color = new THREE.Color(0xffe603)
        scene.add(friend); 
        

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