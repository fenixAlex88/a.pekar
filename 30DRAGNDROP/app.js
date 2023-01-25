//выбелаем все изображения на странице
const imgs = document.querySelectorAll('img');

//добавляем каждому изображению событие нажатия
//вызываем функцию перемещения
//и отменяем стандартный драгндроп браузера
imgs.forEach((img) => {
    const copyImg = img.cloneNode(true);
    console.log(img.pageY , img.y);
    console.log(img);
    img.style.visibility = 'hidden';
    copyImg.style.position = 'absolute';
    copyImg.style.left = img.x + 'px';
    copyImg.style.top = img.y + 'px';
    copyImg.style.zIndex = 1000;
    copyImg.style.cursor = 'grabbing';
    document.body.append(copyImg);
    copyImg.addEventListener('mousedown', moove);
    copyImg.ondragstart = function () {
        return false;
    };
})

//функция перемещения
function moove(e) {
    const img = e.target;
    //находим сдвиг координат от точки нажатия
    const shiftX = e.clientX - img.getBoundingClientRect().left;
    const shiftY = e.clientY - img.getBoundingClientRect().top;

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

