import * as THREE from "three";
const TWEEN = require('@tweenjs/tween.js')

let movements = [];
//[x,z] move to x(right/left) [y](up/down) or z(front/back))
export const createMovement = (obj, x, y, z, timeTo, delay) => {

    var targetPosition = new THREE.Vector3( x, y, z );
    var tween = new TWEEN.Tween( obj.position ).to( targetPosition, timeTo ); 

    movements.push(tween);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    movements[0].start(delay);
};

export const resizeMovement = (obj, x, y, z, timeTo, delay) => {

    var scaleTarget = new THREE.Vector3( x, y, z );
    var tween = new TWEEN.Tween( obj.scale ).to( scaleTarget, timeTo ); 

    movements.push(tween);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }
    
    movements[0].start(delay);
};

export const rotationMovement = (obj, fruit, y0, timeTo, delay) => {

    // var tween0 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( obj.position.x, y0, obj.position.z ), timeTo/5 ); 
    // var tween1 = new TWEEN.Tween( obj.rotation ).to({ y: "-" + 2*Math.PI}, timeTo);
    // var tween2 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( obj.position.x, y1, obj.position.z ), timeTo/5 ); 

    var tween1 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( fruit.position.x, y0, fruit.position.z ), timeTo )
        .onStart(function(){
            new TWEEN.Tween( obj.rotation ).to({ y: "-" + Math.PI}, timeTo).start() })
    
    var tween2 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( fruit.position.x, obj.position.y, fruit.position.z ), timeTo )
        .onStart(function(){
            new TWEEN.Tween( obj.rotation ).to({ y: "-" + Math.PI}, timeTo).start() })

    //movements.push(tween0);
    movements.push(tween1);
    movements.push(tween2);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    movements[0].start(delay);

}

export const jumpingMovement = () => {

}

export const transitionColor = (scene, hex, timeTo, delay) => {

    var newColor = new THREE.Color( hex );
    var tween = new TWEEN.Tween( scene.background ).to( newColor, timeTo ); 

    movements.push(tween);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    movements[0].start(delay);
};

export const transitionObjectColor = (obj, hex, timeTo, delay) => {

    var newColor = new THREE.Color( hex );
    var tween = new TWEEN.Tween( obj.material.color ).to( newColor, timeTo ); 

    movements.push(tween);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    movements[0].start(delay);
};

export const showObject = (scene, object) => {

    object.scale.set(0, 0, 0)
    scene.add(object)
    resizeMovement(object, 1, 1, 1, 1000, '+1000');
}

