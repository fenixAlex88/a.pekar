function isPythagoreanTriple(integers) {
    integers.sort((a, b) => (a - b))
    return integers[0]**2+integers[1]**2===integers[2]**2;
}

console.log(isPythagoreanTriple([3, 5, 4]))