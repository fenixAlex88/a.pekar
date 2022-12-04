function accum(s) {
    let str = s[0].toUpperCase();
    for (let i = 1; i<s.length; i++) {
        str += `-${s[i].toUpperCase()}${s[i].toLowerCase().repeat(i)}`;
    }
    return str;
}

console.log(accum("RqaEzty"));