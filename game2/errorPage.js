export function errorPage() {
    const fragment = document.createDocumentFragment();
    const errorPage = document.createElement('div');
    fragment.append(errorPage);
    errorPage.classList.add('errorPage');
    const errorPageCode = document.createElement('h1');
    errorPage.append(errorPageCode);
    errorPageCode.classList.add('a-pos');
    errorPageCode.textContent = '404';
    const errorPageTitle = document.createElement('h2');
    errorPage.append(errorPageTitle);
    errorPageTitle.classList.add('a-pos');
    errorPageTitle.textContent = 'Страница не найдена';
    const errorPageText = document.createElement('p');
    errorPage.append(errorPageText);
    errorPageText.classList.add('a-pos');
    errorPageText.textContent = 'Проверьте URL адрес или перейдете на главную';
    const mainLink = document.createElement('a');
    errorPage.append(mainLink);
    mainLink.classList.add('a-pos', 'btn');
    mainLink.textContent = 'На главную';
    mainLink.onclick = () => {location.hash = 'main'};

return fragment;
}