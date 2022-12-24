(function(){
let a = ''; //перыое число
let b = ''; //второе число
let sign = ''; //операция
let fin = false;


const digit = ['0', '1', 'move_square', '3', '4', '5', '6', '7', '8', '9', '.'];
const act = ['-', '+', 'X', '/'];

//экран
const out = document.querySelector('.calc__screen p');

function allClear() {
    a = '';
    b = '';
    sign = '';
    fin = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = allClear;

document.querySelector('.calc__buttons').onclick = (e) => {
    //нажата не кнопка или ac
    if (!e.target.classList.contains('btn') || e.target.classList.contains('ac')) return;

    out.textContent = '';
    //получаем нажатую кнопку
    const key = e.target.textContent;

    //если нажата цифра
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        } else if (a !== '' && b !== '' && fin) {
            b = key;
            out.textContent = b;
            fin = false;
        }
        else {
            b += key;
            out.textContent = b;
        }
        console.log(`${a} ${b} ${sign}`);
    }

    //если нажато действие
    if (act.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(`${a} ${b} ${sign}`)
        return;
    }

    //вычисления

    if ( key === '=' ) {
        if ( b === '' ) b = a;
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
                if ( b == 0) {
                    allClear();
                    out.textContent = 'Деление на ноль!';
                    return;
                }
                a = a / b;
                break;
        }
        fin = true;
        out.textContent = a;
        console.log(`${a} ${b} ${sign}`)

    }
}
}())