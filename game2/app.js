import {menu} from './menu.js';
import {errorPage} from "./errorPage.js";
import {game} from "./game.js";

const app = document.getElementById('app');

//функция выбора страниц по хэшу
function switchToStateFromURLHash()  {
    app.innerHTML = null;
    const stateStr = window.location.hash.slice(1);
    console.log(stateStr);
    switch (stateStr) {
        case 'main':
            app.append(menu());
            break;
        case 'game':
            game();
            break;
        default:
            app.append(errorPage());
            break;
    }
}
location.hash = 'main';
switchToStateFromURLHash();
window.addEventListener('hashchange', switchToStateFromURLHash);