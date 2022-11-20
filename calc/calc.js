let a = ''; //перыое число
let b = ''; //второе число
let sign = ''; //операция
let fin = false;
const out = document.querySelector('.calc__screen p');

//изменение числа после ввода
const addKey = (key, num='') => {
    if ((key==='.' && (num === '0.' || num%1!== 0)) || (key==='0' && num==='0')) return num;
    else if (key==='.' && num==='') return '0.';
    else if (key!=='.' && num==='0') return key;
    else return num+=key;
}
//очистка
function allClear() {
    a = '';
    b = '';
    sign = '';
    fin = false;
    out.textContent = 0;
    console.log('clear');
}

//получение чисел
function getNumber(num) {
    if (b === '' && sign === '') {
        if (fin) {
            a = addKey(num);
            fin = false;
            out.textContent = a;
        } else {
            a = addKey(num, a);
            out.textContent = a;
        }
    } else if (a !== '' && fin) {
        b = addKey(num);
        out.textContent = b;
        fin = false;
    }
    else {
        b = addKey(num, b);
        out.textContent = b;
    }
    console.log(`${a} ${sign} ${b}`);
}

//смена знака
function changeSign() {
    if (b === '') {
        a = -a;
        out.textContent = a;
    } else if (a !== '' && fin) {
        a = -a;
        b = '';
        out.textContent = a;
        fin = false;
    }
    else {
        b = -b;
        out.textContent = b;
    }
    console.log(`${a} ${sign} ${b}`);
}

//получене действия
function getSign(signKey) {
    if (a !== '' && b !== '') getResult();
    sign = signKey;
    out.textContent = sign;
    console.log(`${a} ${sign} ${b}`)
    }

//подсчет результата
function getResult() {
    if (b === '') b = a;
    switch (sign) {
        case "":
            break;
        case '+':
            a = (+a) + (+b);
            break;
        case '-':
            a = a - b;
            break;
        case 'X':
            a = a * b;
            break;
        case '/':
            if (b === 0) {
                allClear();
                out.textContent = 'Деление на ноль!';
                return;
            }
            a = a / b;
            break;
        case '%':
            a = a * b / 100;
    }
    fin = true;
    b = '';
    sign = '';
    out.textContent = a;
    console.log(`result ${a} ${sign} ${b}`)
}
