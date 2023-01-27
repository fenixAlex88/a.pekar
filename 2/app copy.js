let cars =[];


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
        img.classList.add("card-img-top", 'canBuy');
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
        btnBuy.textContent = `Buy ${priceFormat(car.price)}`;
       // btnBuy.addEventListener('click', addBasket)
        cardBody.appendChild(btnBuy);
        const btnDel = document.createElement('button');
        btnDel.classList.add('btn', 'btn-danger');
        btnDel.textContent = `Delete`;
        //btnDel.addEventListener('click', delCar);
        cardBody.appendChild(btnDel);
        wrapper.appendChild(card);
    })
  };

  //формат записи в USD
const priceFormat = (price) => price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
});


window.addEventListener('storage', ()=>{
    cars = JSON.parse(localStorage.carBasket);
    render();
})