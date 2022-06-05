import * as THREE from "three";
 
import {createText} from './createText';

let material_text, weight_text, height_text, side_text

// STEP 1
export const createBlueprint = (text) => {
    const bp = new THREE.Group();
    
    const plane = new THREE.Mesh( new THREE.PlaneGeometry( 16, 9 ), new THREE.MeshBasicMaterial( {color: 0x00518f, side: THREE.DoubleSide} ) );
    plane.position.set(0, 11, 15)
    const classname = createText(text, 0.5, 0xffffff);
    classname.position.set(0, 9.6, 15)

    var createLine = function(l, w, x, y) {
        const line = new THREE.Mesh(new THREE.PlaneGeometry(l, w), new THREE.MeshBasicMaterial({color: 0xffffff, side : THREE.DoubleSide}));
        line.position.set(x, y, 15)
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

// STEP 2
export const addBlueprintItems = (array) => {
    const items = new THREE.Group();
    
    const material_type = array[0];
    const weight_number = array[1];
    const height_number = array[2];
    const side_number = array[3];

    // createText = (text, fontSize, textColor, hasSpeechBubble, hasTri, bubbleColor)
    material_text = createText("material" + " = " + material_type , 0.5, 0xffffff);
    material_text.position.set(0,6,15.1);

    weight_text = createText("weight" + " = " + weight_number , 0.5, 0xffffff);
    weight_text.position.set(0,5,15.1);

    height_text = createText("height" + " = " + height_number , 0.5, 0xffffff);
    height_text.position.set(0,4,15.1);

    side_text = createText("side" + " = " + side_number , 0.5, 0xffffff);
    side_text.position.set(0, 3,15.1);
    
    items.add(material_text, weight_text, height_text, side_text);
    return items


}

// STEP 3
export const addBlueprintLayout = (array) => {
    const layout = new THREE.Group();

    const material_type = array[0];
    const weight_number = array[1];
    const height_number = array[2];
    const side_number = array[3];
    const volume_formula = array[4];
    
    // createText = (text, fontSize, textColor, hasSpeechBubble, hasTri, bubbleColor)
    material_text = createText("material" + " = " + material_type , 0.35, 0xffffff);
    material_text.position.set(4,7.5,15.1);
    
    weight_text = createText("weight" + " = " + weight_number , 0.35, 0xffffff);
    weight_text.position.set(3.4,6.8,15.1);

    height_text = createText("height" + " = " + height_number , 0.35, 0xffffff);
    side_text = createText("side" + " = " + side_number , 0.35, 0xffffff);
    
    if (height_number < side_number){
        var geometry = new THREE.BoxGeometry( 4, 2.5, 2.5 );
        height_text.position.set(-0.6,5,15.1);
        side_text.position.set(-4,3,15.1);
    } else if (height_number > side_number){
        var geometry = new THREE.BoxGeometry( 2.5, 4, 2.5 );
        height_text.position.set(-1.2,5,15.1);
        side_text.position.set(-4,2.2,15.1);
    }

    const volume_text = createText("volume" + "= " + volume_formula , 0.4, 0x00518f, true, false, 0xffffff);
    volume_text.position.set(3, 2.1, 15.1)

    var materialwireframe = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( {color: 'lightgrey', wireframe: true}  ));
    materialwireframe.position.set(-4, 11, 16.5);
    
    
    layout.add(materialwireframe, material_text, weight_text, height_text, side_text, volume_text);
    return layout
}

// STEP 4
export const buildBox = (array) => {
    const finalbox = new THREE.Group();

    const class_name = array[2];
    const box_name = array[3];
    // createText = (text, fontSize, textColor, hasSpeechBubble, hasTri, bubbleColor)
    const classname = createText(class_name, 0.7, 0xffffff);
    const boxname = createText(box_name, 0.4, 0xffffff);
    
    const height_number = array[0];
    const side_number = array[1];
    
    if (height_number < side_number){ 
        var geometry = new THREE.BoxGeometry( 6, 3, 3 ); 
        classname.position.set(0, 9.6, 15)
        boxname.position.set(0, 6.2, 15)
    } 
    else if (height_number > side_number){ 
        var geometry = new THREE.BoxGeometry( 3, 6, 3 ); 
        classname.position.set(0, 9.6, 15)
        boxname.position.set(0, 8.2, 15)
    }
    
    var box = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( {color: 0x523320}  ));
    box.position.set(0, 9, 18.5);

    finalbox.add(box, classname, boxname);
    return finalbox; 
}