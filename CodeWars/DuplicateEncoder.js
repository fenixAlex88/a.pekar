function duplicateEncode(word) {
    word = word.toLowerCase();
    let newWord = '';
    for (let i = 0; i < word.length; i++) {
        newWord += (word.indexOf(word[i]) === word.lastIndexOf(word[i])) ? '(' : ')';
    }
    return newWord;
}

console.log(duplicateEncode("recedee"));