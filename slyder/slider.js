const slider = document.getElementById('slider');
const nextSlideBtn = document.getElementById('nextSlideBtn');
const prevSlideBtn = document.getElementById('prevSlideBtn');
const sliderItems = slider.children;

Array.from(sliderItems).forEach((slide, i) => {
    if (i > 0) slide.classList.add('hidden');
    slide.dataset.index = i;
});

slider.addEventListener('click', (event) => {
    event.target.classList.add('hidden');
    const slideIndex = +event.target.dataset.index
    const nextSlideIndex = slideIndex + 1 < sliderItems.length ? slideIndex + 1 : 0;
    sliderItems[nextSlideIndex].classList.remove('hidden');
})

nextSlideBtn.addEventListener('click', () => {
    const active = sliderItems.querySelector('*:not(.hidden)');
    active.classList.add('hidden');
    const slideIndex = +active.dataset.index
    const nextSlideIndex = slideIndex + 1 < sliderItems.length ? slideIndex + 1 : 0;
    sliderItems[nextSlideIndex].classList.remove('hidden');
});

prevSlideBtn.addEventListener('click', () => {
    const active = sliderItems.querySelector('*:not(.hidden)');
    active.classList.add('hidden');
    const slideIndex = +active.dataset.index;
    const nextSlideIndex = slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1;
    sliderItems[nextSlideIndex].classList.remove('hidden');
});

