const buildWrapper = tName => {
    const tag = document.createElement(tName);
    return ctx => {
        tag.textContent = ctx;
        return tag.outerHTML
    }
}

const wrapH1 = buildWrapper('H1');
const wrapP = buildWrapper('P');

console.log(wrapH1('СТИХИ'));
console.log(wrapP('Однажды в студёную зимнюю пору'));
console.log(wrapP("Вкусные M&M's"));