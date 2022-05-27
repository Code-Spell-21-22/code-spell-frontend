import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import {createMovement, resizeMovement} from '../Builders/tweenMotions';
import {createScene, createCamera} from '../Builders/createEnvironment';
import {createApple, createTree} from '../Builders/createItems';
import {createPlayer} from '../Builders/createPlayer';
import {createText} from '../Builders/createText';

const TWEEN = require('@tweenjs/tween.js')

let camera, scene, renderer;

var step1 = true; var step2 = true; var step3 = true;

let myapples = []
let friendapples = []

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
        

        const tree = createTree();
        scene.add(tree);


        for (var i = 0; i< 4; i++){
            var apple = createApple(0xb50000);
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
                var apple = createApple(0xb50000);
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
            
            // var loop = myapples.length;

            // if (myapples.length !== 5 ){  // meaning not correct number to pass the goal
            //     console.log("not correct number of apples: " + myapples.length)
                
            //     for (var a in myapples){ resizeMovement(myapples[a], 0, 0, 0, 500, '+2000') ; }    // make them disappear
            //     for (var a=0; a < loop; a++){ myapples.pop(); }

            // } else { 
            if (myapples.length === 5 ){ console.log("step1 successful") }
    
        }
        
        // STEP2 - friendApples += myApples; myApples -= myApples;
        // ! this response is sent from backend, should be [myApples, myApples], if not, then it's numbers
        var step2_response = [5, 5];

        if (step2 === true){

            var initial_myapples = myapples.length;
            var initial_friendapples = friendapples.length;
            //console.log(initial_myapples, initial_friendapples)


            // these 2 should match
            var step2_1 = step2_response[0];
            var step2_2 = step2_response[1];

            // Add the value of variable myApples to variable friendsApples
            for (var i = 0; i< step2_1; i++){;
                var apple = createApple(0x98eb34);
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
            
            if (step3 === false){
                // Subtract that same value from the variable myApples
                for (var i = 0; i< step2_2; i++){ 
                    var thisapple = scene.getObjectByName("myapple_" + i)
                    resizeMovement(thisapple, 0, 0, 0, 500, '+2000') ;
                    myapples.pop()
                }
            }
            
            if ((step2_1 === step2_2) && (step2_1 === initial_myapples) && (step2_2 === initial_myapples)) { // step2 goal achieved
                
                console.log("step2 successful"); 
                for (var a=0; a < initial_myapples; a++){ myapples.pop(); }

            } 
            // else if ((step2_1 === step2_2) || (step2_1 === initial_myapples) || (step2_2 === initial_myapples)) { // step2 goal not achieved
                
            //     console.log("not correct calculation, try again") 
            //     // need to put back myapples = 5 and friendapples = 4

            //     var curr_myapples = myapples.length;
            //     var curr_friendapples = friendapples.length;
            //     console.log(curr_myapples, curr_friendapples)

            //     if (curr_friendapples !== initial_friendapples) { // 
            //         for (var a=0; a < (curr_friendapples-initial_friendapples); a++){ friendapples.pop(); }
            //     }
            // }   
                
        }

        // STEP3 - int extraApples = friendApples % 2; friendApples = 0;

        // ! this response is sent from backend, should be [1, 0] (?) aqui tmb devia passar o sinal q ele mete (+, -, *, %)
        var step3_response = [1, 1];

        
        if (step3 === true){
            var step3_1 = step3_response[0];
            var step3_2 = step3_response[1];
            
            var initial_friendapples = friendapples.length;
            
            var extra_apples = initial_friendapples - (initial_friendapples-step3_1);
           
            const extra_apples_text =  createText("extraApples: " + extra_apples, 0.4, 0xffffff, true, false, 0x383838);
            extra_apples_text.position.set(0, 9, 12)
            scene.add(extra_apples_text);

            for (var i = 0; i< extra_apples; i++){
                var apple = createApple(0xbbc95d);
                apple.name = "extraapple_"+i;
                apple.rotation.y += i
                apple.position.set(0, 20, 17)
                scene.add(apple);
                createMovement(apple, 0, 1+i, 17, 400, '+2000')
            }

            console.log(step3_2, initial_friendapples)
            if (step3_2 > initial_friendapples){   // se sao mais aumenta maças
                for (var i = 0; i< (step3_2 - initial_friendapples); i++){;
                    var apple = createApple(0x98eb34);
                    apple.name = "friendapple_"+ (i+initial_friendapples);
                    apple.rotation.y += i
                    apple.position.set(3, 18, 17)
                    scene.add(apple);
                    createMovement(apple, 3, 1+(i+initial_friendapples), 17, 600, '+2000')
                }

            } else if (step3_2 < initial_friendapples){    // se sao menos, diminui
                for (var i = 0; i< (initial_friendapples - step3_2); i++){ 
                    var thisapple = scene.getObjectByName("friendapple_" + ((initial_friendapples-1)-i ))
                    resizeMovement(thisapple, 0, 0, 0, 200, '+2000') ;
                }
            }

            for (var a=0; a < (initial_friendapples-step3_2); a++){friendapples.pop(); }            
            console.log("step3 complete")
        }

        const friendapples_text =  createText("myApples: " + myapples.length, 0.4, 0xffffff, true, false, 0x383838);
        friendapples_text.position.set(-6, 9, 12)
        scene.add(friendapples_text)

        const myapples_text =  createText("friendApples: " + friendapples.length, 0.4, 0xffffff, true, false, 0x383838);
        myapples_text.position.set(6, 9, 12)
        scene.add(myapples_text)

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