//СОЗДАНИЕ МИРА
const canvas = document.querySelector('#render-canvas');

//Выборка элементов
const scoreInfo = document.querySelector('#coin-score');
const healthInfo = document.querySelector('#health');
const shieldInfo = document.querySelector('#shield');

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

//Создание камеры
const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
camera.setTarget(new BABYLON.Vector3(0, 0, 0));

//Создание света
const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene);
light.intensity = 0.25;

//Создание генератора теней
const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

//СОЗДАНИЕ ПРЕДМЕТОВ
const ballArr = [];
const shootArr = [];
let xWing;
let s = 66;
let shield = 100;
let health = 200;
let score = 0;
let isGame = true;
const rotXWing = {
    x: 0,
    y: 0,
    z: 0
};

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);

//Создание монетки
const createXWing = () => {
    BABYLON.SceneLoader.ImportMesh(
        null,
        'assets/x_wing/',
        'scene.gltf',
        scene,
        (meshArray) => {
            xWing = meshArray[0];
            xWing.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
            xWing.position = new BABYLON.Vector3(0.0, -1.0, 0.0);
            shadowGenerator.addShadowCaster(xWing);
            xWing.receiveShadows = true;
            xWing.rotation = new BABYLON.Vector3(0, 0, 0);
        }
    );
}
createXWing();

const createball = () => {
    const ball = new BABYLON.MeshBuilder.CreateSphere('sphere', scene);
    ball.position = xWing ?
        new BABYLON.Vector3(xWing.position.x + rand(-20, 20), xWing.position.y + rand(-20, 20), 100)
        : new BABYLON.Vector3(rand(-20, 20), rand(-20, 20), 100);
    const ballMaterial = new BABYLON.StandardMaterial('material', scene);
    ballMaterial.emissiveTexture = Math.random() < 0.5 ?
        new BABYLON.Texture('assets/met.webp')
        : new BABYLON.Texture('assets/met.jpg');
    ball.material = ballMaterial;
    shadowGenerator.getShadowMap().renderList.push(ball);
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, {
        mass: 0
    }, scene);
    ball.s = rand(1, 3) / 10;
    ballArr.push(ball);
}
//АЛГОРИТМ
//функции
const createShoot = () => {
    const shoot1 = new BABYLON.MeshBuilder.CreateCapsule("capsule",
        {
            radius: 0.04,
            height: 2,
            orientation: BABYLON.Vector3.Forward()
        });
    shoot1.material = new BABYLON.StandardMaterial('material', scene);
    shoot1.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
    shoot1.position = xWing ? new BABYLON.Vector3(xWing.position.x + 1.2, xWing.position.y, xWing.position.z + 1) : new BABYLON.Vector3(0, 0, 0);
    shootArr.push(shoot1);
    const shoot2 = new BABYLON.MeshBuilder.CreateCapsule("capsule",
        {
            radius: 0.04,
            height: 2,
            orientation: BABYLON.Vector3.Forward()
        });
    shoot2.material = new BABYLON.StandardMaterial('material', scene);
    shoot2.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
    shoot2.position = xWing ? new BABYLON.Vector3(xWing.position.x - 1.2, xWing.position.y, xWing.position.z + 1) : new BABYLON.Vector3(0, 0, 0);
    shootArr.push(shoot2);
};
const demage = (_demage) => {
    if (shield - _demage >= 0) {
        shield -= _demage
    } else {
        health -= (_demage - shield);
        shield = 0;
    }
    if (health <= 0) {
        isGame = false;
    }
}
//встроенные функции Babylon
scene.registerBeforeRender(() => {
    shootArr.forEach((shoot, index) => {
        shoot.position.z += 1;
        if (shoot.position.z > 100) {
            shoot.dispose();
            shootArr.splice(index, 1);
        }
    })

    for (let i = 0; i <= s - ballArr.length; i++) {
        createball()
    }
    ballArr.forEach((ball, i) => {
        if (xWing && ball) {
            if (ball.intersectsMesh(xWing, true)) {
                ball.dispose();
                ballArr.splice(i, 1);
                demage(100);
            }
        }
        if (ball.del>=5) {
            ball.del++;
            ball.dispose();
            ballArr.splice(i, 1);
        }
        ball.position.z -= ball.s;
        if (ball.position.z < (-10)) {
            ball.dispose();
            ballArr.splice(i, 1);
        }
        shootArr.forEach((shoot, index) => {
            if (ball.intersectsMesh(shoot, true)) {
                shoot.dispose();
                shootArr.splice(index, 1);
                score++;
                ball.material.emissiveTexture = new BABYLON.Texture('assets/fire.jpg');
                ball.scaling = new BABYLON.Vector3(2, 2, 2);
                ball.del = 1;

                //   ball.dispose();
                //  ballArr.splice(i, 1);
            }
        })
    })
    if (xWing) {
        camera.position.x = xWing.position.x;
        camera.position.y = xWing.position.y + 2;
        xWing.rotation = new BABYLON.Vector3(rotXWing.x, rotXWing.y, rotXWing.z);
    }

//Изменения интерфейса
    scoreInfo.textContent = score;
    healthInfo.style.width = `${health}px`;
    shieldInfo.style.width = `${shield}px`;
});

engine.runRenderLoop(() => {
    isGame ? scene.render() : null;

})

//ОБРАБОТЧИКИ СОБЫТИЙ


window.addEventListener('keydown', (e) => {
    if (e.keyCode === 37) {
        rotXWing.z = 0.5;
        xWing.position.x -= 0.2;
    }

    if (e.keyCode === 39) {
        rotXWing.z = -0.5;
        xWing.position.x += 0.2;
    }
    if (e.keyCode === 38) {
        rotXWing.x = -0.2;
        xWing.position.y += 0.2;
    }
    if (e.keyCode === 40) {
        rotXWing.x = 0.2;
        xWing.position.y -= 0.2;
    }

})

window.addEventListener('keyup', (e) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
        rotXWing.z = 0;
    }
    if (e.keyCode === 38 || e.keyCode === 40) {
        rotXWing.x = 0;
    }
})
window.addEventListener('keypress', (e) => {
    if (e.keyCode === 32) {
        createShoot();
    }
})