export class Shoot extends BABYLON.MeshBuilder.CreateCapsule {
    constructor(position, xSpeed, ySpeed, zSpeed, yRot, color) {
        super("capsule",
            {
                radius: 0.08,
                height: 2,
                orientation: new BABYLON.Vector3(0, 0, 1)
            });
        this.rotation.y = yRot;
        this.material = new BABYLON.StandardMaterial('material', this.scene);
        this.material.emissiveColor = color;
        this.position = position;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.zSpeed = zSpeed;

    }

    move = () => {
        this.position.x += this.xSpeed;
        this.position.y += this.ySpeed;
        this.position.z += this.zSpeed;
    }
}