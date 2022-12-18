const strArr = prompt('Введите строку:').split('');
const vowels = 'уеаоэяиюы';
const vowelsForEach = strArr => {
    let count = 0;
    strArr.forEach(char => {
        if (vowels.includes(char.toLowerCase())) count++;
    })
    return count;
}
const vowelsReduce = strArr =>
    strArr.reduce((count, char) => {
        if (vowels.includes(char.toLowerCase()))
            count++;
        return count;
    }, 0);
const vowelsFilter = strArr => {
    strArr = strArr.filter(char => vowels.includes(char.toLowerCase()))
    return strArr.length;
}

alert(`Гласных букв:
метод forEach: ${vowelsForEach(strArr)},
метод forFilter: ${vowelsFilter(strArr)},
метод forReduce: ${vowelsReduce(strArr)}!`);

