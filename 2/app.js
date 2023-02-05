//данные
const cars = [
    {
        id: 1,
        brand: 'Mercedes',
        model: 'ML500',
        imageURL: 'http://cdn.motorpage.ru/Photos/800/_KOK9048.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: 150000
    },
    {
        id: 2,
        brand: 'Audi',
        model: 'A6',
        imageURL: 'https://www.carscoops.com/wp-content/uploads/2011/05/224226a9-2012-audi-a6-saloon-6110178.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: 100000
    },
    {
        id: 3,
        brand: 'BMW',
        model: 'XI',
        imageURL: 'https://all-auto.org/wp-content/uploads/2021/04/BMW-iX-5-1.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: 350000
    },
    {
        id: 4,
        brand: 'Geely',
        model: 'AtlasPro',
        imageURL: 'https://daily-motor.ru/wp-content/uploads/2021/06/foto-atlas-pro-otts_01.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: 40000
    },
    {
        id: 5,
        brand: 'Honda',
        model: 'Accord',
        imageURL: 'https://i.pinimg.com/originals/36/50/b2/3650b2bcfd72ef73ec10a1aecf061380.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: 80000
    },
    {
        id: 6,
        brand: 'Ford',
        model: 'Mustang',
        imageURL: 'https://avatars.mds.yandex.net/get-vertis-journal/3934100/2020-06-24-3490c23cc89b4955a6a17697b0029ca8.jpg_1622736391300/orig',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: 150000
    }
];
const carBasket = localStorage.carBasket ? JSON.parse(localStorage.carBasket) : [];

//функции

//функция отрисовки главной страницы
const main = () => {
    const cards = document.createElement('div');
    cards.classList.add('cards');
    cars.forEach((car) => {
        const card = document.createElement('div');
        card.classList.add('card', 'text-bg-dark');
        card.style = 'width: 18rem;';
        const img = document.createElement('img');
        img.src = `${car.imageURL}`;
        img.classList.add("card-img-top", 'canBuy');
        card.append(img);
        const cardBody = document.createElement('div');
        cardBody.style.margin = '15px';
        cardBody.dataset.id = `${car.id}`;
        card.append(cardBody);
        const h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent = `${car.brand} ${car.model}`;
        cardBody.append(h5);
        const discription = document.createElement('p');
        discription.classList.add('card-text');
        discription.textContent = `${car.description}`;
        cardBody.append(discription);
        const btnBuy = document.createElement('button');
        btnBuy.classList.add('btn', 'btn-primary', 'addBasketBtn');
        btnBuy.textContent = `Buy ${priceFormat(car.price)}`;
        btnBuy.addEventListener('click', addBasket)
        cardBody.append(btnBuy);
        const btnDel = document.createElement('button', 'delCarBtn');
        btnDel.classList.add('btn', 'btn-danger', 'delCarBtn');
        btnDel.textContent = `Delete`;
        btnDel.addEventListener('click', delCar)
        cardBody.append(btnDel);
        cards.append(card);
    })
    renderBasketNote();
    return cards;
}
//добавление в корзину
const addBasket = (e) => {
    const id = parseInt(e.currentTarget.parentElement.dataset.id);
    let car = cars.filter((car) => car.id === id);
    if (carBasket.filter((car) => car.id === id).length > 0) {
        carBasket[findById(carBasket, id)].count++;
    } else {
        carBasket.push(...car);
        carBasket[findById(carBasket, id)].count = 1;
    }
    renderBasketNote();
    localStorage.carBasket = JSON.stringify(carBasket);
};
//сортировка по возрастанию цены
const _sortUp = () => {
    cars.sort((a, b) => a.price - b.price);
    render(main);
};
//сортировка по убыванию цены
const _sortDown = () => {
    cars.sort((a, b) => b.price - a.price);
    render(main);
};
//добавление нового объявления
const _addNewCar = () => {
    cars.push({
        id: Date.now(),
        brand: document.newCar.brand.value,
        model: document.newCar.model.value,
        imageURL: document.newCar.imageURL.value,
        description: document.newCar.description.value,
        price: +document.newCar.price.value
    });
    render(main);
    document.getElementsByName("newCar")[0].classList.toggle('hide');
};
//удаление объявления
const delCar = (e) => {
    cars.splice(findById(cars, parseInt(e.currentTarget.parentElement.dataset.id)), 1);
    render(main);
};
//функция отрисовки сайдбара
const sidebar = () => {
    const aside = document.createElement('div');
    aside.innerHTML = `
              <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar" style="width: 280px; min-height: 100vh">
        <h2 class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white">
            <svg class="bi pe-none me-2" width="40" height="32">
                <use xlink:href="#bootstrap"></use>
            </svg>
            <span class="fs-4">
<svg height="40" width="40" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 509 509" xml:space="preserve">
<circle style="fill:#4B5AA7;" cx="254.5" cy="254.5" r="254.5"/>
<g>
\t<path style="fill:#D7E2F2;" d="M72.3,172.1v-10.6c0-4.1-3.3-7.4-7.4-7.4h-29c-8.8,0-15.9,7.1-15.9,15.9s7.1,15.9,15.9,15.9h46.7
\t\tV172H72.3V172.1z"/>
\t<path style="fill:#D7E2F2;" d="M436.7,172.1v-10.6c0-4.1,3.3-7.4,7.4-7.4h29c8.8,0,15.9,7.1,15.9,15.9s-7.1,15.9-15.9,15.9h-46.7
\t\tV172h10.3V172.1z"/>
</g>
<g>
\t<path style="fill:#333842;" d="M38.1,318.9v97.9c0,4.9,3.9,8.8,8.8,8.8h40.5c4.9,0,8.8-3.9,8.8-8.8v-97.9H38.1z"/>
\t<path style="fill:#333842;" d="M470.9,318.9v97.9c0,4.9-3.9,8.8-8.8,8.8h-40.5c-4.9,0-8.8-3.9-8.8-8.8v-97.9H470.9z"/>
</g>
<path style="fill:#BECEE7;" d="M458,196.5l-17.8-8.9c0,0-36.5-77.9-50.3-89.8c-6.9-5.9-71.1-14.5-135.4-14.5
\tc-64.2,0-128.5,8.6-135.4,14.5c-13.8,11.8-50.3,89.8-50.3,89.8L51,196.5L30.3,236l12.3,132.2c0.8,9,8.4,15.8,17.3,15.8h389
\tc9,0,16.5-6.8,17.3-15.8L478.5,236L458,196.5z"/>
<polygon style="fill:#8FA3C1;" points="56.4,232.5 38.1,273.9 121,278.5 142.4,245.2 "/>
<polygon style="fill:#F8B517;" points="56.4,232.5 56.4,274.9 38.1,273.9 "/>
<g>
\t<circle style="fill:#FFFFFC;" cx="76.2" cy="255.1" r="16.8"/>
\t<circle style="fill:#FFFFFC;" cx="109.7" cy="259.8" r="13.5"/>
</g>
<path style="fill:#393D47;" d="M125.2,335.7l-15.5,29.1H59.3l7.7-18.6c2.6-6.4,8.9-10.5,15.7-10.5H125.2z"/>
<circle style="fill:#DEDEDF;" cx="84.6" cy="350.7" r="11.6"/>
<g>
\t<path style="fill:#D7E2F2;" d="M98.6,187.7c0,0,40.3,8.9,57.9,58.6l-19.6,42.2l-13.7-10l19.2-33.2
\t\tC142.4,245.2,135.9,216.4,98.6,187.7z"/>
\t<path style="fill:#D7E2F2;" d="M136.9,288.4c0,0-92.5,6.8-98.8,0c-6.4-6.8,0-14.5,0-14.5l85.1,4.6L136.9,288.4z"/>
</g>
<polygon style="fill:#8FA3C1;" points="452.6,232.5 470.9,273.9 388,278.5 366.6,245.2 "/>
<polygon style="fill:#F8B517;" points="452.6,232.5 452.6,274.9 470.9,273.9 "/>
<g>
\t<circle style="fill:#FFFFFC;" cx="432.8" cy="255.1" r="16.8"/>
\t<circle style="fill:#FFFFFC;" cx="399.3" cy="259.8" r="13.5"/>
</g>
<path style="fill:#393D47;" d="M383.8,335.7l15.5,29.1h50.3l-7.7-18.6c-2.6-6.4-8.9-10.5-15.7-10.5H383.8z"/>
<circle style="fill:#DEDEDF;" cx="424.4" cy="350.7" r="11.6"/>
<path style="fill:#D7E2F2;" d="M410.4,187.7c0,0-40.3,8.9-57.9,58.6l19.6,42.2l13.7-10l-19.2-33.2
\tC366.6,245.2,373.1,216.4,410.4,187.7z"/>
<g>
\t<path style="fill:#393D47;" d="M372.6,292.9c-5.5-15.2-19.1-44.5-26.7-46.7c-3.8-1.1-47.6-3.5-91.4-3.5s-87.6,2.5-91.4,3.5
\t\tc-7.6,2.2-21.2,31.5-26.7,46.7c-5.5,15.2,8.1,15,8.1,15h220.1C364.6,308,378.1,308.1,372.6,292.9z"/>
\t<path style="fill:#393D47;"
          d="M352.5,342.3h-196c0,0-15.6,0.3-27.2,22.6h250.3C368.1,342.6,352.5,342.3,352.5,342.3z"/>
\t<polygon style="fill:#393D47;" points="373.9,373.4 135.1,373.4 130.4,383.9 378.6,383.9 \t"/>
</g>
<path style="fill:#4485C5;" d="M383.8,105.4c-11.1-3.6-70.2-10-129.3-10s-118.2,6.4-129.3,10c0,0-31.8,45-45.7,82.3h350
\tC415.6,150.4,383.8,105.4,383.8,105.4z"/>
<path style="fill:#D7E2F2;" d="M372.1,288.4c0,0,92.5,6.8,98.8,0c6.4-6.8,0-14.5,0-14.5l-85.1,4.6L372.1,288.4z"/>
</svg>
                   Auto Shop
            </span>
        </h2>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <a href="#" class="nav-link text-white active" aria-current="page" id="renderMainBtn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 10V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V10M21 12L12 3L3 12"
                              stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Home
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white" id="sortUp">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 16H13" stroke="#fff" stroke-linecap="round"/>
                        <path d="M5 12H11" stroke="#fff" stroke-linecap="round"/>
                        <path d="M5 8H9" stroke="#fff" stroke-linecap="round"/>
                        <path d="M19 6L22 9M19 6L16 9M19 6L19 18" stroke="#fff"/>
                    </svg>
                    Sort price down
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white" id="sortDown">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 8H13" stroke="#fff" stroke-linecap="round"/>
                        <path d="M5 12H11" stroke="#fff" stroke-linecap="round"/>
                        <path d="M5 16H9" stroke="#fff" stroke-linecap="round"/>
                        <path d="M19 18L22 15M19 18L16 15M19 18L19 6" stroke="#fff"/>
                    </svg>
                    Sort price up
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white" id="addCarBtn">
                    <svg width="18" height="18" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="drop" fill="#fff" transform="translate(42.666667, 42.666667)">
                                <path d="M213.333333,3.55271368e-14 C269.912851,3.55271368e-14 324.175019,22.4761259 364.18278,62.4838867 C404.190541,102.491647 426.666667,156.753816 426.666667,213.333333 C426.666667,331.15408 331.15408,426.666667 213.333333,426.666667 C95.5125867,426.666667 3.55271368e-14,331.15408 3.55271368e-14,213.333333 C3.55271368e-14,95.5125867 95.5125867,3.55271368e-14 213.333333,3.55271368e-14 Z M234.666667,106.666667 L192,106.666667 L192,192 L106.666667,192 L106.666667,234.666667 L192,234.666 L192,320 L234.666667,320 L234.666,234.666 L320,234.666667 L320,192 L234.666,192 L234.666667,106.666667 Z"
                                      id="add-workorder">
                                </path>
                            </g>
                        </g>
                    </svg>
                    Add car
                </a>
                <form action="" name="newCar" class="hide">
                    <label>Марка авто</label>
                    <input name="brand" type="text" value="BMW"><br>
                    <label>Марка авто</label>
                    <input name="model" type="text" value="i3"><br>
                    <label>Изображение авто</label>
                    <input name="imageURL" type="url"
                           value="https://forococheselectricos.com/wp-content/uploads/2014/01/BMW-i3-rex-17-900x611.jpg"><br>
                    <label>Описание авто</label>
                    <textarea name="description">lorem</textarea><br>
                    <label>Цена авто</label>
                    <input name="price" type="text" value="10000"><br> <br>
                    <input type="button" class="btn btn-success" value="Добавить" id="addNewCar">
                </form>
            </li>

            <li>

                <a href="#" class="nav-link text-white" id="renderBasketBtn">

                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H5.62563C6.193 4 6.47669 4 6.70214 4.12433C6.79511 4.17561 6.87933 4.24136 6.95162 4.31912C7.12692 4.50769 7.19573 4.7829 7.33333 5.33333L7.51493 6.05972C7.616 6.46402 7.66654 6.66617 7.74455 6.83576C8.01534 7.42449 8.5546 7.84553 9.19144 7.96546C9.37488 8 9.58326 8 10 8V8"
                              stroke="#fff" stroke-width="2" stroke-linecap="round"/>
                        <path d="M18 17H7.55091C7.40471 17 7.33162 17 7.27616 16.9938C6.68857 16.928 6.28605 16.3695 6.40945 15.7913C6.42109 15.7367 6.44421 15.6674 6.49044 15.5287V15.5287C6.54177 15.3747 6.56743 15.2977 6.59579 15.2298C6.88607 14.5342 7.54277 14.0608 8.29448 14.0054C8.3679 14 8.44906 14 8.61137 14H14"
                              stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.5279 14H10.9743C9.75838 14 9.15042 14 8.68147 13.7246C8.48343 13.6083 8.30689 13.4588 8.15961 13.2825C7.81087 12.8652 7.71092 12.2655 7.51103 11.0662C7.30849 9.85093 7.20722 9.2433 7.44763 8.79324C7.54799 8.60536 7.68722 8.44101 7.85604 8.31113C8.26045 8 8.87646 8 10.1085 8H16.7639C18.2143 8 18.9395 8 19.2326 8.47427C19.5257 8.94854 19.2014 9.59717 18.5528 10.8944L18.1056 11.7889C17.5677 12.8647 17.2987 13.4026 16.8154 13.7013C16.3321 14 15.7307 14 14.5279 14Z"
                              stroke="#fff" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="17" cy="20" r="1" fill="#33363F"/>
                        <circle cx="9" cy="20" r="1" fill="#33363F"/>
                    </svg>
                    Basket

                </a>
                <hr>
                <div id="basketCount"></div>
                <div id="basketSumm"></div>
            </li>
        </ul>
    </div>
    `;
    return aside;
}
//функция отрисовки записи о состоянии корзины
const renderBasketNote = () => {
    const basketCount = carBasket.reduce((count, car) => count + car.count, 0) || 0;
    const basketSumm = carBasket.reduce((sum, car) => sum + car.price * car.count, 0) || 0;
    document.getElementById('basketCount').textContent = `В корзине ${basketCount} товаров`;
    document.getElementById('basketSumm').textContent = `На сумму ${priceFormat(basketSumm)}`;
};
//функция отрисовки корзины
const basket = () => {
    const cards = document.createElement('div');
    cards.classList.add('cards');
    if (carBasket.length > 0) {
        carBasket.forEach((car) => {
            const card = document.createElement('div');
            card.classList.add('card', 'text-bg-dark');
            card.style = 'width: 18rem;';
            const img = document.createElement('img');
            img.src = `${car.imageURL}`;
            img.classList.add("card-img-top");
            card.appendChild(img);
            const cardBody = document.createElement('div');
            cardBody.style.margin = '15px';
            cardBody.dataset.id = `${car.id}`;
            card.appendChild(cardBody);
            const h5 = document.createElement('h5');
            h5.classList.add('card-title');
            h5.textContent = `${car.brand} ${car.model}`;
            cardBody.appendChild(h5);
            cardBody.appendChild(document.createElement('hr'));
            const disc = document.createElement('p');
            disc.textContent = `${car.count} шт. по ${priceFormat(car.price)}`;
            cardBody.appendChild(disc);
            const btnDel = document.createElement('button');
            btnDel.classList.add('btn', 'btn-danger', 'delCarBasketBtn');
            btnDel.textContent = 'Delete from basket';
            btnDel.addEventListener('click', delCarBasket)
            cardBody.appendChild(btnDel);
            cards.append(card);
        })
    } else {
        const emptyBasket = document.createElement('h2');
        emptyBasket.textContent = 'В вашей корзине нет товаров';
        emptyBasket.classList.add('text-white');
        cards.append(emptyBasket);
    }
    return cards;
}
//удаление из корзины
const delCarBasket = (e) => {
    carBasket.splice(findById(carBasket, parseInt(e.currentTarget.parentElement.dataset.id)), 1);
    render(basket);
    renderBasketNote();
    localStorage.carBasket = JSON.stringify(carBasket);
};
//отрисовка сайдбара
const aside = document.getElementById('aside');
aside.append(sidebar());
//функция рендер
const app = document.getElementById('app');
const render = (func) => {
    app.innerHTML = '';
    app.append(func());
};
//формат записи в USD
const priceFormat = (price) => price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
});
//поиск индекса элемента в массиве arr по id
const findById = (arr, id) => arr.map((car) => car.id).indexOf(id);

//функция выбора страниц по хэшу
const switchToStateFromURLHash = () => {
    const stateStr = window.location.hash.slice(1);
    switch (stateStr) {
        case 'Main':
            render(main);
            break;
        case 'Basket':
            render(basket);
            break;
        default:
            break;
    }
};
switchToStateFromURLHash();

//выборка объектов
const renderBasketBtn = document.getElementById('renderBasketBtn');
const renderMainBtn = document.getElementById('renderMainBtn');
const sortUp = document.getElementById('sortUp');
const sortDown = document.getElementById('sortDown');
const addNewCar = document.getElementById('addNewCar');
const addCarBtn = document.getElementById("addCarBtn");


//слушатели событий
renderBasketBtn.addEventListener('click', (e) => {
    e.preventDefault();
    location.hash = 'Basket';
    renderBasketBtn.classList.add('active');
    renderMainBtn.classList.remove('active');
});
renderMainBtn.addEventListener('click', (e) => {
    e.preventDefault();
    location.hash = 'Main';
    renderMainBtn.classList.add('active');
    renderBasketBtn.classList.remove('active');
});

sortUp.addEventListener('click', _sortUp);
sortDown.addEventListener('click', _sortDown);
addNewCar.addEventListener('click', _addNewCar);
addCarBtn.addEventListener("click", () => {
    document.getElementsByName("newCar")[0].classList.toggle('hide');
});
window.addEventListener('hashchange', switchToStateFromURLHash);
