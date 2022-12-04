function findOdd(a) {
    let count = {};
    a.forEach(el => {
        if (!(el in count))
            count[el] = 0;
        count[el]++;
    });
    for (let key in count) {
        if (count[key] % 2 !== 0) return parseInt(key);
    }
}
//const findOdd = (xs) => xs.reduce((a, b) => a ^ b);
console.log(findOdd([20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5]));