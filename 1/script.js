const cars = [
    {
        id:1,
        brand: 'Mercedes',
        model: 'ML500',
        imageURL: 'http://cdn.motorpage.ru/Photos/800/_KOK9048.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: '150 000'
    },
    {
        id:2,
        brand: 'Audi',
        model: 'A6',
        imageURL: 'https://www.carscoops.com/wp-content/uploads/2011/05/224226a9-2012-audi-a6-saloon-6110178.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: '100 000'
    },
    {
        id:3,
        brand: 'BMW',
        model: 'XI',
        imageURL: 'https://all-auto.org/wp-content/uploads/2021/04/BMW-iX-5-1.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: '350 000'
    },
    {
        id:4,
        brand: 'Geely',
        model: 'AtlasPro',
        imageURL: 'https://daily-motor.ru/wp-content/uploads/2021/06/foto-atlas-pro-otts_01.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: '40 000'
    },
    {
        id:5,
        brand: 'Honda',
        model: 'Accord',
        imageURL: 'https://i.pinimg.com/originals/36/50/b2/3650b2bcfd72ef73ec10a1aecf061380.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: '80 000'
    },
    {
        id:6,
        brand: 'Ford',
        model: 'Mustang',
        imageURL: 'https://avatars.mds.yandex.net/get-vertis-journal/3934100/2020-06-24-3490c23cc89b4955a6a17697b0029ca8.jpg_1622736391300/orig',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perspiciatis accusamus, similique nam quae est ex aspernatur officia cumque molestias.',
        price: '150 000'
    }
]

const render = ()=>{
    
    document.querySelector('#app').innerHTML = cars.reduce((s,car)=>{ 
    s += 
`<div class="card" style="width: 18rem;">
<img src="${car.imageURL}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${car.brand} ${car.model}</h5>
  <p class="card-text">${car.description}</p>
  <a href="#" class="btn btn-primary">Buy ${car.price}</a>
</div>
</div>`;
return s;
},'');


};