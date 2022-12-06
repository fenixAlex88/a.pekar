function isPalindrom (str) {
const ex = ' .?!,ьъ';
    for (let i =0, j=str.length-1; i<j; i++,j--){
        while (ex.includes(str[i])) i++;
        while (ex.includes(str[j])) j--;
        if (str[i].toLowerCase().replace('ё','е')!==str[j].toLowerCase().replace('ё','е')) {
            console.log(str[i].replace('ё','е').toLowerCase());
            console.log(str[j].replace('ё','е').toLowerCase());
            return false;
        }
    }
    return true;
}


const isPalindromeRecurs = str => {
    const ex = ' .?!,';
      return str.length <= 1 ? true : 
      ex.includes(str[0])? is_palindrome(str.slice(1)):
      ex.includes(str[str.length-1])? is_palindrome(str.slice(0,-1)):
      str[0].toLowerCase().replace('е','ё') === str[str.length-1].toLowerCase().replace('е','ё') ? is_palindrome(str.slice(1,-1)):
      false;
}

console.log(isPalindrom('е!ЁЁеЕsdssdsЁёё  .,,,е.. .. ё'));
console.log(is_palindrome('е!ЁЁеЕsdssdsЁёё  .,,,е.. .. ё'));

