function count(array){
    let count = {};
    array.forEach(el => {
        if (!(el in count))
            count[el]=0;
        count[el]++;
    });
    return count;
}

console.log(count(['a', 'a', 'b', 'b', 'b']));