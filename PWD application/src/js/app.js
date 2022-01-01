import './chat/Chat.js'
import './memory/Memory.js'
import './stopwatch/Stopwatch.js'

let windows = []
// Chat
let chat = document.querySelector('#chat')
chat.addEventListener('click', event => {
  event.preventDefault()

  let chatWindow = document.createElement('chat-window')
  document.querySelector('.content').appendChild(chatWindow)
  windows.push(chatWindow)
})

// Memory
let memory = document.querySelector('#memory')
memory.addEventListener('click', event => {
  event.preventDefault()

  let memoryGame = document.createElement('memory-game')
  document.querySelector('.content').appendChild(memoryGame)
  windows.push(memoryGame)
})

// Stopwatch
let stopwatch = document.querySelector('#stopwatch')
stopwatch.addEventListener('click', event => {
  event.preventDefault()

  let stopwatchWindow = document.createElement('stopwatch-window')
  document.querySelector('.content').appendChild(stopwatchWindow)
  windows.push(stopwatchWindow)
})

// Sets focus on the window that is clicked
const doc = document.querySelector('.content')
doc.addEventListener('mousedown', event => {
  windows.forEach(window => {
    window === event.target ? window.style.zIndex = 1 : window.style.zIndex = 0
  })
})
