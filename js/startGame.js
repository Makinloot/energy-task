import { pushToDatabase } from "../config/firebase"

const startGameBtn = document.getElementById('start-game')
const infoDisplay = document.getElementById('info-display')
const timeDisplay = document.getElementById('time-display')

let gameOver = false
let seconds = 0;
let minutes = 0;
let hours = 0;
let results = {}


function startGame() {

  const everyBoardBlocks = document.querySelectorAll('#player div')
  everyBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
  infoDisplay.innerText = 'თამაში დაიწყო'
  const timer = setInterval(() => {
    updateTimer()

    if(gameOver) {
      clearInterval(timer)
      pushToDatabase(results)
    }
  }, 1000)
}

let playerHits = []
let hitCount = 0;
const playerSunkShips = []

function handleClick(e) {
  if(!gameOver) {
    if(e.target.classList.contains('taken')) {
      e.target.classList.add('destroyed')
      let classes = Array.from(e.target.classList)
      classes = classes.filter(className => className !== 'block')
      classes = classes.filter(className => className !== 'destroyed')
      classes = classes.filter(className => className !== 'taken')
      playerHits.push(...classes)
      checkScore(playerHits, playerSunkShips)
    }

    if(!e.target.classList.contains('taken')) {
      e.target.classList.add('empty')
    }

    hitCount++
    if(hitCount > 49) {
      gameOver = true
      infoDisplay.innerText = 'თქვენ დამარცხდით'
    }
  }
}

function gameResults() {
  results = {
    id: JSON.parse(localStorage.getItem('user')).id,
    name: JSON.parse(localStorage.getItem('user')).name,
    duration: timeDisplay.innerText.split(":\n\n").join(':'),
    hits: hitCount,
    result: infoDisplay.innerText === 'შენ გაიმარჯვე!' ? 'გამარჯვება' : 'დამარცხება'
  }
}

function updateTimer() {
  seconds++;

  if(seconds === 60) {
    seconds = 0;
    minutes++

    if(minutes === 60) {
      minutes = 0;
      hours++
    }
  }

  const formattedTime = `<p>${hours.toString().padStart(2, '0')}:</p>
  <p>${minutes.toString().padStart(2, '0')}:</p>
  <p>${seconds.toString().padStart(2, '0')}</p>`;
  timeDisplay.innerHTML = formattedTime
}

function checkScore(userHits, userSunkShips) {

  const checkShip = (shipName, shipLength) => {
    if(userHits.filter(storedName => storedName === shipName).length === shipLength) {
      infoDisplay.textContent = `შენ ჩაძირე ${shipName}`
      playerHits = userHits.filter(storedName => storedName !== shipName)
      
      userSunkShips.push(shipName)
    }
  }

  checkShip('big-one', 4)
  checkShip('big-two', 4)
  checkShip('small-one', 2)
  checkShip('small-two', 2)

  if(playerSunkShips.length === 4) {
    infoDisplay.innerText = 'შენ გაიმარჯვე!'
    gameOver = true
  }

}

window.addEventListener('click', () => {
  if(gameOver) gameResults()
})

startGameBtn.addEventListener('click', startGame)