function inter(s1, s2) {
    let s3 = new Set();
    s1.forEach(el => {
        if (s2.has(el)) s3.add(el);
    })
    return s3;
}

let A = new Set([1, 2]),
    B = new Set([2, 3]);

console.log(inter(A, B));