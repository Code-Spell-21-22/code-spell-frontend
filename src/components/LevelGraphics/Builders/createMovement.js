import * as THREE from "three";
const TWEEN = require('@tweenjs/tween.js')

let movements = [];
//[x,z] move to x(right/left) [y](up/down) or z(front/back))
export const createMovement = (obj, x, y, z, timeTo) => {

    var targetPosition = new THREE.Vector3( x, y, z );
    var tween = new TWEEN.Tween( obj.position ).to( targetPosition, timeTo ); 

    movements.push(tween);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    movements[0].start('+2000');
};