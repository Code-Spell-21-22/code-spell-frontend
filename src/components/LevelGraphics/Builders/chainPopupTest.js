import * as THREE from "three";
const TWEEN = require('@tweenjs/tween.js')

let chainedMovements = [];

export const addPopUpToChain = (text, scene, player) => {

    text.scale.set(0, 0, 0)
    text.position.set(player.position.x, player.position.y-2, player.position.z)
    scene.add(text)

    let scaleTarget = new THREE.Vector3( 1, 1, 1 );
    let scaleInvisible = new THREE.Vector3( 0, 0, 0 );

    let tween1 = new TWEEN.Tween( text.scale ).to( scaleTarget, 300 );
    let tween2 = new TWEEN.Tween( text.scale ).to( scaleTarget, 2000 );
    let tween3 = new TWEEN.Tween( text.scale ).to( scaleInvisible, 300 );

    chainedMovements.push(tween1);
    chainedMovements.push(tween2);
    chainedMovements.push(tween3);

    if (chainedMovements.length >= 2) {
        for (let i = 0; i < chainedMovements.length - 1; i++){
            chainedMovements[i].chain(chainedMovements[i+1]);
        }
    }

};

export const startPopUpChain = () => {
    if (chainedMovements.length > 0) {
        chainedMovements[0].start();
    }
}

export const clearPopUpChain = () => {
    chainedMovements = [];
}