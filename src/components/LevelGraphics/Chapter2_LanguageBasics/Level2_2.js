import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createMovement, resizeMovement, showObject} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createText, showText}  from '../Builders/createText';
import {createPlayer} from '../Builders/createPlayer';
import {createTree} from '../Builders/createItems';

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;

var step1 = false; var step2 = false; var step3 = false;

let myapples = []
let friendapples = []

// * Variables
const Level2_1 = () => {
    
    useEffect(() => {

        const point = new THREE.Object3D(new THREE.Vector3());
        
        // create camera and scene
        // this is default camera 
        //createCamera = (posx, posy, posz, lx, ly, lz) - pos (camera position), - l (camera lookAt)
        camera = createCamera(0, 7, 34, 0, 4, 0);
        scene = createScene();

        // SPOTLIGHT ///////////////////////////
        const spotLight = new THREE.SpotLight( 0xffffff, 3, -Math.PI );
    
        spotLight.position.set( 0, 13, 12 );
    
        const targetObject = new THREE.Object3D();
        targetObject.position.set(0, 13, -10)
        scene.add(targetObject);
    
        spotLight.target = targetObject;
        scene.add( spotLight );
        /////////////////////////////////////////
        
        // player
        const player = createPlayer();
        player.position.set(-8 ,2, 12)
        if (step1 === false && step2 === false && step3 === false){ showObject(scene, player) } 
        else { scene.add(player); } 

        // friend
        const friend = createPlayer();
        friend.position.set(8 ,2 , 12)
        friend.material.color = new THREE.Color(0xffe603)
        if (step1 === false && step2 === false && step3 === false){ showObject(scene, friend) } 
        else { scene.add(friend); } 
        

        const tree = createTree();
        if (step1 === false && step2 === false && step3 === false){ showObject(scene, tree) } 
        else { scene.add(tree);  }


        for (var i = 0; i< 4; i++){
            var apple = new THREE.Mesh(new THREE.SphereGeometry(0.45, 20, 20), new THREE.MeshPhongMaterial({color : 0xb50000}));
            apple.name = "friendapple_"+i;
            apple.rotation.y += i
            friendapples.push(apple)

            if (step1 === false){
                apple.position.set(3, 16, 17)
                scene.add(apple);
                createMovement(apple, 3, 1+i, 17, 400, '+2000')
            
            } else if (step1 === true){
                apple.position.set(3, 1+i, 17)
                scene.add(apple);
            }

        }

    
        // STEP1 - Add 5 to the variable myApples. Avoid using the assignment operator
        // ! this response is sent from backend, should be myApples
        var step1_response = 5; // 5 is the correct number to pass the goal

        if (step1 === true){
            for (var i = 0; i< step1_response; i++){
                var apple = new THREE.Mesh(new THREE.SphereGeometry(0.45, 20, 20), new THREE.MeshPhongMaterial({color : 0xb50000}));
                apple.name = "myapple_"+i;
                apple.rotation.y += i
                myapples.push(apple)

                if (step2 === false){
                    apple.position.set(-3, 20, 17)
                    scene.add(apple);
                    createMovement(apple, -3, 1+i, 17, 400, '+2000')
                    
                } else if (step2 === true){
                    apple.position.set(-3, 1+i, 17)
                    scene.add(apple);
                }
            }


            if (step1_response !== 5 ){  // meaning not correct number to pass the goal
                point.position.set(0, 5, 15)
                const text = createText("Wrong values for this step, try again!", 0.36, 0xb50000, true, false, 0xffffff)
                showText(text, scene, point)
                for (var a in myapples){ resizeMovement(myapples[a], 0, 0, 0, 500, '+2000') ; }
                for (var a=0; a < step1_response; a++){ myapples.pop(); }
                resizeMovement(text, 0, 0, 0, 1000, '2000')
            }
        }
        
        // STEP2 - friendApples += myApples; myApples -= myApples;
        // ! this response is sent from backend, should be [myApples, myApples], if not, then it's numbers
        var step2_response = [5, 5];

        if (step2 === true){

            var initial_myapples = myapples.length;
            var initial_friendapples = friendapples.length;

            // these 2 should match
            var step2_1 = step2_response[0];
            var step2_2 = step2_response[1];

            // Add the value of variable myApples to variable friendsApples
            for (var i = 0; i< step2_1; i++){;
                var apple = new THREE.Mesh(new THREE.SphereGeometry(0.45, 20, 20), new THREE.MeshPhongMaterial({color : 0x98eb34}));
                apple.name = "friendapple_"+ (i+4);
                apple.rotation.y += i
                friendapples.push(apple)

                if (step3 === false){
                    apple.position.set(3, 18, 17)
                    scene.add(apple);
                    createMovement(apple, 3, 5+i, 17, 600, '+2000')
                    
                } else if (step3 == true ){
                    apple.position.set(3, 5+i, 17)
                    scene.add(apple);

                    for (var a=0; a < initial_myapples; a++){ scene.remove(scene.getObjectByName("myapple_" + a)); }
                }
            }
            
            var text;
            if (step3 === false){   // Subtract that same value from the variable myApples
                if (initial_myapples >= step2_2){   // pode subtrair mas dps check se sao igual ou menos
                    for (var i = initial_myapples-1; i >= initial_myapples-step2_2; i--){ 
                        var thisapple = scene.getObjectByName("myapple_" + i)
                        resizeMovement(thisapple, 0, 0, 0, 500, '+2000') ;
                        myapples.pop()
                    }

                    if (initial_myapples > step2_2){    // tirou o numero errado, volta a meter as maças

                        point.position.set(0, 9, 15)
                        text = createText("Wrong values for this step, try again!", 0.32, 0xb50000, true, false, 0xffffff)
                        text.rotation.x += 0.3;
                        showText(text, scene, point)

                        for (var i = initial_myapples-step2_2; i < initial_myapples; i++){
                            var apple = new THREE.Mesh(new THREE.SphereGeometry(0.45, 20, 20), new THREE.MeshPhongMaterial({color : 0xb50000}));
                            apple.name = "myapple_"+i;

                            apple.rotation.y += i
                            myapples.push(apple)
                            
                            apple.position.set(-3, 20, 17)
                            scene.add(apple);
                            createMovement(apple, -3, 1+i, 17, 800, '+2000')
                        }
                            
                    }

                } else {    // subtrai myapples mas é pq myapples < step2_2
                    for (var i = initial_myapples-1; i >= 0; i--){ 
                        var thisapple = scene.getObjectByName("myapple_" + i)
                        resizeMovement(thisapple, 0, 0, 0, 500, '+2000') ;
                        myapples.pop()
                    }
                }
                }
            
            if ((step2_1 === step2_2) && (step2_1 === initial_myapples) && (step2_2 === initial_myapples)) { // step2 goal achieved
                for (var a=0; a < initial_myapples; a++){ myapples.pop(); }     

            } else if ((step2_1 !== step2_2) || (step2_1 !== initial_myapples) || (step2_2 !== initial_myapples)) { // step2 goal not achieved
                
                for (var a=step2_1+initial_friendapples-1; a >= initial_friendapples; a--){ 
                    resizeMovement(friendapples[a], 0, 0, 0, 500, '+2000') ; 
                }
                for (var a=0; a < step2_1; a++){ friendapples.pop(); }
                resizeMovement(text, 0, 0, 0, 1000, '2000')
            }
                
        }

        // STEP3 - int extraApples = friendApples % 2; friendApples = 0;

        // ! this response is sent from backend, should be [1, 0] (?) aqui tmb devia passar o sinal q ele mete (+, -, *, %)
        var step3_response = [2, 2];

        if (step3 === true){
            
            var initial_friendapples = friendapples.length;
            
            var extra_apples = initial_friendapples - (initial_friendapples-step3_response[0]);
            point.position.set(0, -3, 12.2)
            const extra = createText("extraApples", 0.4, 0xffffff, true, false, 0x171717)
            extra.rotation.x -= 0.5
            showText(extra, scene, point)

            for (var i = 0; i< extra_apples; i++){
                var apple = new THREE.Mesh(new THREE.SphereGeometry(0.45, 20, 20), new THREE.MeshPhongMaterial({color : 0xbbc95d}));
                apple.name = "extraapple_"+i;
                apple.rotation.y += i
                apple.position.set(0, 20, 17)
                scene.add(apple);
                createMovement(apple, 0, 1+i, 17, 400, '+2000')
            }

            if (step3_response[1] > initial_friendapples){   // se sao mais aumenta maças
                for (var i = (step3_response[1] - initial_friendapples-1); i>=0 ; i--){;
                    var apple = new THREE.Mesh(new THREE.SphereGeometry(0.45, 20, 20), new THREE.MeshPhongMaterial({color : 0x98eb34}));
                    apple.name = "friendapple_"+ (i+initial_friendapples);
                    apple.rotation.y += i
                    apple.position.set(3, 18, 17)
                    scene.add(apple);
                    createMovement(apple, 3, 1+(i+initial_friendapples), 17, 600, '+2000')
                }

            } else if (step3_response[1] < initial_friendapples){    // se sao menos, diminui
                for (var i = initial_friendapples -1; i >= step3_response[1]; i--){ 
                    var thisapple = scene.getObjectByName("friendapple_" + i)
                    resizeMovement(thisapple, 0, 0, 0, 300, '+2000') ;
                }
            }
            for (var a=0; a < (initial_friendapples-step3_response[1]); a++){friendapples.pop(); }     
            
            if (step3_response[1] !== 0 ) { // errado -- tirar extrapple e meter de novo 9 maças
                point.position.set(0, 9, 15)
                text = createText("Wrong values for this step, try again!", 0.32, 0xb50000, true, false, 0xffffff)
                text.rotation.x += 0.3;
                showText(text, scene, point)

                for (var i = extra_apples-1; i>= 0; i--){   // delete extra apples
                    var extraapple = scene.getObjectByName("extraapple_" + i)
                    resizeMovement(extraapple, 0, 0, 0, 800, '+2000') ;
                }
                resizeMovement(extra, 0, 0, 0, 600, '+2000') ;  // remove extra text
                
                // put back friendapples
                for (var i = step3_response[1]; i< initial_friendapples ; i++){;
                    var apple = new THREE.Mesh(new THREE.SphereGeometry(0.45, 20, 20), new THREE.MeshPhongMaterial({color : 0x98eb34}));
                    apple.name = "friendapple_"+ i;
                    apple.rotation.y += i
                    apple.position.set(3, 18, 17)
                    scene.add(apple);
                    createMovement(apple, 3, 1+i, 17, 600, '+2000')
                }
                resizeMovement(text, 0, 0, 0, 300, '+2000') ;  // remove extra text

            }
        }

        // just text
        var friendText = createText("friendApples", 0.25, 0xffffff, true, false, 0x171717)
        friendText.rotation.x -= 0.5
        var myText = createText("myApples", 0.25, 0xffffff, true, false, 0x171717)
        myText.rotation.x -= 0.5

        if (step1 === false && step2 === false && step3 === false){ 
            point.position.set(friend.position.x-5, friend.position.y-5, friend.position.z+12.2)
            showText(friendText, scene, point)
    
            point.position.set(player.position.x+5, player.position.y-5, player.position.z+12.2)
            showText(myText, scene, point)
        } else {
            friendText.position.set(friend.position.x-5, friend.position.y-7, friend.position.z+12.2)
            scene.add(friendText)

            myText.position.set(player.position.x+5, player.position.y-7, player.position.z+12.2)
            scene.add(myText)
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