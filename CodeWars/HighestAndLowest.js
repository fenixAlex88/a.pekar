function highAndLow(numbers){
    numbers = numbers.split(' ');
    let min = numbers[0];
    let max = numbers[0];
    for (let i = 1; i<numbers.length; i++) {
        if (parseInt(numbers[i])>max) {max = numbers[i]};
        if (parseInt(numbers[i])<min) {min = numbers[i]};
    }
    return `${max} ${min}`;
}

console.log(highAndLow("1 9 3 4 -5"));