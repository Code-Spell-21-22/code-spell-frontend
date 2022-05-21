import * as THREE from "three";
 
import {createText} from './createText';

export const createBlueprint = (text) => {
    const bp = new THREE.Group();
    
    const plane = new THREE.Mesh( new THREE.PlaneGeometry( 16, 9 ), new THREE.MeshBasicMaterial( {color: 0x00518f, side: THREE.DoubleSide} ) );
    plane.position.set(0, 11, 0)
    const classname = createText(false, text, 0.5, 0xffffff);
    classname.position.set(0, 9.6, 0)

    var createLine = function(l, w, x, y) {
        const line = new THREE.Mesh(new THREE.PlaneGeometry(l, w), new THREE.MeshBasicMaterial({color: 0xffffff, side : THREE.DoubleSide}));
        line.position.set(x, y, 0)
        return line;
    }

    var length = [7, 15]; 
    for (var i in length){  bp.add(createLine(15, 0.1, 0, length[i])) }

    var length = [-7.5, 7.5]; 
    for (var i in length){ 
        const line = createLine(8, 0.1, length[i], 11) 
        line.rotateZ(-Math.PI / 2)
        bp.add(line)
    }

    bp.add(plane, classname)
    return bp;
}