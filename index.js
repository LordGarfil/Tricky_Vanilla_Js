import { Tricky } from "./Tricky.js"

window.onload = function () {
  let gameRunning = true

  const app = new Tricky()
  app.setPlayerSkins(
    `<i class="fab fa-redhat"></i>`,
    `<i class="far fa-bomb"></i>`
  )
  initGame({
    turno: app.getCurrentPlayer().render,
    ronda: app.round,
  })

  const celdas = document.querySelectorAll(".celda")

  celdas.forEach((celda) => {
    celda.onclick = () => {
      if (gameRunning) {
        const spot = celda.attributes.value.value
        const currenPlayer = app.getCurrentPlayer().render

          const cellFree = app.isSpotFree(spot)
          if (cellFree) {
            app.setPlay(spot, function () {
              renderPlay(celda, currenPlayer)
            })
            nextTurn(app.getCurrentPlayer().render)

            const winner = app.checkWinner()
            if (winner) {
              //message
              console.log("El ganador es ", winner)
              renderWinner(`${winner.render} ha ganado el juego`)
              gameRunning = false
            }else{
              const boardFull = app.isBoardFull()
              if (boardFull){
              renderWinner(`Empate`)
              gameRunning = false
              }
            }
          } else {
            cellFail(celda)
          }
        console.log(app.getBoard())
      }
    }
  })

  const resetButton = document.querySelector('button[name=reset]')
  resetButton.onclick = (e) => {
    app.resetGame()
    resetBoard({player: app.getCurrentPlayer()})
    gameRunning = true
  }

  const nextButton = document.querySelector('button[name=next]')
  nextButton.onclick = (e) => {
    app.nextRound()
    app.resetGame()
    renderNextRound({
      player: app.getCurrentPlayer(),
      ronda: app.round
      })
    gameRunning = true
  }
}

function renderPlay(celda, play) {
  celda.innerHTML = play
}

function initGame(config = null) {
  if (config) {
    const turnoHtml = document.querySelector("div[name=turno] span")
    turnoHtml.innerHTML = config.turno

    const rondaHtml = document.querySelector("div[name=ronda] span")
    rondaHtml.innerHTML = config.ronda
  }
}

function cellFail(celda) {
  celda.classList.add("cell-fail")
  setTimeout(() => {
    celda.classList.remove("cell-fail")
  }, 2000)
}

function renderWinner(message){
  const container = document.querySelector('.winner-info')
  container.style.visibility = 'visible'
  const element = container.querySelector('span')
  element.innerHTML = message
}

function resetBoard(config){
  const celdas = document.querySelectorAll(".celda")
  const turnoHtml = document.querySelector("div[name=turno] span")
  const container = document.querySelector('.winner-info')

  celdas.forEach(celda => {
    celda.innerHTML = null
  })
  turnoHtml.innerHTML = config.player.render
  container.style.visibility = 'hidden'
}

function nextTurn(player){
  const turnoHtml = document.querySelector("div[name=turno] span")
    turnoHtml.innerHTML = player
}

function renderNextRound(config){
  const rondaHtml = document.querySelector("div[name=ronda] span")
  rondaHtml.innerHTML = config.ronda
  resetBoard(config)
}