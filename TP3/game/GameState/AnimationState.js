class AnimationState extends GameState {
    constructor(orchestrator) {
        super(orchestrator);

        this.waitingReply = false
    }

    pickTile(tile) {
        // do nothing as an animation is taking place
    }

    animationEnd() {
        if (!this.waitingReply) {
            this.waitingReply = true
            this.orchestrator.prolog.checkWinner(this, (reply) => {
                if (reply === 1) {
                    this.orchestrator.updatePlayer1Score(++this.orchestrator.player1score)
                    this.orchestrator.custom.log("Winner: Player 1")
                    this.orchestrator.hud.updateMessage("Player 1 Wins".toUpperCase())
                    this.orchestrator.changeState(new GameOverState(this.orchestrator))
                } else if (reply === -1) {
                    this.orchestrator.updatePlayer2Score(++this.orchestrator.player2score)
                    this.orchestrator.hud.updateMessage("Player 2 Wins".toUpperCase())
                    this.orchestrator.custom.log("Winner: Player 2")
                    this.orchestrator.changeState(new GameOverState(this.orchestrator))
                } else if (reply === 0) {
                    this.orchestrator.custom.extraInfo("No Winner Yet")
                    this.orchestrator.nextTurn()
                }
            })
        }
    }

    update(time) {
        this.orchestrator.themes[this.orchestrator.selectedTheme].updateAnimations(time);
        this.orchestrator.gameboard.update(time)

        if (this.orchestrator.currentMovement.animationCompleted) {
            this.orchestrator.animationEnd()
        }

        this.orchestrator.hud.updateTime(Utils.formatTime(time - this.orchestrator.startTime))

        this.orchestrator.animator.update(time)
    }

    undo() {
        // cannot undo while animating
    }
}