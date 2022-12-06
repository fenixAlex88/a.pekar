const str = 'sdssd  s'
function isPalindrom (str) {
const ex = ' .?!,';
    for (let i =0, j=str.length-1; i<j; i++,j--){
        while (ex.includes(str[i])) i++;
        while (ex.includes(str[j])) j--;
        if (str[i].toLowerCase()!==str[j].toLowerCase()) return false;
    }
    return true;
}
console.log(isPalindrom(str));
