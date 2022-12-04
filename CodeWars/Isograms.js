console.log(isIsogram("moose"));

function isIsogram(str) {
    str = str.toLowerCase();
    let res = true;
    for (let i = 0; i < str.length; i++) {
        if (str.indexOf(str[i]) !== str.lastIndexOf(str[i]))
            res = false;
    }
    return res;
}