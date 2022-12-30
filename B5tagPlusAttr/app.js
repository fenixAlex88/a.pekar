const buildWrapper = tName => {
    const tag = document.createElement(tName);
    return (ctx, attr = {}) => {
        tag.textContent = ctx;
        for (key in attr)
            tag.setAttribute(key, attr[key]);
        return tag.outerHTML;
    }
}
const wrapH1 = buildWrapper('H1');
const wrapP = buildWrapper('P');

console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Однажды в студёную зимнюю пору", {lang: "ru"}));
console.log(wrapP("Однажды в <студёную> зимнюю пору"));
console.log(wrapH1("СТИХИ", {align: "center", title: "M&M's"}));

