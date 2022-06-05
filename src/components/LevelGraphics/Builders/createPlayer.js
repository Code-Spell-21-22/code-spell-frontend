import * as THREE from "three";

export const createPlayer = () => {
    var player = new THREE.Mesh( new THREE.BoxGeometry( 4, 4, 4 ), new THREE.MeshPhongMaterial( { color: 0xff0a0a}  ));
    player.position.set(0, 2, 0);
    player.castShadow = true;

    return player;
}