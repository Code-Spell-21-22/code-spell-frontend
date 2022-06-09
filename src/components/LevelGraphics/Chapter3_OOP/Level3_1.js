import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createBlueprint, addBlueprintItems, addBlueprintLayout, buildBox} from '../Builders/createBlueprint';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {showObject} from '../Builders/createItems'
import {createPlayer} from '../Builders/createPlayer';

let camera, scene, renderer;
var step1 = false; var step2 = false; var step3 = false; var step4 = false;

// * Classes
const Level3_1 = () => {
 
    useEffect(() => {

        // create camera and scene
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 6, 35, 0, 6, 0 );
        scene = createScene();

        const player = createPlayer();
        player.position.set(8, 2, 12)
        scene.add(player);  
        if (step1 === false && step2 === false && step3 === false && step4 === false){ showObject(scene, player) } else { scene.add(player); }  


        if (step4 === false){     
            // ! this response is sent from backend
            // classname
            var step1_response = "SquareBox";
    
            if (step1 === true){
                // * create blueprint => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 1
                // createBlueprint = (class_name)
                const blueprint =  createBlueprint(step1_response);
                scene.add(blueprint) 
            }
    
            // ! this response is sent from backend
            // [material, weight, height, side]
            var step2_response = ["wood", 2.0, 4.0, 3.0];
    
    
            if (step2 === true && step3 === false){
                // * add blueprint items => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 2
                // addBlueprintItems = (material_type, weight_number, height_number, side_number)
                const blueprintItems =  addBlueprintItems(step2_response);
                scene.add(blueprintItems)
            } 
    
            // ! this response is sent from backend
            // [material, weight, height, side]
            var step3_response = ["wood", 2.0, 4.0, 3.0, "height*side*side"];
    
            if (step3 === true) {
                // * add blueprint layout => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 3
                // addBlueprintLayout = (material_type, weight_number, height_number, side_number, volume_formula)
                const blueprintLayout =  addBlueprintLayout(step3_response);
                scene.add(blueprintLayout)
            }
        }
        
         // ! this response is sent from backend
        //[ height, side, classname, boxname]
        var step4_response = [3.0, 4.0,  "BuildSquareBox", "box"];

        if (step4 === true) {
            // * build box => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 4
            // buildBox = (class_name, box_name)
            const box =  buildBox(step4_response);
            scene.add(box)
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
  
 export default Level3_1;