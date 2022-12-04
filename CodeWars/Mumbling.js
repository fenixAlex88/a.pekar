function accum(s) {
    let str = s[0].toUpperCase();
    for (let i = 1; i<s.length; i++) {
        str += `-${s[i].toUpperCase()}`;
        for (let j = 1; j<=i; j++) {
            str += s[i].toLowerCase();
        }
    }
    return str;
}

console.log(accum("RqaEzty"));