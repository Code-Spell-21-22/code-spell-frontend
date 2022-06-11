import * as THREE from "three";
const TWEEN = require('@tweenjs/tween.js')

let movements = [];

export const clearTweenMovements = () => {
    movements = []
};

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

export const moveToFront = (player) => {

    let tween1 = new TWEEN.Tween( player.rotation ).to({ x: Math.PI/2}, 300)
        .onStart(function() {
            new TWEEN.Tween( player.position ).to(new THREE.Vector3( player.position.x, player.position.y, player.position.z+2 ), 300).start()
            player.position.set(player.position.x, player.position.y, player.position.z+2)
        })
        .onRepeat(function() {
            new TWEEN.Tween( player.position ).to(new THREE.Vector3( player.position.x, player.position.y, player.position.z+2 ), 300).start()
            player.position.set(player.position.x, player.position.y, player.position.z+2)
        });

    let tween2 = new TWEEN.Tween(player.position).to(new THREE.Vector3( player.position.x, player.position.y, player.position.z ), 1000).start();

    movements.push(tween1);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    tween1.chain(tween2);
    tween1.repeat(5);

}

export const moveToRight = (player, times, onComplete) => {

    let movements = []

    player.rotation.set(0,0,0);

    let tween1 = new TWEEN.Tween( player.rotation ).to({ z: -Math.PI/2}, 300)
        .onStart(function() {
            new TWEEN.Tween( player.position ).to(new THREE.Vector3( player.position.x+4, player.position.y, player.position.z), 300).start()
        })
        .onRepeat(function() {
            new TWEEN.Tween( player.position ).to(new THREE.Vector3( player.position.x+4, player.position.y, player.position.z ), 300).start()
        });

    tween1.repeat(times);
    movements.push(tween1);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    movements[0].start()
    movements[movements.length-1].onComplete(onComplete)

}

export const moveToLeft = (player, times, onComplete) => {

    let movements = []

    player.rotation.set(0,0,0);

    let tween1 = new TWEEN.Tween( player.rotation ).to({ z: +Math.PI/2}, 300)
        .onStart(function() {
            new TWEEN.Tween( player.position ).to(new THREE.Vector3( player.position.x-4, player.position.y, player.position.z), 300).start()
        })
        .onRepeat(function() {
            new TWEEN.Tween( player.position ).to(new THREE.Vector3( player.position.x-4, player.position.y, player.position.z ), 300).start()
        });

    tween1.repeat(times);
    movements.push(tween1);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    movements[0].start()
    movements[movements.length-1].onComplete(onComplete)

}

export const resizeMovement = (obj, x, y, z, timeTo, onComplete) => {

    let movements = [];

    let scaleTarget = new THREE.Vector3( x, y, z );
    let tween = new TWEEN.Tween( obj.scale ).to( scaleTarget, timeTo );

    movements.push(tween);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    movements[0].start();
    movements[0].onComplete(onComplete);

};

export const popUpMovement = (obj, x, y, z, timeTo, onComplete) => {

    let movements = [];

    let scaleTarget = new THREE.Vector3( x, y, z );
    let scaleInvisible = new THREE.Vector3( 0, 0, 0 );

    let tween1 = new TWEEN.Tween( obj.scale ).to( scaleTarget, timeTo );
    let tween2 = new TWEEN.Tween( obj.scale ).to( scaleTarget, 2000 );
    let tween3 = new TWEEN.Tween( obj.scale ).to( scaleInvisible, timeTo );

    movements.push(tween1);
    movements.push(tween2);
    movements.push(tween3);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    movements[0].start();
    movements[movements.length-1].onComplete(onComplete);

};

export const rotationMovement = (obj, fruit, y0, y1, timeTo, delay) => {

    // var tween0 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( obj.position.x, y0, obj.position.z ), timeTo/5 ); 
    // var tween1 = new TWEEN.Tween( obj.rotation ).to({ y: "-" + 2*Math.PI}, timeTo);
    // var tween2 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( obj.position.x, y1, obj.position.z ), timeTo/5 ); 

    var tween1 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( fruit.position.x, y0, fruit.position.z ), timeTo )
        .onStart(function(){
            new TWEEN.Tween( obj.rotation ).to({ y: "-" + Math.PI}, timeTo).start() })
    
    var tween2 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( fruit.position.x, y1, fruit.position.z ), timeTo )
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

export const jumpingMovement = (obj, y, invertedAxis=false, onComplete) => {

    let movements = []

    let animation0 = new TWEEN.Tween(obj.scale).to(new THREE.Vector3(invertedAxis ? 0.7 : 1.2, invertedAxis ? 1.2 : 0.7, 1.2), 1200).onStart(function(){
        new TWEEN.Tween( obj.position ).to(new THREE.Vector3(obj.position.x, obj.position.y-0.3, obj.position.z)).start() });
    let animation1 = new TWEEN.Tween(obj.position).to(new THREE.Vector3(obj.position.x, obj.position.y+y, obj.position.z), 200);
    let animation12 = new TWEEN.Tween(obj.scale).to(new THREE.Vector3(1, 1, 1), 100);
    let animation2 = new TWEEN.Tween(obj.position).to(new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z), 200);
    let animation3 = new TWEEN.Tween(obj.scale).to(new THREE.Vector3(invertedAxis ? 0.8 : 1.1, invertedAxis ? 1.1 : 0.8, 1.1), 200);
    let animation4 = new TWEEN.Tween(obj.scale).to(new THREE.Vector3(1, 1, 1), 200);

    movements.push(animation0);
    movements.push(animation1);
    movements.push(animation12);
    movements.push(animation2);
    movements.push(animation3);
    movements.push(animation4);

    if (movements.length >= 2) {
        for (let i = 0; i < movements.length - 1; i++){
            movements[i].chain(movements[i+1]);
        }
    }

    movements[0].start();
    movements[movements.length-1].onComplete(onComplete);

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

export const rotationMovement = (obj, fruit, y0, y1, timeTo, delay) => {

    // var tween0 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( obj.position.x, y0, obj.position.z ), timeTo/5 ); 
    // var tween1 = new TWEEN.Tween( obj.rotation ).to({ y: "-" + 2*Math.PI}, timeTo);
    // var tween2 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( obj.position.x, y1, obj.position.z ), timeTo/5 ); 

    var tween1 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( fruit.position.x, y0, fruit.position.z ), timeTo )
        .onStart(function(){
            new TWEEN.Tween( obj.rotation ).to({ y: "-" + Math.PI}, timeTo).start() })
    
    var tween2 = new TWEEN.Tween( obj.position ).to( new THREE.Vector3( fruit.position.x, y1, fruit.position.z ), timeTo )
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

export const showObject = (scene, object, animationTime=750, delay='+1000', onComplete) => {

    object.scale.set(0, 0, 0)
    scene.add(object)
    resizeMovement(object, 1, 1, 1, 500, delay, onComplete);

}

