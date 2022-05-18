import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import speechBubble from "../../models/bubble/scene.glb"

var camera, scene, renderer, cube;

const Level1_1 = () => {
 
    useEffect(() => {
        
        var setScene = function () {
            camera = new THREE.PerspectiveCamera( 60, 0.9, 1, 2000 );
            camera.position.set( 0, 7, 24 );
            camera.lookAt( 0, 0, 0 );
            
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x2e78e1);
            
            // The X axis is red. The Y axis is green. The Z axis is blue.
            const axesHelper = new THREE.AxesHelper( 5 );
            // scene.add( axesHelper );
    
            // grid
            const gridHelper = new THREE.GridHelper( 60, 15 );
            scene.add( gridHelper );
    
            // plane
            const plane = new THREE.Mesh( new THREE.PlaneGeometry( 60, 60 ), new THREE.MeshBasicMaterial( { visible: true } ) );
            plane.rotateX( - Math.PI / 2 );
            plane.receiveShadow = true;
            scene.add( plane );
        }
    
        var showCube = function () {
            cube = new THREE.Mesh( new THREE.BoxGeometry( 4, 4, 4 ), new THREE.MeshPhongMaterial( { color: 'red'}  ));
            cube.position.set(0, 2, 0);
            cube.castShadow = true;
            scene.add(cube);
    
        }
    
        var showText = function (text){
    
            ////////////////////////////////////////
            // Instantiate a loader
            const gltfloader = new GLTFLoader();
    
            // Load a glTF resource
            gltfloader.load(
                // resource URL
               speechBubble,
                // called when the resource is loaded
                function ( gltf ) {
                    gltf.scene.scale.set( 0.008, 0.008, 0.008 ) // scale here
                    gltf.scene.position.set( -4, 5.8, 0 ) // scale here
                    scene.add( gltf.scene );
                    
                }
            );
            
            var fontloader = new FontLoader();
            fontloader.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {

                var textGeo = new TextGeometry( text, {
                    font: font,
                    size: 0.5,
                    height: 0,
                } );

                var final = new THREE.Mesh( textGeo, new THREE.MeshPhongMaterial( { color: 0x171717 } ) );
                final.position.set( -5.9, 5.6, 0.7 );

                scene.add( final );
            
            } );
           
        }
    
        var setLights = function (){
            // lights    
            const ambientLight = new THREE.AmbientLight( 0x606060 );
            scene.add( ambientLight );
        
            const directionalLight = new THREE.DirectionalLight( 0xffffff );
            directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
            scene.add( directionalLight );
        }
    
        var startRender = function () {
            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth / 3, window.innerHeight - window.innerHeight / 5);
            renderer.shadowMap.enabled = true;
        
            // const controls = new THREE.OrbitControls( camera, renderer.domElement );
            document.getElementById("threejs").parentNode.replaceChild(renderer.domElement, document.getElementById("threejs"));
            
            // if (document.getElementById("threejs") != null) {
                // document.getElementById("threejs").parentNode.replaceChild(renderer.domElement, document.getElementById("threejs"));
            // } else {
                // var div = document.createElement("div");
                // div.setAttribute("id", "threejs")
                // console.log(div);
            // }
        }
    
        // create camera and scene
        setScene();
        // add general light
        setLights();
        // add cube
        showCube();
        // add text
        showText('Hello, world!'); 
        // render everything
        startRender();


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
  
 export default Level1_1;