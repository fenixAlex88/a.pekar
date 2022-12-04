function squares(x, n) {
    let arr = [];
    for (let i = 0; i<n;i++){
        arr.push(x);
        x=x*x;
    }
    return arr;
}

console.log(squares(5,3));