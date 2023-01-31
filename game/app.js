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

//Создание камеры
const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(6, 3, -10), scene);
camera.setTarget(new BABYLON.Vector3(0, 0, 0));

//Создание света
const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene);
light.intensity = 0.25;

//Создание генератора теней
const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

//СОЗДАНИЕ ПРЕДМЕТОВ
const boxArr = [];
const coinArr = [];


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
            coin.scaling = new BABYLON.Vector3(0.08, 0.08, 0.08);
            coin.position = pos;
            shadowGenerator.addShadowCaster(coin);
            coin.receiveShadows = true;
            coinArr.push(coin);
        }
    );
}

BABYLON.SceneLoader.ImportMesh(
    null,
    'assets/mustang/',
    'scene.gltf',
    scene,
    (meshArray) => {
        const car = meshArray[0];
        car.position = new BABYLON.Vector3(0, 0, 0);
        shadowGenerator.addShadowCaster(car);
        car.receiveShadows = true;
    }
);

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
            createCoin(new BABYLON.Vector3(2 * i - 2, 1, zPos + 3))
            continue;
        }
        createBox(2 * i - 2, zPos)
    }
}
for (let i = 0; i < 10; i++) {
    createRowBox(i * 6);
}

//Создание мяча и материала
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
const restartBtn = document.querySelector('#restart-btn');
scene.registerBeforeRender(() => {
    boxArr.forEach((box) => {
        if (ball.intersectsMesh(box, true)) {
            box.material.emissiveColor = new BABYLON.Color3(0.5, 0, 0);
        }
    })
    coinArr.forEach((coin) => {
        if (ball.intersectsMesh(coin, false)) {
            coin.dispose();
        }
    })
});

engine.runRenderLoop(() => {
    camera.position.z = ball.getAbsolutePosition().z - 12;
    light.position.z = ball.getAbsolutePosition().z;
    scene.render();

})

//ОБРАБОТЧИКИ СОБЫТИЙ
restartBtn.addEventListener('click', () => window.location.reload());

window.addEventListener('touchstart', (e) => {
    const x = e.touches[0].screenX;
    console.log(x);
    if (x > (window.screen.width / 2)) {
        ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(5, 0, 0), ball.getAbsolutePosition())
    } else {
        ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(-5, 0, 0), ball.getAbsolutePosition())
    }

});

window.addEventListener('touchend', () => {
    ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 5));
    ball.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
});
