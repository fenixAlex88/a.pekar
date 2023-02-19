class Player{
    constructor(name) {
        this.name = nameInput.value;
    }
    print() {
        console.log(this.name);
    }
}
const nameInput = document.querySelector('#name');
const wrap = document.querySelector('#createPlayer');
const btnCreate = document.querySelector('button');
let firstPlayer, secondPlayer;

btnCreate.addEventListener('click',()=>{
    if (nameInput.value) {
        if (firstPlayer) {
            secondPlayer = new Player();
            wrap.classList.add('hide');
        } else firstPlayer = new Player();
    }
})
