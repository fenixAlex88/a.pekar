function disemvowel(str) {
    const s = 'aeuio';
    let a = '';
    for (let i = 0; i < str.length; i++) {
        if (!s.includes(str[i].toLowerCase())) {
            a += str[i];
        }
    }
    return a;
}

console.log(disemvowel("No offense but,\nYour writing is among the worst I've ever read"))