import {menuPage} from './menuPage.js';
import {errorPage} from "./errorPage.js";
import {game} from "./game.js";
import {loginPage} from "./loginPage.js";
import {registrationPage} from "./registrationPage.js";
import {bestPage} from "./bestPage.js";
import {aboutPage} from "./aboutPage.js";

const app = document.getElementById('app');
let myAudio = new Audio('./assets/audio/imperial-march.mp3');
myAudio.play();

//функция выбора страниц по хэшу
function switchToStateFromURLHash()  {
    app.innerHTML = null;
    const stateStr = window.location.hash.slice(1);
    switch (stateStr) {
        case 'main':
            app.append(menuPage());
            break;
        case 'game':
            myAudio.pause();
            game();
            break;
        case 'login':
            app.append(loginPage());
            break;
        case 'registration':
            app.append(registrationPage());
            break;
        case 'about':
            myAudio.pause();
            app.append(aboutPage());
            break;
        case 'best':
            app.append(bestPage());
            break;
        case 'exit':
            window.close();
            break;
        default:
            app.append(errorPage());
            break;
    }
}

location.hash = 'main';
switchToStateFromURLHash();
window.addEventListener('hashchange', switchToStateFromURLHash);
window.addEventListener('dblclick',(e)=>{
    e.preventDefault();
    return false;
})
