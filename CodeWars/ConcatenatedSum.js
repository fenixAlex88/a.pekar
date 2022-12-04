function checkConcatenatedSum(x, n) {
    const sign = x > 0;
    const res = Math.abs(x).toString().split('').reduce((sum, el) =>
        sum + parseInt(el.repeat(n)), 0);
    return (sign) ? res === x : -res === x;
}

console.log(checkConcatenatedSum(-2997, 3))

