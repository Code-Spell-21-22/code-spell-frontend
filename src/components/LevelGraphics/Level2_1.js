import React, { useEffect, useRef } from "react";
import * as THREE from "three";
 

var camera, scene, renderer, x, z, cube;

const Level2_1 = () => {
 
    // const cubeRef = useRef(null);

    useEffect(() => {
        
        camera = new THREE.PerspectiveCamera( 60, 0.9, 1, 2000 );
        camera.position.set( 0, 25, 30 );
        camera.lookAt( 0, 0, 0 );

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x03b6fc);

        // The X axis is red. The Y axis is green. The Z axis is blue.
        const axesHelper = new THREE.AxesHelper( 5 );
        //scene.add( axesHelper );
        
        // cube
        const cubeGeo = new THREE.BoxGeometry( 4, 4, 4 );
        const cubeMaterial = new THREE.MeshPhongMaterial( { color: 'red'} );
        cube = new THREE.Mesh( cubeGeo, cubeMaterial );
        cube.position.set(0, 2, 0);
        

        cube.castShadow = true;
        scene.add(cube);
        
        // grid
        const gridHelper = new THREE.GridHelper( 60, 15 );
        scene.add( gridHelper );

        // plane
        const geometryPlane = new THREE.PlaneGeometry( 60, 60 );
        geometryPlane.rotateX( - Math.PI / 2 );
        const plane = new THREE.Mesh( geometryPlane, new THREE.MeshBasicMaterial( { visible: true } ) );
        plane.receiveShadow = true;
        scene.add( plane );

        const geometry = new THREE.PlaneGeometry( 4, 4 );
        geometry.rotateX( - Math.PI / 2 );
    

        // lights    
        const ambientLight = new THREE.AmbientLight( 0x606060 );
        scene.add( ambientLight );
        
        const directionalLight = new THREE.DirectionalLight( 0xffffff );
        directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
        scene.add( directionalLight );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth / 3, window.innerHeight - window.innerHeight / 5);
        renderer.shadowMap.enabled = true;

        document.body.appendChild( renderer.domElement );
        document.getElementById("threejs").parentNode.replaceChild(renderer.domElement, document.getElementById("threejs"));

        const start = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: true } ) );
        start.translateY(0.01);
        start.material.color.setHex(0xfeffd1)
        scene.add( start );

        const end = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: true } ) );
        end.translateY(0.01);
        end.translateX(8);
        end.translateZ(-12);
        end.material.color.setHex(0xfeffd1)
        scene.add( end );


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
  
 export default Level2_1;