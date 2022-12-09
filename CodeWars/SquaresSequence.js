function squares(x, n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(x ** 2 ** i);
    }
    return arr;
}

//const squares = (x, n) => {const arr = Array(n); return arr.map((e,i)=>x ** 2 ** i);}
console.log(squares(5, 3));