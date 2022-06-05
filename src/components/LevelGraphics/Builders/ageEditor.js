export const ageEditor = (array) => {

    const player = array[0];
    const age = array[1];

    var young_colors = []; for (let i = 196; i >= 0; i-=4) { young_colors.push(i) }
    var old_colors = []; for (let i = 255; i >= 63; i-=4) { old_colors.push(i) }

    var young_size = []; for (let i = 0.5; i <= 1; i+=0.01) { young_size.push(i) }
    var old_size = []; for (let i = 1; i >= 0.71; i-=0.006) { old_size.push(i) }

    if (age > 0 && age <= 50){
        player.scale.set(parseFloat(young_size[age-1]), parseFloat(young_size[age-1]), parseFloat(young_size[age-1]));

        var color = 'rgb(' + 255 + ',' + parseFloat(young_colors[age]) + ',' + parseFloat(young_colors[age]) + ')';
        player.material.color.set(color);
        
    } else if (age > 50 && age <= 99) {
        player.scale.set(parseFloat(old_size[age-51]), parseFloat(old_size[age-51]), parseFloat(old_size[age-51]));
        
        var color = 'rgb(' + parseFloat(old_colors[age-51]) + ',' + 0 + ',' + 0 + ')';
        player.material.color.set(color)
    }

    return player;

}