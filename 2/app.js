let cars = [
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
let carBasket = [];

const render = () => {
    console.log('render');
    const wrapper = document.getElementById('app');
    wrapper.innerHTML = '';
    cars.forEach((car) => {
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
        const discription = document.createElement('p');
        discription.classList.add('card-text');
        discription.textContent = `${car.description}`;
        cardBody.appendChild(discription);
        const btnBuy = document.createElement('button');
        btnBuy.classList.add('btn', 'btn-primary');
        btnBuy.textContent = `Buy ${car.price}`;
        btnBuy.addEventListener('click', addBasket)
        cardBody.appendChild(btnBuy);
        const btnDel = document.createElement('button');
        btnDel.classList.add('btn', 'btn-danger');
        btnDel.textContent = `Delete`;
        btnDel.addEventListener('click', delCar);
        cardBody.appendChild(btnDel);
        wrapper.appendChild(card);
    })
    renderBasketNote();

};
const renderBasketNote = () => {
    const basketCount = carBasket.reduce((count, car) => count + car.count, 0) || 0;
    const basketSumm = carBasket.reduce((sum, car) => sum + car.price * car.count, 0) || 0;
    document.getElementById('basketCount').textContent = `В корзине ${basketCount} товаров`;
    document.getElementById('basketSumm').textContent = `На сумму ${basketSumm}`;
};

const renderBasket = () => {
    const wrapper = document.getElementById('app');
    wrapper.innerHTML = '';
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
            disc.textContent = `${car.count} шт. по ${car.price}`;
            cardBody.appendChild(disc);
            wrapper.appendChild(card);
        })
    } else {
        const emptyBasket = document.createElement('h2');
        emptyBasket.textContent = 'В вашей корзине нет товаров';
        emptyBasket.classList.add('text-white');
        wrapper.appendChild(emptyBasket);
    }
};

const renderBasketBtn = document.getElementById('renderBasketBtn');
const renderMainBtn = document.getElementById('renderMainBtn');

renderBasketBtn.addEventListener('click', () => {
    renderBasket();
    renderBasketBtn.classList.add('active');
    renderMainBtn.classList.remove('active');
});

renderMainBtn.addEventListener('click', () => {
    render();
    renderMainBtn.classList.add('active');
    renderBasketBtn.classList.remove('active');
});

const search = () => {
    const str = document.getElementById('search').value;
    cars = cars.filter(car => (car.brand.toLowerCase() === str.toLowerCase()) || (car.model.toLowerCase() === str.toLowerCase()));
    render();
};

const sortUp = () => {
    cars.sort((a, b) => a.price - b.price);
    render();
}

const sortDown = () => {
    cars.sort((a, b) => b.price - a.price);
    render();
}

document.getElementById("addCarBtn").addEventListener("click", () => {
    document.getElementsByName("newCar")[0].classList.toggle('hide');
})

const addNewCar = () => {
    cars.push({
        id: Date.now(),
        brand: document.newCar.brand.value,
        model: document.newCar.model.value,
        imageURL: document.newCar.imageURL.value,
        description: document.newCar.description.value,
        price: document.newCar.price.value
    });
    render();
    document.getElementsByName("newCar")[0].classList.toggle('hide');
}
const findById = (arr, id) => arr.map((car) => car.id).indexOf(id);

const delCar = (e) => {
    cars.splice(findById(cars, parseInt(e.currentTarget.parentElement.dataset.id)), 1);
    render();
}
const addBasket = (e) => {
    const id = parseInt(e.currentTarget.parentElement.dataset.id);
    let car = cars.filter((car) => car.id === id);
    if (carBasket.filter((car) => car.id === id).length > 0) {
        carBasket[findById(carBasket, id)].count++;
    } else {
        carBasket.push(...car);
        carBasket[findById(carBasket, id)].count = 1;
    }
    ;

    renderBasketNote();
};

render();