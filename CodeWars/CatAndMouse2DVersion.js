function catMouse(map, moves) {
    const pos = {};
    const mapArr = map.split('\n');
    for (let i = 0; i < mapArr.length; i++) {
        for (let j = 0; j < mapArr[i].length; j++) {
            if (mapArr[i][j] === 'C') pos.cat = [i, j];
            if (mapArr[i][j] === 'm') pos.mouse = [i, j];
        }
    }
    if (!pos.cat || !pos.mouse) {
        return 'boring without two animals';
    }
    const dist = Math.abs(pos.cat[0] - pos.mouse[0]) + Math.abs(pos.cat[1] - pos.mouse[1]);
    return dist <= moves ? 'Caught!' : 'Escaped!';
}


var map = `..C......
.........
....m....`
console.log(catMouse(map, 5))