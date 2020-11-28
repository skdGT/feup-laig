/**
 * MyTile
 * @constructor
 */

class MyTile extends CGFobject{
    constructor(scene, gameboard, piece, x, y) {
        super(scene);
        this.scene = scene;
        this.gameboard = gameboard;
        this.piece = piece
        this.updatedTexCoords = true; // no need for updateTexCoords

        this.obj = new Plane(scene, 5, 5)

        this.material = new CGFappearance(this.scene)

        this.material.setShininess(10)
        this.material.setEmission(0, 0, 0, 0)
        this.material.setAmbient(0.2, 0.2, 0.2, 1)
        this.material.setDiffuse(0.3, 0.3, 0.3, 1)
        this.material.setSpecular(0.3, 0.3, 0.3, 1)
    };

    getPiece(){
        return this.piece
    }

    setPiece(piece){
        this.piece = piece
    }

    display() {
        this.material.apply()

        this.scene.pushMatrix()
        this.scene.scale(1.69, 1.69, 1)
        this.scene.rotate(Math.PI/2, 1, 0, 0 )
        this.obj.display()
        this.scene.popMatrix()
        
        this.piece.display()
    }
}