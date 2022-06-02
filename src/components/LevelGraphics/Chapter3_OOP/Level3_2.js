import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createMovement, resizeMovement} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createText, showText} from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
import {createTree} from "../Builders/createItems";
import {createDay} from '../Builders/createSky'

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;
var step1 = true; var step2 = true; var step3 = true; var step4 = true;

// * Objects
const Level3_2 = () => {
 
    useEffect(() => {

        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 6, 24, 0, 8, 0);
        scene = createScene();

        // spotlight /////////////////
        const spotLight = new THREE.SpotLight( 0xffffff, 3, -Math.PI );
        spotLight.position.set( -10, 20, 0 );

        const targetObject = new THREE.Object3D();
        targetObject.position.set(0, 20, -20)
        scene.add(targetObject);

        spotLight.target = targetObject;
        scene.add( spotLight );
        //////////////////////////////

        const player = createPlayer();
        player.position.set(0, 2, 0)
        scene.add(player);  

        const day = createDay();
        day.position.set(-20, 25, -30)
        scene.add(day)

        const tree = createTree();
        tree.position.set(12 , 0, -12) 
        tree.scale.set(1.3, 1.3, 1.3)
        scene.add(tree);
        

        const apple = new THREE.Mesh(new THREE.SphereGeometry(0.65, 20, 20), new THREE.MeshPhongMaterial({color : 0xb50000}))
        const platform = new THREE.Mesh( new THREE.BoxGeometry( 2, 0.5, 0.5 ), new THREE.MeshBasicMaterial( {color: 0x141414}));
    
        //* STEP1 - Create a new instance of Apple with weight equal to 1.2d.

        if (step1=== true && step2 === false && step3 === false && step4 === false ){
            // platform movement
            platform.position.set(-16, 4.1, 0)
            scene.add(platform);
            createMovement(platform, -4, 4.1, 0, 800, '+2000')
            
            // apple movement
            apple.position.set(-4, 24, 0)
            scene.add(apple);
            createMovement(apple, -4, 5, 0, 800, '+2000')

        } else {
            // aplle shows still
            apple.position.set(-4, 5, 0)
            scene.add(apple);
            platform.position.set(-4, 4.1, 0)
            scene.add(platform);

        }


        //* STEP2 - Print the color of the apple to standard output.

        // ! this response comes from backend
        var step2_response = "red";

        if (step2 === true && step3 === false && step4 === false){
            showText(createText(step2_response, 0.6, 0x141414, true, true, 0xffffff), scene, player)
        }

        //* STEP3 - Print the weight of the apple to standard output.

        // ! this response comes from backend
        var step3_response = "1.2d";

        if (step3 === true && step4 === false){
            showText(createText(step3_response, 0.6, 0x141414, true, true, 0xffffff), scene, player)
        }

        //* STEP4 - Call the method bite() to take a bite of the apple.

        if (step4 === true) {
            var resize = [0.8, 0.5, 0.2, 0]
            const group = new THREE.Group()
            for (var s in resize){ 
                createMovement(group, 0, group.position.y, group.position.z, 500, "+1000")
                resizeMovement(apple, resize[s], resize[s], resize[s], 500, "+1000") 
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
  
 export default Level3_2;