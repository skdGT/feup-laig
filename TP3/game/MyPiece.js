/**
 * MyPiece
 * @constructor
 */

class MyPiece extends CGFobject{
    constructor(scene, type, material, texture) {
        super(scene);
        this.scene = scene;
        this.type = type;
        this.updatedTexCoords = true; // no need for updateTexCoords


        this.material = material
        this.texture = texture
        this.tile = null

        this.obj = new MyCylinder(scene, 0.1, 0.5, 0.5, 4, 4)

        /*this.redmaterial = new CGFappearance(this.scene)
        this.redmaterial.setShininess(10)
        this.redmaterial.setEmission(0, 0, 0, 0)
        this.redmaterial.setAmbient(0.3, 0.2, 0.2, 1)
        this.redmaterial.setDiffuse(0.60, 0.05, 0.08, 1)
        this.redmaterial.setSpecular(0.1, 0.2, 0.2, 1)

        this.bluematerial = new CGFappearance(this.scene)
        this.bluematerial.setShininess(10)
        this.bluematerial.setEmission(0, 0, 0, 0)
        this.bluematerial.setAmbient(0.2, 0.2, 0.3, 1)
        this.bluematerial.setDiffuse(0.06, 0.2, 0.50, 1)
        this.bluematerial.setSpecular(0.1, 0.1, 0.2, 1)*/
    };

    getType(){
        return this.type
    }

    setType(type){
        this.type = type
    }

    getTile(){
        return this.tile
    }

    setTile(tile){
        this.tile = tile
    }

    display() {
        this.scene.pushMatrix()

        this.material.apply()
        if (this.texture)
            this.texture.bind()

        this.scene.rotate(Math.PI/4, 0, 0, 1)
        this.obj.display()
        this.scene.popMatrix()
    }

    toString() {
        return (this.type === 1) ? "Red Piece" : "Blue Piece"
    }
}

/*
usar com cylinder

*/