function calc(x) {
    let a = [];
    for (let i = 0; i < x.length; i++) {
        a[i] = x.charCodeAt(i);
    }
    a = a.join('');
    count = 0;
    for (let i = 0; i < a.length; i++)
        if (a[i] === '7') count++;
    return count * 6;
}

console.log(calc('ABC'));