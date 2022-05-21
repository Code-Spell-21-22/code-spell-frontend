import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createScene, createCamera} from './createEnvironment';
import {createPlayer} from './createPlayer';
import {createBlueprint, addBlueprintItems, addBlueprintLayout, buildBox} from './createBlueprint';

let camera, scene, renderer;

const Level1_2 = () => {
 
    useEffect(() => {

        var step1 = false; var step2 = false; var step3 = false; var step4 = false;
        
        // create camera and scene
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 6, 20, 0, 6, 0 );
        scene = createScene();
    
        const player = createPlayer();
        player.position.set(8 ,2, -4)
        scene.add(player); 

        step4 = true; 
        if (step1 == true || step2 == true || step3 == true ){
            //! create blueprint => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 1
            // createBlueprint = (class_name)
            const blueprint =  createBlueprint("SquareBox");
            scene.add(blueprint) 
        }

        // ! this response is semt from backend
        var response = ["wood", 2.0, 3.0, 4.0];

        if (step2 == true){
            //! add blueprint items => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 2
            // addBlueprintItems = (material_type, weight_number, height_number, side_number)
            const blueprintItems =  addBlueprintItems(response);
            scene.add(blueprintItems)
        } else if (step3 == true) {
            //! add blueprint layout => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 3
            // addBlueprintLayout = (material_type, weight_number, height_number, side_number, volume_formula)
            const blueprintLayout =  addBlueprintLayout(response, "height*side*side");
            scene.add(blueprintLayout)
        } else if (step4 == true) {
            //! build box => THIS IS GOING TO BE TRIGGERED BY USER CODE - STEP 3
            // buildBox = (class_name, box_name)
            const box =  buildBox(response, "BuildSquareBox", "box");
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
  
 export default Level1_2;