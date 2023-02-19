export class Meteor extends BABYLON.MeshBuilder.CreateSphere {
    constructor(position, destroySound) {
        super();
        this.destroySound = destroySound;
        this.position = position;
        this.material = new BABYLON.StandardMaterial('material', this.scene);
        this.material.emissiveTexture = Math.random() < 0.5 ?
            new BABYLON.Texture('assets/met.webp')
            : new BABYLON.Texture('assets/met.jpg');
        this.physicsImpostor = new BABYLON.PhysicsImpostor(this, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: 0
        }, this.scene);
    }

    destroy = () => {
        this.material.emissiveTexture = new BABYLON.Texture('assets/fire.jpg');
        this.material.alpha = 0.7;
        this.scaling = new BABYLON.Vector3(2, 2, 2);
        this.destroySound.play();
        setTimeout(() => {
            this.dispose()
        }, 750)
    };

}