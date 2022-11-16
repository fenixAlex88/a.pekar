let a = ''; //перыое число
let b = ''; //второе число
let sign = ''; //операция
let fin = false;
const out = document.querySelector('.calc__screen p');

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
        a += num;
        out.textContent = a;
    } else if (a !== '' && fin) {
        b = num;
        out.textContent = b;
        fin = false;
    }
    else {
        b += num;
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
    return;

}

//подсчет результата
function getResult() {
    if (b === '') b = a;
    switch (sign) {
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
            if (b == 0) {
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
