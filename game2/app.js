import {menuPage} from './menuPage.js';
import {errorPage} from "./errorPage.js";
import {game} from "./game.js";
import {loginPage} from "./loginPage.js";
import {registrationPage} from "./registrationPage.js";
import {bestPage} from "./bestPage.js";
import {aboutPage} from "./aboutPage.js";

const app = document.getElementById('app');
const myAudio = new Audio;
//функция выбора страниц по хэшу
function switchToStateFromURLHash()  {
    app.innerHTML = null;
    const stateStr = window.location.hash.slice(1);
    switch (stateStr) {
        case 'main':
            app.append(menuPage());
            audioPlay('./assets/audio/imperial-march.mp3');
            break;
        case 'game':
            audioPlay('./assets/audio/fight.mp3');
            game();
            break;
        case 'login':
            app.append(loginPage());
            break;
        case 'registration':
            app.append(registrationPage());
            break;
        case 'about':
            audioPlay('./assets/audio/about.mp3');
            app.append(aboutPage());
            break;
        case 'best':
            app.append(bestPage());
            break;
        case 'exit':
            window.open('', '_self', ''); //bug fix
            window.close();
            break;
        default:
            myAudio.muted = 'muted';
            app.append(errorPage());
            break;
    }
}

function audioPlay(src){
    myAudio.src = src;
    myAudio.play();
}

location.hash = 'main';
switchToStateFromURLHash();
window.addEventListener('hashchange', switchToStateFromURLHash);
