export class Tricky {
  constructor() {
    this.board = []
    this.round = 1
    this.players = 2
    this.cells = 9
    this.winner = null
    this.players = [
      {
        value: "x",
        render: "x",
      },
      {
        value: "o",
        render: "o",
      },
    ]
    this.plays = 0
    this.currentPlayer = this.players[0]
  }

  init() {}

  setPlayerSkins(skinX, skinO) {
    this.players[0].render = skinX
    this.players[1].render = skinO
  }

  setPlay(spot, callback) {
    if (!this.isBoardFull()) {
      if (this.isSpotFree(spot)) {
        this.board[spot] = this.getCurrentPlayer().value
        callback()

        this.nextPlay()
      }
    }
  }

  isSpotFree(spot) {
    if (this.board[spot] == undefined) {
      return true
    }

    return false
  }

  isBoardFull() {
    let full = true
    for (let celda = 0; celda < this.cells; celda++) {
      if (this.board[celda] == undefined) {
        full = false
      }
    }
    return full
  }

  nextPlayer() {
    this.currentPlayer
  }

  nextPlay() {
    this.plays++
  }

  nextRound(){
    this.round++
  }

  getBoard() {
    return this.board
  }

  getCurrentPlayer() {
    if ((this.plays + 1) % 2 == 0) {
      return this.players[1]
    }

    return this.players[0]
  }

  getPreviousPlayPlayer() {
    if (this.plays > 0) {
      if ((this.plays - 1) % 2 == 0) {
        return this.players[1]
      }
    }

    return this.players[0]
  }

  checkWinner() {
    let winner = false

    if (this.board[0] == this.board[1] && this.board[0] == this.board[2]) {
      winner = this.players.find((item) => item.value == this.board[0])
    } else if (
      this.board[3] == this.board[4] &&
      this.board[3] == this.board[5]
    ) {
      winner = this.players.find((item) => item.value == this.board[3])
    } else if (
      this.board[6] == this.board[7] &&
      this.board[6] == this.board[8]
    ) {
      winner = this.players.find((item) => item.value == this.board[6])
    } else if (
      this.board[0] == this.board[3] &&
      this.board[0] == this.board[6]
    ) {
      winner = this.players.find((item) => item.value == this.board[0])
    } else if (
      this.board[1] == this.board[4] &&
      this.board[1] == this.board[7]
    ) {
      winner = this.players.find((item) => item.value == this.board[1])
    } else if (
      this.board[2] == this.board[5] &&
      this.board[2] == this.board[8]
    ) {
      winner = this.players.find((item) => item.value == this.board[2])
    } else if (
      this.board[0] == this.board[4] &&
      this.board[0] == this.board[8]
    ) {
      winner = this.players.find((item) => item.value == this.board[0])
    } else if (
      this.board[6] == this.board[4] &&
      this.board[6] == this.board[2]
    ) {
      winner = this.players.find((item) => item.value == this.board[6])
    }else{
      winner = false
    }

    this.winner = winner
    return winner
  }

  getWinner(){
    return this.winner
  }

  resetGame(){
    this.board = []
    this.plays = 0
    this.currentPlayer = this.players[0]
    this.winner = null
  }
}
