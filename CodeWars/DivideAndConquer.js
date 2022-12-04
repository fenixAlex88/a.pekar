function divCon(x){
    let res = 0;
    x.forEach(el=>{
        if (typeof el === 'number') res+=el;
        else res-=el;
    })
    return res;
}

console.log(divCon(['5', '0', 9, 3, 2, 1, '9', 6, 7]));