//СОЗДАНИЕ МИРА
const canvas = document.querySelector('#render-canvas');

//Создание движка
const engine = new BABYLON.Engine(canvas);

//Создание сцены и присоединение ее к движку
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.3);  //0-1
scene.enablePhysics();
scene.createDefaultEnvironment({
    createSkybox: false,
    createGround: false,
    cameraContrast: 2.5,
    cameraExposure: 1
});
//Создание неба
const skybox = new BABYLON.MeshBuilder.CreateBox('skyBox', {size: 1000}, scene);
const skyboxMateerial = new BABYLON.StandardMaterial('skyBox', scene);
skyboxMateerial.reflectionTexture = new BABYLON.CubeTexture('assets/environment/TropicalSunnyDay', scene);
skyboxMateerial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMateerial.backFaceCulling = false;
skybox.material = skyboxMateerial;
//Создание моря
const waterGround = new BABYLON.MeshBuilder.CreateGround('ground', {width: 512, height: 512}, scene);
const waterMaterial = new BABYLON.WaterMaterial('water', scene);
waterMaterial.bumpTexture = new BABYLON.Texture('assets/environment/waterbump.png', scene);
waterMaterial.addToRenderList(skybox);
waterGround.material = waterMaterial;
waterGround.position = new BABYLON.Vector3(0, -3, 0);
//создание дна
const ground = new BABYLON.MeshBuilder.CreateGround('ground', {width: 128, height: 128}, scene);
const groundmaterial = new BABYLON.StandardMaterial('material', scene);
groundmaterial.emissiveTexture = new BABYLON.Texture('assets/environment/ground.jpg');
ground.material = groundmaterial;
ground.position = new BABYLON.Vector3(0, -5, 13);
waterMaterial.addToRenderList(ground);

//Создание камеры
const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 8, -14), scene);
camera.setTarget(new BABYLON.Vector3(0, 0, 0));

//Создание света
const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene);
light.intensity = 0.25;

//Создание генератора теней
const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

//СОЗДАНИЕ ПРЕДМЕТОВ
const boxArr = [];
const coinArr = [];
const pointArr = [];


//Создание платформы и материала
//let box = new BABYLON.Mesh.CreateBox('box', 2, scene);

const createPlatform = (zPos) => {
    const platform = new BABYLON.MeshBuilder.CreateBox('box', {
        width: 6, height: 0.1, depth: 6, wrap: false
    }, scene);
//Создание материала
    const boxMaterial = new BABYLON.StandardMaterial('material', scene);
//boxMaterial.emissiveColor = new BABYLON.Color3(0.58, 0, 0);
    boxMaterial.emissiveTexture = new BABYLON.Texture('assets/wood-31.jpg');
    platform.material = boxMaterial;
    platform.receiveShadows = true;
    platform.physicsImpostor = new BABYLON.PhysicsImpostor(platform, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 0
    }, scene);
    platform.position.z = zPos;
};

for (let i = 0; i < 10; i++) {
    createPlatform(i * 6);
}

//Создание монетки
const createCoin = (pos) => {
    BABYLON.SceneLoader.ImportMesh(
        null,
        'assets/coin/',
        'scene.gltf',
        scene,
        (meshArray) => {
            const coin = meshArray[0];
            coin.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
            coin.position = pos;
            shadowGenerator.addShadowCaster(coin);
            coin.receiveShadows = true;
            coinArr.push(coin);
        }
    );
}


//Создание препятствий
//let lastRand = 0;

const createBox = (xPos, zPos) => {
    const box = new BABYLON.MeshBuilder.CreateBox('box', {
        width: 2, height: 1, depth: 1
    }, scene);
    box.position = new BABYLON.Vector3(xPos, 0.6, zPos + 3);
    box.material = new BABYLON.StandardMaterial('material', scene);
    box.material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 0
    }, scene);
    shadowGenerator.getShadowMap().renderList.push(box);
    box.receiveShadows = true;
    boxArr.push(box);
}

const createRowBox = (zPos) => {
    let rand = Math.floor(Math.random() * 3);
    /* while (rand===lastRand){
         rand = Math.floor(Math.random() * 3);
     }
     lastRand = rand;*/
    for (let i = 0; i < 3; i++) {
        if (i === rand) {
            if (Math.random() < 0.5) {
                createCoin(new BABYLON.Vector3(2 * i - 2, 1, zPos + 3));
            }
            pointArr.push(new BABYLON.Vector3(2 * i - 2, 1, zPos + 3));
            continue;
        }
        createBox(2 * i - 2, zPos)
    }
}
for (let i = 0; i < 10; i++) {
    createRowBox(i * 6);
}
//Создание мяча и материала
let car;
setTimeout(()=>{
BABYLON.SceneLoader.ImportMesh(
    null,
    'assets/mustang/',
    'scene.gltf',
    scene,
    (meshArray) => {
        car = meshArray[0];
        car.position = new BABYLON.Vector3(0, 6, 0);
        shadowGenerator.addShadowCaster(car);
        car.receiveShadows = true;
        car.physicsImpostor = new BABYLON.PhysicsImpostor(car, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: 1, // restitution: 4,
            friction: 5
        }, scene);
    }
)},20);


const ball = new BABYLON.MeshBuilder.CreateSphere('sphere', {
    diametr: 1
}, scene);
ball.position.y = 6;
const ballMaterial = new BABYLON.StandardMaterial('material', scene);
ballMaterial.emissiveTexture = new BABYLON.Texture('assets/ball.png');
ball.material = ballMaterial;
shadowGenerator.getShadowMap().renderList.push(ball);
ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, {
    mass: 1, // restitution: 4,
    friction: 5
}, scene);


//АЛГОРИТМ
//Теги
const scoreInfo = document.querySelector('#score');
const coinScoreInfo = document.querySelector('#coin-score');
const restartBtn = document.querySelector('#restart-btn');
const playScreen = document.querySelector('#play-screen');
const gameOverScreen = document.querySelector('#game-over-screen');
const bestScoreInfo = document.querySelector('#best-score');
const nowScoreInfo = document.querySelector('#now-score');

//Переменные
let score = 0;
let coinScore = 0;
let state = 'play';
let ballMoveLeft = false;
let ballMoveRight = false;

//функции
const saveCoinScore = () => {
    localStorage.coinScore = coinScore;
}
const loadCoinScore = () => {
    coinScore = localStorage.coinScore ? localStorage.coinScore : 0;
    coinScoreInfo.textContent = coinScore;
}
loadCoinScore();

const saveBestScore = () => {
    localStorage.bestScore = score;
}

const loadBestScore = () => localStorage.bestScore ? localStorage.bestScore : 0;


const setGameOverScreen = () => {
    playScreen.style.display = 'none';
    gameOverScreen.style.display = 'block';
    let bestScore = loadBestScore();
    if (score > bestScore) {
        saveBestScore();
        bestScore = score;
        bestScoreInfo.style.color = '#0003ad';
        nowScoreInfo.style.color = '#0003ad';
    }
    bestScoreInfo.textContent = `BEST: ${bestScore}`;
    nowScoreInfo.textContent = `NOW: ${score}`;
}

//встроенные функции Babylon
scene.registerBeforeRender(() => {
    if (car) {

    }

    if (ballMoveLeft && ball.getAbsolutePosition().x > -3) {
        ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(-1.2, 0, 0), ball.getAbsolutePosition())
    }
    if (ballMoveRight && ball.getAbsolutePosition().x < 3) {
        ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(1.2, 0, 0), ball.getAbsolutePosition())
    }
    boxArr.forEach((box) => {
        if (ball.intersectsMesh(box, true)) {
            box.material.emissiveColor = new BABYLON.Color3(0.5, 0, 0);
            setGameOverScreen();
            state = 'game over';
        }
    })
    coinArr.forEach((coin, index) => {
        if (ball.intersectsMesh(coin, false)) {
            coinScore++;
            coinScoreInfo.textContent = coinScore;
            saveCoinScore();
            coin.dispose();
            coinArr.splice(index, 1);
        }
    })
    pointArr.forEach((point, index) => {
        if (ball.intersectsPoint(point)) {
            pointArr.splice(index, 1);
            score++;
            scoreInfo.textContent = score;
        }
    })
    skybox.position.z = ball.getAbsolutePosition().z;
    waterGround.z = ball.getAbsolutePosition().z;
    ground.z = ball.getAbsolutePosition().z + 13;
    camera.position.z = ball.getAbsolutePosition().z - 12;
    light.position.z = ball.getAbsolutePosition().z;
});

engine.runRenderLoop(() => {
    scene.render();

})

//ОБРАБОТЧИКИ СОБЫТИЙ
restartBtn.addEventListener('click', () => window.location.reload());

window.addEventListener('touchstart', (e) => {
    if (state !== 'game over') {
        const x = e.touches[0].screenX;
        if (x > (window.screen.width / 2)) {
            ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(5, 0, 0), ball.getAbsolutePosition())
        } else {
            ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(-5, 0, 0), ball.getAbsolutePosition())
        }
    } else window.location.reload();
});

window.addEventListener('touchend', () => {
    ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 5));
    ball.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
});
let y = 3.3;
window.addEventListener('keydown', (e) => {
    console.log(e.keyCode)
    ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
    ball.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
    if (e.keyCode === 37) {
        coinArr.forEach((coin) => {
            y -= 0.05;
            coin.rotation = new BABYLON.Vector3(0, y, 0);
        })
    }

    if (e.keyCode === 39) {
        coinArr.forEach((coin) => {
            console.log(y)
            y += 0.05;
            coin.rotation = new BABYLON.Vector3(0, y, 0);
        })
    }
    if (e.keyCode === 38) {
        coinArr.forEach((coin) => {
            coin.position.z -= 1;
        })
    }
    if (e.keyCode === 40) {
        coinArr.forEach((coin) => {
            coin.position.z += 1;
        })
    }
})

window.addEventListener('keyup', (e) => {
    if (e.keyCode === 37) ballMoveLeft = false;
    car.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 5));
    if (e.keyCode === 39) ballMoveRight = false;
})