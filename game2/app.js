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

//Создание камеры
const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 2, -14), scene);
camera.setTarget(new BABYLON.Vector3(0, 0, 0));

//Создание света
const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene);
light.intensity = 0.25;

//Создание генератора теней
const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

//СОЗДАНИЕ ПРЕДМЕТОВ
const ballArr = [];
let xWing;
let s = 30;

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);

//Создание монетки
const createCoin = () => {
    BABYLON.SceneLoader.ImportMesh(
        null,
        'assets/x_wing/',
        'scene.gltf',
        scene,
        (meshArray) => {
            xWing = meshArray[0];
            xWing.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
            xWing.position = new BABYLON.Vector3(0.0, 0.0, 0.0);
            shadowGenerator.addShadowCaster(xWing);
            xWing.receiveShadows = true;
            xWing.rotation = new BABYLON.Vector3(0, 0, 0);
        }
    );
}
createCoin();

const createball = () => {
    const ball = new BABYLON.MeshBuilder.CreateSphere('sphere', {
        diametr: 1
    }, scene);
    ball.position = xWing ?
        new BABYLON.Vector3(xWing.position.x + rand(-20, 20), xWing.position.y + rand(-20, 20), 100)
        : new BABYLON.Vector3(rand(-20, 20), rand(-20, 20), 100);
    const ballMaterial = new BABYLON.StandardMaterial('material', scene);
    ballMaterial.emissiveTexture = new BABYLON.Texture('assets/met.webp');
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


//встроенные функции Babylon
scene.registerBeforeRender(() => {
    for (let i = 0; i <= s - ballArr.length; i++) {
        createball()
    }
    ballArr.forEach((ball, i) => {
        if (xWing && ball) {
            if (ball.intersectsMesh(xWing, false)) {
                ball.material.emissiveColor = new BABYLON.Color3(0.5, 0, 0);
            }
        }

        ball.position.z -= ball.s;
        if (ball.position.z < (-10)) {
            ball.dispose();
            ballArr.splice(i, 1);
            createball();
        }
    })
    if (xWing) {
        camera.position.x = xWing.position.x;
        camera.position.y = xWing.position.y + 2;
    }
});

engine.runRenderLoop(() => {
    scene.render();

})

//ОБРАБОТЧИКИ СОБЫТИЙ
let x = 0;
let y = 0;


window.addEventListener('keydown', (e) => {
    if (e.keyCode === 37) {
        console.log('left');
        y -= 0.05;
        xWing.position.x -= 0.2;
        xWing.rotation = new BABYLON.Vector3(0, 0, 0.5);
    }

    if (e.keyCode === 39) {
        console.log('right');
        y += 0.05;
        xWing.position.x += 0.2;
        xWing.rotation = new BABYLON.Vector3(0, 0, -0.5);
    }
    if (e.keyCode === 38) {
        console.log('up');
        xWing.position.y += 0.2;
    }
    if (e.keyCode === 40) {
        console.log('down');
        xWing.position.y -= 0.2;
    }
    if (e.keyCode === 87) {
        xWing.position.x += y * 0.1;
        xWing.position.y -= 0.2 * x;
        xWing.position.z;

    }
    if (e.keyCode === 83) {
        xWing.position.x -= y * 0.1;
        xWing.position.y -= 0.2 * x;
        xWing.position.z;

    }
})

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 37) {
   //     xWing.rotation = new BABYLON.Vector3(0, 0, 0);
    }

    if (e.keyCode === 39) {
    //    xWing.rotation = new BABYLON.Vector3(0, 0, 0);
    }
    if (e.keyCode === 38) {
        xWing.rotation = new BABYLON.Vector3(0, 0, 0);
    }
    if (e.keyCode === 40) {
        xWing.rotation = new BABYLON.Vector3(0, 0, 0);
    }

})