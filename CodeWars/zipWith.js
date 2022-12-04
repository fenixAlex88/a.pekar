function zipWith(fn, a0, a1) {
    const a2 = [];
    for (let i = 0; i < Math.min(a0.length, a1.length); i++) {
        a2[i] = fn(a0[i], a1[i]);
    }
    return a2;
}

console.log(zipWith(Math.pow, [10, 10, 10, 10], [0, 1, 2, 3]));
console.log(zipWith(Math.max, [1, 4, 7, 1, 4, 7], [4, 7, 1, 4, 7, 1]));
console.log(zipWith(((a, b) => {
    return a + b;
}), [0, 1, 2, 3, 4, 5], [6, 5, 4, 3, 2]))