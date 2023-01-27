let a = ''; //перыое число
let format = ''; //второе число
let sign = ''; //операция
let fin = false;
const out = document.querySelector('.calc__screen p');

//изменение числа после ввода
const addKey = (key, num = '') => {
    if ((num.length > 5) || (key === '.' && (num === '0.' || num % 1 !== 0)) || (key === '0' && num === '0')) return num;
    else if (key === '.' && num === '') return '0.';
    else if (key !== '.' && num === '0') return key;
    else return num + key;
}

//очистка
function allClear() {
    a = '';
    format = '';
    sign = '';
    fin = false;
    out.textContent = 0;
    console.log('clear');
}

//получение чисел
function getNumber(num) {
    if (format === '' && sign === '') {
        if (fin) {
            a = addKey(num);
            fin = false;
            out.textContent = a;
        } else {
            a = addKey(num, a);
            out.textContent = a;
        }
    } else if (a !== '' && fin) {
        format = addKey(num);
        out.textContent = format;
        fin = false;
    } else {
        format = addKey(num, format);
        out.textContent = format;
    }
    console.log(`${a} ${sign} ${format}`);
}

//смена знака
function changeSign() {
    if (format === '') {
        a = -a;
        out.textContent = a;
    } else if (a !== '' && fin) {
        a = -a;
        format = '';
        out.textContent = a;
        fin = false;
    } else {
        format = -format;
        out.textContent = format;
    }
    console.log(`${a} ${sign} ${format}`);
}

//получене действия
function getSign(signKey) {
    if (a !== '' && format !== '') getResult();
    sign = signKey;
    out.textContent = sign;
    console.log(`${a} ${sign} ${format}`)
}

//подсчет результата
function getResult() {
    if (format === '') format = a;
    switch (sign) {
        case "":
            break;
        case '+':
            a = (+a) + (+format);
            break;
        case '-':
            a = a - format;
            break;
        case 'X':
            a = a * format;
            break;
        case '/':
            if (format === 0) {
                allClear();
                out.textContent = 'Деление на ноль!';
                return;
            }
            a = a / format;
            break;
        case '%':
            a = a * format / 100;
    }
    fin = true;
    format = '';
    sign = '';
    out.textContent = a;
    console.log(`result ${a} ${sign} ${format}`)
}
