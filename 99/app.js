//СОЗДАНИЕ МИРА
const canvas = document.querySelector('#render-canvas');

//Создание движка
const engine = new BABYLON.Engine(canvas);

//Создание сцены и присоединение ее к движку
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);

const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene);
light.intensity = 0.25;

const box = new BABYLON.Mesh.CreateBox('box', 2, scene);
box.rotation.x = -0.6;
box.rotation.y = -0.4;
const boxMaterial = new BABYLON.StandardMaterial('material', scene);
boxMaterial.emissiveColor = new BABYLON.Color3(0.58, 0, 0);
box.material = boxMaterial;



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
        camera.target = car.position;
    }
);

engine.runRenderLoop(() => {
    scene.render();
})


window.addEventListener('keydown', () => {
    box.position.z -= 0.1;
})