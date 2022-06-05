import * as THREE from "three";
import {createMovement, resizeMovement, transitionObjectColor} from '../Builders/tweenMotions';

export const ageEditor = (array) => {

    const player = array[0];
    const age = array[1];

    var young_colors = []; for (let i = 196; i >= 0; i-=4) { young_colors.push(i) }
    var old_colors = []; for (let i = 255; i >= 63; i-=4) { old_colors.push(i) }

    var young_size = []; for (let i = 0.5; i <= 1; i+=0.01) { young_size.push(i) }
    var old_size = []; for (let i = 1; i >= 0.71; i-=0.006) { old_size.push(i) }

    if (age > 0 && age <= 50){
        resizeMovement(player, parseFloat(young_size[age-1]), parseFloat(young_size[age-1]), parseFloat(young_size[age-1]), 1000, '+2000')
        transitionObjectColor(player, new THREE.Color('rgb(' + 255 + ',' + parseFloat(young_colors[age]) + ',' + parseFloat(young_colors[age]) + ')'), 1000, '+0')
        
    } else if (age > 50 && age <= 99) {
        resizeMovement(player, parseFloat(old_size[age-51]), parseFloat(old_size[age-51]), parseFloat(old_size[age-51]), 1000, '+2000')
        transitionObjectColor(player, new THREE.Color('rgb(' + parseFloat(old_colors[age-51]) + ',' + 0 + ',' + 0 + ')'), 1000, '+0')
    }

    return player;

}