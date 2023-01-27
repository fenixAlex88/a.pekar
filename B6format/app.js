const formatNumber = (num, format) => {
    let n = [];
    format = format.split('.');
    let res = num.toFixed(format[1].length).split('.');
    for (let i = res[0].length - 1, j = format[0].length - 1; i >= 0; i--, j--) {
        if (format[0][j] === '#') {
            n.unshift(res[0][i]);
        } else {
            n.unshift(' ');
            i++;
        }
    }
    res[0] = n.join('');
    return res.join('.');
}
console.log(formatNumber(12345.368, "# ### ###.##"));
console.log(formatNumber(2.3, "# ### ###.##"));