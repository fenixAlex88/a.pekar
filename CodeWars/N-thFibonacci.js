function nthFibo(n) {
    return n <= 2 ? n - 1 : nthFibo(n - 1) + nthFibo(n - 2);
}

for (let i = 1; i < 10; i++)
    console.log(nthFibo(i))
