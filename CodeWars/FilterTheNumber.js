// const filterString = value => {
//     let res = '';
//     for (let i = 0; i < value.length; i++) {
//         if (!isNaN(value[i])) res += value[i];
//     }
//     return +res;
// }

const filterString = value => {
    return +value.split('').filter(el=>!isNaN(el)).join('');
}

console.log(filterString('aa1bb2cc3dd4'));