import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import TWEEN from "../../lib/tween.umd"
 

let camera, scene, renderer, x, z, cube;

let movements = [];

const ThreeCube = () => {
 const cubeRef = useRef(null);
 useEffect(() => {
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 0, 25, 30 );
    camera.lookAt( 0, 0, 0 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03b6fc);

// init();
// animate();

// function init() {
    // helper    
    // The X axis is red. The Y axis is green. The Z axis is blue.
    const axesHelper = new THREE.AxesHelper( 5 );
    //scene.add( axesHelper );
    
    // cube
    const cubeGeo = new THREE.BoxGeometry( 4, 4, 4 );
    const cubeMaterial = new THREE.MeshPhongMaterial( { color: 0x262829} );
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
    // path 
    // (x,z) > +x (left) / -x (right) || +z (back) / -z (front)
    createMovement(1, 0);
    // createMovement(1, -3);
    // createMovement(2, -3)


    // lights
    
    const ambientLight = new THREE.AmbientLight( 0x606060 );
    scene.add( ambientLight );
    
    const directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    scene.add( directionalLight );


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize );    

    var onWindowResize = function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        animate();

    };

//[x,z] move to x(right/left) or z(front/back))
    var createMovement = function (x, z){

        x = x*4;
        z = z*4;
        var targetPosition = new THREE.Vector3( x, 2, z );
        var tween = new TWEEN.Tween( cube.position ).to( targetPosition, 1000 ); 

        movements.push(tween);

        if (movements.length >= 2) {
            for (let i = 0; i < movements.length - 1; i++){
                movements[i].chain(movements[i+1]);
            }
        }

        movements[0].start();
        
    };

    var animate = function() { 
        requestAnimationFrame(animate);
        TWEEN.update();
        renderer.render( scene, camera ); 
    };

    animate();
 }, []);

 return (
    <>
      <div ref={cubeRef}></div>
    </>
  );
 };
  
 export default ThreeCube;