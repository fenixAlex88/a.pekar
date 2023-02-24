import {Meteor} from "./Meteor.js";
import {Shoot} from "./Shoot.js";
import {userAPImodule} from "./userAPI.module.js";

export function game() {
//СОЗДАНИЕ МИРА
    const app = document.getElementById('app');
    app.innerHTML = null;
    app.style.visibility = 'none';
//создание холста
    const canvas = document.createElement('canvas');
    app.append(canvas);
    canvas.id = 'render-canvas';
//прелодер
    const preloader = document.createElement('div');
    document.body.append(preloader);
    preloader.classList.add('loader', 'a-pos');
//создание пользовательского интерфейса
//создание счетчика очков
    const scoreInfo = document.createElement('p');
    app.append(scoreInfo);
    scoreInfo.id = 'coin-score';
    scoreInfo.classList.add('a-pos');
    scoreInfo.textContent = 0;
//создание полосы здоровья
    const healthInfo = document.createElement('div');
    app.append(healthInfo);
    healthInfo.id = 'health';
    healthInfo.classList.add('a-pos');
    const healthInfoImg = document.createElement('img');
    healthInfo.append(healthInfoImg);
    healthInfoImg.src = 'assets/heart.svg';
    healthInfoImg.classList.add('a-pos');
//создание полосы брони
    const shieldInfo = document.createElement('div');
    app.append(shieldInfo);
    shieldInfo.id = 'shield';
    shieldInfo.classList.add('a-pos');
    const shieldInfoImg = document.createElement('img');
    shieldInfo.append(shieldInfoImg);
    shieldInfoImg.src = 'assets/shield.svg';
    shieldInfoImg.classList.add('a-pos');
//создание полосы щита
    const electroShieldInfo = document.createElement('div');
    app.append(electroShieldInfo);
    electroShieldInfo.id = 'electroShield';
    electroShieldInfo.classList.add('a-pos');
//создание информации об игроке
    const playerInfo = document.createElement('div');
    app.append(playerInfo);
    playerInfo.classList.add('a-pos', 'player_info');
    const playerAvatar = document.createElement('img');
    playerInfo.append(playerAvatar);
    playerAvatar.src = 'assets/avatar1.png';
    playerAvatar.alt = 'avatar';
    const playerName = document.createElement('span');
    playerInfo.append(playerName);
    playerName.textContent = JSON.parse(sessionStorage.player).username;

//Обработка мобильных устройств
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
        .test(navigator.userAgent)) {
        const mobileControlUp = document.createElement('img');
        app.append(mobileControlUp);
        mobileControlUp.src = 'assets/arrow.svg';
        mobileControlUp.id = 'mobileControlUp';
        mobileControlUp.classList.add('a-pos');
        const mobileControlDown = document.createElement('img');
        app.append(mobileControlDown);
        mobileControlDown.src = 'assets/arrow.svg';
        mobileControlDown.id = 'mobileControlDown';
        mobileControlDown.classList.add('a-pos');
        const mobileControlLeft = document.createElement('img');
        app.append(mobileControlLeft);
        mobileControlLeft.src = 'assets/arrow.svg';
        mobileControlLeft.id = 'mobileControlLeft';
        mobileControlLeft.classList.add('a-pos');
        const mobileControlRight = document.createElement('img');
        app.append(mobileControlRight);
        mobileControlRight.src = 'assets/arrow.svg';
        mobileControlRight.id = 'mobileControlRight';
        mobileControlRight.classList.add('a-pos');

        const mobileControlShield = document.createElement('img');
        app.append(mobileControlShield);
        mobileControlShield.src = 'assets/use_shield.svg';
        mobileControlShield.id = 'mobileControlShield';
        mobileControlShield.classList.add('a-pos');

        const mobileControlShoot = document.createElement('div');
        app.append(mobileControlShoot);
        mobileControlShoot.src = 'assets/arrow.svg';
        mobileControlShoot.id = 'mobileControlShoot';
        mobileControlShoot.classList.add('a-pos');

        app.classList.add('mobile');

        mobileControlUp.addEventListener('touchstart', () => ship.yPos += 0.1);
        mobileControlDown.addEventListener('touchstart', () => ship.yPos -= 0.1);
        mobileControlLeft.addEventListener('touchstart', () => ship.rot.y -= alf);
        mobileControlRight.addEventListener('touchstart', () => ship.rot.y += alf);
        mobileControlShoot.addEventListener('touchstart', () => ship.shoot(Math.sin(ship.rot.y), 0, Math.cos(ship.rot.y)));
        mobileControlShield.addEventListener('touchstart', () => {
            if (ship && !ship.shieldlock) {
                ship.shield();
                powerShieldSound.play();
                setTimeout(() => {
                    ship._shield.destroy();
                    powerShieldSound.stop();
                    electroShieldInfo.style.width = '0';
                    electroShieldInfo.style.removeProperty('animation');
                }, 15000);
            }
        })
    }

//создание игрового сообщения
    const createMsg = (imgSrc, mess) => {
        const messageInfo = document.createElement('div');
        app.append(messageInfo);
        messageInfo.classList.add('a-pos', 'message');
        const messageInfoImg = document.createElement('img');
        messageInfo.append(messageInfoImg);
        messageInfoImg.src = imgSrc;
        messageInfoImg.alt = 'message avatar';
        const messageInfoText = document.createElement('span');
        messageInfo.append(messageInfoText);
        messageInfoText.textContent = mess;
        r2d2_1.play();
        setTimeout(() => {
            messageInfo.parentElement.removeChild(messageInfo)
        }, 18000)
    }

//Создание движка
    const engine = new BABYLON.Engine(canvas);

//Создание сцены и присоединение ее к движку
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.3);  //0-1
    scene.enablePhysics();
    scene.createDefaultEnvironment({
        createSkybox: false, createGround: false, cameraContrast: 2.5, cameraExposure: 1
    });
//Создание космоса
    const skybox = new BABYLON.MeshBuilder.CreateBox('skyBox', {size: 7000}, scene);
    const skyboxMateerial = new BABYLON.StandardMaterial('skyBox', scene);
    skyboxMateerial.reflectionTexture = new BABYLON.CubeTexture('assets/environment/Space', scene);
    skyboxMateerial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMateerial.backFaceCulling = false;
    skybox.material = skyboxMateerial;
//Создание камеры

    const camera = new BABYLON.FollowCamera("FollowCam", BABYLON.Vector3.Zero(), scene);
    camera.radius = -20;
    camera.heightOffset = 3;


//Создание света
    const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene);
    light.intensity = 0.5;

//Создание генератора теней
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

//СОЗДАНИЕ ПЕРЕМЕННЫХ
    const meteorArr = [], shootArr = [], enemyshootArr = [], shipsArr = [], alf = Math.PI / 180, s = 200;
    let ship, shield = 11, health = 21, score = 0, isGame = false;
//функция случайного числа между
    const rand = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);

//создание звуков

    const shootSound = new BABYLON.Sound("shoot", "assets/audio/shoot.mp3", scene);
    const explosionSound = new BABYLON.Sound("explosion", "assets/audio/explosion.mp3", scene);
    const powerShieldSound = new BABYLON.Sound("explosion", "assets/audio/power_shield2.mp3", scene, null, {
        loop: true, playbackRate: 2.5
    });
    const r2d2_1 = new BABYLON.Sound("shoot", "assets/audio/r2d2_1.mp3", scene);
    const r2d2_2 = new BABYLON.Sound("shoot", "assets/audio/r2d2_2.mp3", scene);


//Создание корабля
    const createShip = () => {
        BABYLON.SceneLoader.ImportMesh(null, 'assets/x_wing/', 'scene.gltf', scene, (meshArray) => {
            ship = meshArray[0];
            ship.position = new BABYLON.Vector3(0.0, 0.0, 0);
            shadowGenerator.addShadowCaster(ship);
            ship.receiveShadows = true;
            ship.yPos = 0;
            camera.lockedTarget = ship;
            ship.scaling = new BABYLON.Vector3(1.0, 1.0, 1.0);
            ship.rot = {
                x: 0, y: 0, z: 0
            }, ship.shieldlock = false;
            ship.lockshoot = false;
            ship.shield = () => {
                ship._shield = new BABYLON.MeshBuilder.CreateSphere('sphere', scene);
                ship._shield.position = ship.position;
                ship._shield.material = new BABYLON.StandardMaterial('material', scene);
                ship._shield.material.emissiveTexture = new BABYLON.Texture('assets/shield.jpg');
                ship._shield.physicsImpostor = new BABYLON.PhysicsImpostor(ship._shield, BABYLON.PhysicsImpostor.SphereImpostor, {
                    mass: 0
                }, scene);
                ship._shield.material.alpha = 0.4;
                ship._shield.scaling = new BABYLON.Vector3(7, 7.2, 6.5);
                ship._shield.xRot = 0;
                ship._shield.yRot = 0;
                ship._shield.zRot = 0;
                ship._shield.destroy = () => {
                    ship._shield.dispose();
                    delete ship._shield;
                };
                ship.shieldlock = true;
                electroShieldInfo.style.animation = 'electroShield-reducing  15s forwards';
            };
            ship.shoot = (xSpeed, ySpeed, zSpeed) => {
                if (!ship.lockshoot) {
                    ship.lockshoot = true;
                    const shoot = new Shoot(new BABYLON.Vector3(ship.position.x, ship.position.y + 0.1, ship.position.z), xSpeed, ySpeed, zSpeed, ship.rotation.y, new BABYLON.Color3(0, 0, 1));
                    shootArr.push(shoot);
                    shootSound.play();
                    setTimeout(() => {
                        ship.lockshoot = false
                    }, 550);
                }
            };
            ship.damage = (_damage) => {
                r2d2_2.play();
                if (shield - _damage >= 0) {
                    shield -= _damage
                } else {
                    health -= (_damage - shield);
                    shield = 0;
                }
                if (health <= 0) {
                    gameOver();
                    alert(`                     GAME OVER!!!\n                  Ваш результат ${score}`);
                    location.hash = 'main';
                }
            };
            ship.move = () => {
                ship.position.x += 0.05 * Math.sin(ship.rot.y);
                ship.position.y = ship.yPos;
                ship.position.z += 0.05 * Math.cos(ship.rot.y);
                ship.rotation = new BABYLON.Vector3(ship.rot.x, ship.rot.y, ship.rot.z);
            };
        })

    }
    createShip();

    const createEnemyShip = () => {
        BABYLON.SceneLoader.ImportMesh(null, 'assets/tie/', 'scene.gltf', scene, (meshArray) => {
            const enemysheep = meshArray[0];
            enemysheep.position = new BABYLON.Vector3(ship.position.x + rand(-75, 75), ship.position.y + rand(-50, 50), ship.position.z + rand(200, 250));
            shadowGenerator.addShadowCaster(enemysheep);
            enemysheep.receiveShadows = true;
            enemysheep.yPos = 0;
            enemysheep.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
            enemysheep.lockshoot = false;
            enemysheep.health = 15;
            enemysheep.shoot = (xSpeed, ySpeed, zSpeed) => {
                if (!enemysheep.lockshoot) {
                    enemysheep.lockshoot = true;
                    const shoot = new Shoot(new BABYLON.Vector3(enemysheep.position.x, enemysheep.position.y + 0.1, enemysheep.position.z), xSpeed, ySpeed, zSpeed, enemysheep.rotation.y, new BABYLON.Color3(0, 1, 0));
                    enemyshootArr.push(shoot);
                    setTimeout(() => {
                        enemysheep.lockshoot = false
                    }, 2000);
                }
            }
            enemysheep.rotEnemyShip = {
                x: 0, y: Math.PI, z: 0, cur: 0
            };
            shipsArr.push(enemysheep);
        });
    }
//АЛГОРИТМ
//функции
    function gameOver(){
        if (timerEnemyMsg) clearTimeout(timerEnemyMsg);
        isGame = false;
        window.removeEventListener('keydown', controls);
        if (!JSON.parse(sessionStorage.player).score || score > JSON.parse(sessionStorage.player).score)
            userAPImodule.saveScore(JSON.parse(sessionStorage.player).id, score);
    }

    setTimeout(() => {
        preloader.parentElement.removeChild(preloader);
        app.removeAttribute('style');
        isGame = true;
        createMsg('assets/solo.jpg', `ВНИМАНИЕ ПИЛОТ!!! 
    Твоим первым заданием будет очистка пояса астероидов. Уничтожь как можно больше камней за 5 минут. Расчисти путь для флота повстанцев!!!`);
    }, 3000);

    const timerEnemyMsg = setTimeout(() => {
        for (let i = 0; i < 1; i++) {
            createEnemyShip();
        }
        createMsg('assets/solo.jpg', `ВНИМАНИЕ ПИЛОТ!!! 
    В зоне твоего полета найдены имперские штурмовики! Они не должны обнаружить местоположение нашей базы! Уничтожь их!`);
    }, 60000);

    function videoWin() {
        app.innerHTML = null;
        const video = document.createElement('video');
        app.append(video);
        video.src = './assets/video/video_win.mp4';
        video.style.width = '100%';
        video.style.height = '100vh';
        video.controls = false;
        video.autoplay = "autoplay";
    }

//встроенные функции Babylon
    scene.registerBeforeRender(() => {

        shipsArr.forEach((_ship, i) => {
            _ship.shoot(Math.sin(_ship.rotEnemyShip.y), 0, Math.cos(_ship.rotEnemyShip.y));

            if (Math.abs(_ship.position.x - ship.position.x) > 250 || Math.abs(_ship.position.y - ship.position.y) > 100 || Math.abs(_ship.position.z - ship.position.z) > 250) {
                _ship.dispose();
                shipsArr.splice(i, 1);
            }

            _ship.rotEnemyShip.cur = Math.PI + Math.asin((_ship.position.x - ship.position.x) / (Math.sqrt(Math.pow(_ship.position.x - ship.position.x, 2) + Math.pow(_ship.position.z - ship.position.z, 2))));

            if (_ship.rotEnemyShip.y < _ship.rotEnemyShip.cur) {
                _ship.rotEnemyShip.y += alf / 2;
            } else {
                _ship.rotEnemyShip.y -= alf / 2;
            }
            _ship.position.x += 0.04 * Math.sin(_ship.rotEnemyShip.y)
            if (_ship.position.y > ship.position.y) _ship.position.y -= 0.07;
            if (_ship.position.y < ship.position.y) _ship.position.y += 0.07;
            _ship.position.z += 0.04 * Math.cos(_ship.rotEnemyShip.y)
            _ship.rotation = new BABYLON.Vector3(_ship.rotEnemyShip.x, _ship.rotEnemyShip.y, _ship.rotEnemyShip.z);

        })

        if (ship && ship._shield) {
            ship._shield.xRot += 0.23;
            ship._shield.xRot += 0.30;
            ship._shield.xRot += 0.27;
            ship._shield.rotation = new BABYLON.Vector3(ship._shield.xRot, ship._shield.yRot, ship._shield.zRot);
            ship._shield.position = ship.position;
        }

        enemyshootArr.forEach((shoot, index) => {
            shoot.move();

            if (Math.abs(shoot.position.x - ship.position.x) < 1.5 && Math.abs(shoot.position.y - ship.position.y) < 1.5 && Math.abs(shoot.position.z - ship.position.z) < 1.5) {
                shoot.dispose();
                enemyshootArr.splice(index, 1);

                if (!ship._shield) ship.damage(5);
            }
        })

        shootArr.forEach((shoot, index) => {
            shoot.move();

            if (ship && (Math.abs(shoot.position.x - ship.position.x) > 200 || Math.abs(shoot.position.y - ship.position.y) > 200 || Math.abs(shoot.position.z - ship.position.z) > 200)) {
                shoot.dispose();
                shootArr.splice(index, 1);
            }


            shipsArr.forEach((ship, i) => {
                if (Math.abs(shoot.position.x - ship.position.x) < 1.5 && Math.abs(shoot.position.y - ship.position.y) < 1.5 && Math.abs(shoot.position.z - ship.position.z) < 1.5) {
                    shoot.dispose();
                    shootArr.splice(index, 1);
                    ship.health = -5;
                    if (ship.health <= 0) {
                        ship.dispose();
                        shipsArr.splice(i, 1);
                        score += 100;
                        explosionSound.play();
                        if (!shipsArr.length) {
                            createMsg('assets/solo.jpg', `ПИЛОТ!!! 
    Ты справился и уничтожил патруль! Возвращайся на базу!`);
                            setTimeout(() => {
                                gameOver();
                                videoWin();
                            }, 20000);
                            setTimeout(() => {
                                location.hash = 'main';
                            }, 30000);
                        }
                    }
                }
            })
        })
//Создание метеоритов
        for (let i = 0; i <= s - meteorArr.length; i++) {
            const position = ship ? new BABYLON.Vector3(ship.position.x + rand(-100, 100), ship.position.y + rand(-100, 100), ship.position.z + rand(-100, 100)) : new BABYLON.Vector3(rand(-100, 100), rand(-100, 100), rand(-100, 100));
            meteorArr.push(new Meteor(position, explosionSound, 'sphere', {
                diameter: rand(1, 6), segments: 8
            }, scene))
        }


        meteorArr.forEach((meteor, i) => {
            if (ship) {
                if (Math.abs(meteor.position.x - ship.position.x) < 2 && Math.abs(meteor.position.y - ship.position.y) < 2 && Math.abs(meteor.position.z - ship.position.z) < 2) {
                    meteor.destroy();
                    meteorArr.splice(i, 1);
                    if (!ship._shield) ship.damage(20);
                }
                if (Math.abs(meteor.position.x - ship.position.x) > 100 || Math.abs(meteor.position.y - ship.position.y) > 100 || Math.abs(meteor.position.z - ship.position.z) > 100) {
                    meteor.dispose();
                    meteorArr.splice(i, 1);

                }
            }
            shootArr.forEach((shoot, index) => {
                if (meteor.intersectsMesh(shoot, true)) {
                    shoot.dispose();
                    shootArr.splice(index, 1);
                    score++;
                    meteor.destroy();
                    meteorArr.splice(i, 1);
                }
            })
        })
        if (ship) ship.move();

//Изменения интерфейса
        scoreInfo.textContent = score;
        healthInfo.style.width = `${health}vh`;
        shieldInfo.style.width = `${shield}vh`;
    });

    engine.runRenderLoop(() => {
        isGame ? scene.render() : null;

    })

//ОБРАБОТЧИКИ СОБЫТИЙ
    window.addEventListener('keydown', controls);

    function controls(e) {
        switch (e.keyCode) {
            case 192:
                ship.damage(5000);
                break;
            case 37:
                ship.rot.y -= alf;
                ship.rot.z = 20 * alf;
                break;
            case 39:
                ship.rot.y += alf;
                ship.rot.z = -20 * alf;
                break;
            case 38:
                ship.yPos += 0.1;
                ship.rot.x = -7 * alf;
                break;
            case 40:
                ship.yPos -= 0.1;
                ship.rot.x = 7 * alf;
                break;
            case 32:
                ship.shoot(Math.sin(ship.rot.y), 0, Math.cos(ship.rot.y));
                break;
            case 16:
                if (ship && !ship.shieldlock) {
                    ship.shield();
                    powerShieldSound.play();
                    setTimeout(() => {
                        ship._shield.destroy();
                        powerShieldSound.stop();
                        electroShieldInfo.style.width = '0';
                        electroShieldInfo.style.removeProperty('animation');
                    }, 15000);
                }
                break;
        }
    }

    window.addEventListener('keyup', (e) => {
        if (e.keyCode === 37 || e.keyCode === 39) {
            ship.rot.z = 0;
        }
        if (e.keyCode === 38 || e.keyCode === 40) {
            ship.rot.x = 0;
        }
    })

    window.onbeforeunload = function () {
        return "Are you sure?";
    }
}