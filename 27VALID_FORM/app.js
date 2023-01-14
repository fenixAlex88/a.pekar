//Переменные
//Вся форма
const form = document.forms.formSite;
//поля с текстом
const inputText = document.querySelectorAll(
    'input[ type="text"],' +
    'input[ type="number"],' +
    'input[ type="url"], ' +
    'input[ type="date"], ' +
    'input[ type="email"], ' +
    'textarea'
);
//радиокнопки
const inputRadio = document.querySelectorAll('input[ type="radio"]');
//чекбокс
const inputCheckbox = document.querySelector('input[ type="checkbox"]');
//список
const select = document.querySelector('select');

//Функции
//Сообщение об ошибке ввода
const errorMsg = (elem, msg) => {
    const err = document.createElement('span');
    err.classList.add('err');
    err.textContent = msg;
    elem.parentElement.append(err);
}
//Удаление сообщений об ошибках
const removeMsg = () => {
    const errs = document.querySelectorAll('.err');
    errs.forEach((err) => {
        err ? err.remove() : null;
    });
}
//Проверка на пустое проле
const validText = (el) => {
    if (el.currentTarget) {
        removeMsg();
        el = el.currentTarget;
    }
    if (!el.value) {
        errorMsg(el, 'Заполните поле')
    }
}
//Проверка на ВИП статус
const validRadio = (el) => {
    if (el.currentTarget) {
        removeMsg();
        el = el.currentTarget;
    }
    el.value === '' ?
        errorMsg(el[0].parentElement, 'Вы не выбрали тип размещения') :
        el.value === '3' ?
            errorMsg(el.parentElement || el[0].parentElement, 'У вас нет VIP статуса') :
            null;
}
//Проверка на выбор чекбокса
const isEmptyChek = (el) => {
    if (el.currentTarget) {
        removeMsg();
        el = el.currentTarget;
    }
    !el.checked ? errorMsg(el, 'Разрешите отзывы') : null;
}
//Проверка на выбор элемента списка
const validSelect = (el) => {
    if (el.target) {
        removeMsg();
        el = el.target;
    }
    el.value === '3' ? errorMsg(el, 'Уже поздно думать о здоровье') : null;
}
//Проерка всей формы
const validForm = (el) => {
    el.preventDefault();
    removeMsg();
    validText(form.elements.developer);
    validText(form.elements.title);
    validText(form.elements.site);
    validText(form.elements.date);
    validText(form.elements.visitors);
    validText(form.elements.email);
    validText(form.elements.description);
    isEmptyChek(form.elements.votes);
    validSelect(form.elements.category);
    validRadio(form.elements.payment);
    document.querySelector('.err').previousElementSibling.focus();
}

//Слушатели событий
//выход из полей с текстом
inputText.forEach((input) => {
    input.addEventListener('blur', validText)
})
//изменение радиокнопки
inputRadio.forEach((input) => {
    input.addEventListener('change', validRadio)
})
//изменение чекбокса
inputCheckbox.addEventListener('change', isEmptyChek);
//изменение списка
select.addEventListener('change', validSelect);
//отправка формы
form.addEventListener("submit", validForm);