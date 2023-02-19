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


class newBox extends BABYLON.Mesh.CreateBox {
    constructor() {
        super();
        this.rotation.x = -0.6;
        this.rotation.y = -0.8;
        this.material = new BABYLON.StandardMaterial('material', scene);
        this.material.emissiveColor = new BABYLON.Color3(0.58, 0, 0);
    }

    rot = () => {
        console.log(1);
        this.rotation.x += 0.1;
        this.rotation.y += 0.2;
    }
}

const box = new newBox('box', 2, scene);


engine.runRenderLoop(() => {
    scene.render();
})
