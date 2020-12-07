class MyGameBoard extends CGFobject{
    constructor(scene, centerx, centerz, size, properties){
        super(scene)
        this.scene = scene
        this.centerx = centerx
        this.centerz = centerz
        this.size = size
        this.properties = properties
        this.board = []
        this.updatedTexCoords = true; // no need for updateTexCoords

        this.boardsides = new MyBoardFrame(this.scene, properties.player1.material, properties.player2.material, size)

        this.createBoard()
    }

    createBoard(){
        let pieceType = 1
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let tile = new MyTile(
                    this.scene,
                    this, x, y,
                    this.properties.tiles.material,
                    this.properties.tiles.texture)
                let piece = new MyPiece(
                    this.scene,
                    pieceType,
                    (pieceType === 1) ? this.properties.player1.material : this.properties.player2.material,
                    (pieceType === 1) ? this.properties.player1.texture : this.properties.player2.texture,
                    this.properties.model)
                tile.setPiece(piece)
                piece.setTile(tile)
                this.board.push(tile)
                pieceType = -pieceType
            }
            if (this.size % 2 === 0)
                pieceType = -pieceType
        }
    }

    toString() {
        let board = [];
        let index = 0;
        for (let y = 0; y < this.size; y++) {
            let row = []
            for (let x = 0; x < this.size; x++) {
                if (this.board[index].piece) {
                    row.push(this.board[index].piece.player)
                } else {
                    row.push(0)
                }
                index++;
            }
            board.push(row)
        }
        return JSON.stringify(board)
    }

    update(t) {
        for (let i = 0; i < this.board.length; i++) {
            this.board[i].update(t)
        }
    }

    /**
     *
     * @param x
     * @param y
     * @returns {MyTile} tile
     */
    getTile(x, y) {
        // this needs to be enhanced
        return this.board[y*this.size + x]
    }

    highlightEnemyTiles(tiles) {
        for (let i = 0; i < tiles.length; i++) {
            let tile = this.getTile(tiles[i][0], tiles[i][1])
            tile.friend = false
            tile.highlightTile(false)
        }
    }

    disableHighlight() {
        for (let i = 0; i < this.board.length; i++) {
            this.board[i].disableHighlighting()
        }
    }

    logPicking() {
		if (this.scene.pickMode === false) {
			if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
				for (let i = 0; i < this.scene.pickResults.length; i++) {
                    const obj = this.scene.pickResults[i][0];
                    if (obj instanceof MyTile) {
                        this.orchestrator.pickTile(obj)

                        const customId = this.scene.pickResults[i][1];
                        console.log("Picked object: " + obj.toString() + ", with pick id " + customId);
					}
				}
				this.scene.pickResults.splice(0, this.scene.pickResults.length);
			}
		}
	}

    display(){
        this.logPicking()
        this.scene.clearPickRegistration();

        this.scene.pushMatrix()
        this.scene.translate(this.centerx, 0, this.centerz)
        this.boardsides.display()
        this.scene.popMatrix()

        this.scene.multMatrix(this.properties.transformations)

        let index = 0
        for (let z = 0; z < this.size; z++) {
            for (let x = 0; x < this.size; x++) {
                this.scene.registerForPick(index + 1, this.board[index]);

                this.scene.pushMatrix()
                this.scene.translate(this.centerx, 0, this.centerz)
                this.scene.translate(x - (this.size/2) + 0.5, 0, z - (this.size/2) + 0.5)
                this.board[index].display()
                this.scene.popMatrix()
                index++
            }
        }
    }

    /**
     * Low-Level Method to move a piece from one tile to another
     * as the original tile should have a piece, we dont need to pass
     * it as an argument, instead, we throw an exception in case the original
     * tile does not contain a piece
     *
     * The exception is just here to remind us that we cannot initiate a move
     * when no piece is available on the tile, but this will be handled by prolog
     * backend
     *
     * @param originalTile      {MyTile} Original Tile
     * @param destinationTile   {MyTile} Destination Tile
     * @return {MyPiece} moved
     */
    movePiece(originalTile, destinationTile) {
        const piece = originalTile.getPiece()
        if (piece == null) throw new Error("movePiece(): Tile does not contain a piece to move!")

        destinationTile.setPiece(piece)
        originalTile.unsetPiece()

        console.log("Piece Moved")

        return piece
    }

    clone() {
        let board = new MyGameBoard(this.scene, this.centerx, this.centerz, this.size, this.properties)
        board.board = []
        let clonedBoard = []
        this.board.forEach((value => {
            let tile = new MyTile(
                this.scene,
                board, value.x, value.y,
                this.properties.tiles.material,
                this.properties.tiles.texture)
            if (value.piece) {
                let piece = new MyPiece(
                    this.scene,
                    value.piece.player,
                    (value.piece.player === 1) ? this.properties.player1.material : this.properties.player2.material,
                    (value.piece.player === 1) ? this.properties.player1.texture : this.properties.player2.texture,
                    this.properties.model)
                tile.setPiece(piece)
            }
            clonedBoard.push(tile)
            // clonedBoard.push(value)
        }))
        board.board = clonedBoard
        return board
    }
}