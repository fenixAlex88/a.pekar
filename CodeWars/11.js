const powersOfTwo = n =>
    [...Array(n+1).keys()].map(el=>2**el);


console.log(powersOfTwo(2));