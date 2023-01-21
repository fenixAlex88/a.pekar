//выбелаем все изображения на странице
const imgs = document.querySelectorAll('img');

//добавляем каждому изображению событие нажатия
//вызываем функцию перемещения
//и отменяем стандартный драгндроп браузера
imgs.forEach((img) => {
    img.addEventListener('mousedown', moove);
    img.style.position = 'absolute';
    img.style.zIndex = 1000;
    img.ondragstart = function () {
        return false;
    };
})

//функция перемещения
function moove(e) {
    if (e.target.tagName === 'IMG') {
        const img = e.target;
        //находим сдвиг координат от точки нажатия
        const shiftX = e.clientX - img.getBoundingClientRect().left;
        const shiftY = e.clientY - img.getBoundingClientRect().top;

        img.style.cursor = 'grabbing';
        document.body.append(img);
        moveAt(e.pageX, e.pageY);
        //фуункция смещения изображение с учетом смещения
        function moveAt(pageX, pageY) {
            img.style.left = pageX - shiftX + 'px';
            img.style.top = pageY - shiftY + 'px';
        }
        //функция
        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
        }
        //обрабатываем событие перемещения изображения в документе
        document.addEventListener('mousemove', onMouseMove);
        //событие отпускания клавиши мыши
        img.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            img.style.removeProperty('cursor');
            img.onmouseup = null;
        };
    }

}

