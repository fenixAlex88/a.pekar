const linkArray = document.querySelectorAll('.js-modal-open');
const crossArray = document.querySelectorAll('.js-modal-close');
const overlay = document.querySelector('.overlay');

linkArray.forEach((item) => {
    item.addEventListener('click', (e) => {
        const modalName = item.dataset.modal;
        const modal = document.querySelector('.js-modal[data-modal="' + modalName + '"]');
        modal.classList.add('is-show');
        overlay.classList.add('is-show');

    })
});

crossArray.forEach((cross)=>{
    cross.addEventListener('click',()=>{
        cross.parentElement.classList.remove('is-show');
        overlay.classList.remove('is-show');
    })
});

overlay.addEventListener('click', ()=>{
    overlay.classList.remove('is-show');
    document.querySelector('.js-modal.is-show').classList.remove('is-show');
})
