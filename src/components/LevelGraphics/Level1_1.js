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
            const axesHelper = new THREE.AxesHelper( 10 );
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
    
            const all = new THREE.Group();
            ////////////////////////////////////////
            // Instantiate a loader
            // const gltfloader = new GLTFLoader();
    
            // // Load a glTF resource
            // gltfloader.load(
            //     // resource URL
            //    speechBubble,
            //     // called when the resource is loaded
            //     function ( gltf ) {
            //         gltf.scene.scale.set( 0.01, 0.01, 0.01 ) // scale here
            //         gltf.scene.position.set( -5.4, 6.2, 0 ) // scale here
            //         scene.add( gltf.scene );
            //     }
            // );          
            
            
            var fontloader = new FontLoader();
            fontloader.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {

                var textGeo = new TextGeometry( text, {
                    font: font,
                    size: 0.5,
                    height: 0,
                } );

                var final = new THREE.Mesh(  textGeo, new THREE.MeshPhongMaterial( { color: 0x171717 } ) );
                
                textGeo.computeBoundingBox();
                const center = textGeo.boundingBox.getCenter(new THREE.Vector3());
                const size = textGeo.boundingBox.getSize(new THREE.Vector3());
                
                final.position.set( -center.x, 6, 0.7 );
                all.add(final);
                                
                const speech = new THREE.Mesh( new THREE.BoxGeometry( 1, 1.5, size.x+1 ), new THREE.MeshBasicMaterial( {color: 0xFFFFFF} ));
                speech.rotateY( - Math.PI / 2 );
                speech.position.set( 0, 6.2, 0 ) // scale here
                all.add(speech)
    
                const shape = new THREE.Shape();

                const x = 0;
                const y = 0;

                shape.moveTo(x - 0.6, y );
                shape.lineTo(x + 0.6, y );
                shape.lineTo(x, y + 0.8);

                const TriangleGeometry = new THREE.ShapeGeometry(shape);

                const tri = new THREE.Mesh( TriangleGeometry, new THREE.MeshBasicMaterial( {color: 0xFFFFFF} ));
                tri.rotateZ(Math.PI);
                tri.position.set( 0, 5.6, 0 ) // scale here
                all.add(tri)
            
            } );
            

            all.position.set(0,0,0)
            scene.add(all)
           
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
            
           
        }
    
        // create camera and scene
        setScene();
        // add general light
        setLights();
        // add cube
        showCube();
        // add text
        showText("Hello, World!"); 
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