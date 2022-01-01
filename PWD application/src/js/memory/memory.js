import DefaultTemplate from '../defaultTemplate/DefaultTemplate.js'
import htmlTemplate from './html.js'
import cssTemplate from './css.js'

import brickTemplate from './brickTemplate.js'
import dropdownTemplate from './dropdownTemplate.js'
import endTemplate from './endTemplate.js'

/**
 * Memory component
 *
 * @this {shadowRoot} - The shadowroot of the Memory
 * @this {folderURL} - The URL for the images used in the memory
 * @this {brickIndex} - The custom html attribute for the index of a brick
 * @this {pairs} - The custom html attribute for changing pairs
 * @this {brick1} - The image of the first brick
 * @this {brick2} - The image of the second brick
 * @this {brick1Index} - The index of the first brick
 * @this {ammoutOfPairs} - The ammount of pairs on the board
 * @this {currentPairs} - The ammount of pairs that a player has found
 * @this {tries} - The ammount of times that a player has turned 2 bricks
 * @this {bricks} - The order of the bricks
 *
 * @class Memory
 * @extends {DefaultTemplate}
 */
class Memory extends DefaultTemplate {
  constructor () {
    const config = { height: 460, width: 335, imgUrl: '../../image/ace.png', title: 'Memory' }
    super(config)

    const container = this.shadowRoot.querySelector('.container')
    container.appendChild(htmlTemplate.content.cloneNode(true))
    container.appendChild(cssTemplate.content.cloneNode(true))

    this.folderURL = '../image/memory/'
    this.brickIndex = 'data-brick-index'
    this.pairs = 'data-pairs'

    this.brick1 = null
    this.brick2 = null
    this.brick1Index = null
    this.ammoutOfPairs = 8
    this.currentPairs = 0
    this.tries = 0
    this.bricks = []
  }

  /**
   * Creates event listeners
   *
   * @this {shadowRoot} - The shadowroot of the Memory
   * @this {ammoutOfPairs} - The ammount of pairs on the board
   *
   * @memberof Memory
   */
  connectedCallback () {
    const container = this.shadowRoot.querySelector('.container')
    container.addEventListener('click', event => this.displayDropdown(event))

    this.createNewGame(this.ammoutOfPairs)

    const settings = this.shadowRoot.querySelector('#settings')

    const dropdown = dropdownTemplate.content.cloneNode(true)

    settings.appendChild(dropdown)

    const dropdownMenu = this.shadowRoot.querySelector('#dropdownMenu')
    dropdownMenu.addEventListener('click', event => this.changePairs(event), false)

    const memoryDiv = this.shadowRoot.querySelector('.memory-window')
    memoryDiv.addEventListener('click', event => this.playTurn(event))
  }

  /**
   * Player turns a brick
   *
   * @this {brickIndex} - The custom html attribute for the index of a brick
   * @this {bricks} - The order of the bricks
   *
   * @param {Object} event - The event for when a player press inside the memory window
   * @memberof Memory
   */
  playTurn (event) {
    event.preventDefault()

    const className = event.target.className
    if (className === 'memory-window' || className === 'playAgain') return

    const img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild

    const index = parseInt(img.getAttribute(this.brickIndex))

    this.turnBrick(this.bricks[index], img)
  }

  /**
   * Changes the pairs of a memory game
   *
   * @this {pairs} - The custom html attribute for changing pairs
   * @this {ammoutOfPairs} - The ammount of pairs on the board
   *
   * @param {Object} event - The event for when a player chanes pairs
   * @memberof Memory
   */
  changePairs (event) {
    event.preventDefault()

    const pairs = event.target.getAttribute(this.pairs)

    this.ammoutOfPairs = parseInt(pairs)

    this.createNewGame(pairs)
  }

  /**
   * Wipes the old game and creates a new game
   *
   * @this {tries} - The ammount of times that a player has turned 2 bricks
   * @this {currentPairs} - The ammount of pairs that a player has found
   * @this {bricks} - The order of the bricks
   * @param {Number} pairs - The ammount of pairs that should be created
   * @memberof Memory
   */
  createNewGame (pairs) {
    this.removeEndscreen()
    this.removeExistingGame()
    this.createBricks(pairs)
    this.tries = 0
    this.currentPairs = 0
    this.bricks = this.creatreRandomBrickOrder(pairs)
  }

  /**
   * Removes the existing game
   *
   * @this {shadowRoot} - The shadowroot of the Memory
   *
   * @memberof Memory
   */
  removeExistingGame () {
    const test = this.shadowRoot.querySelector('.card')

    if (test) {
      const div = this.shadowRoot.querySelector('.memory-window')
      div.innerHTML = ''
    }
  }

  /**
   * Displays the change pairs dropdown menu
   *
   * @this {shadowRoot} - The shadowroot of the Memory
   *
   * @param {Object} event - The event for when a playerpress the "Change pairs" button
   * @memberof Memory
   */
  displayDropdown (event) {
    const settings = this.shadowRoot.querySelector('#settings')
    if (event.target !== settings) {
      this.closeDropdown()
    } else {
      const dropdown = this.shadowRoot.querySelector('#dropdownMenu')
      dropdown.style.display = 'block'
    }
  }

  /**
   * Closes the change pairs dropdown
   *
   * @this {shadowRoot} - The shadowroot of the Memory
   *
   * @memberof Memory
   */
  closeDropdown () {
    const dropdown = this.shadowRoot.querySelector('#dropdownMenu')
    dropdown.style.display = 'none'
  }

  /**
   * Creates The brick order
   *
   * @param {Number} numOfBricks - The ammount of bricks to be created
   * @returns {Array} - The shuffled bricks
   * @memberof Memory
   */
  creatreRandomBrickOrder (numOfBricks) {
    let bricks = []
    for (let i = 1; i <= numOfBricks; i++) {
      bricks.push(i)
      bricks.push(i)
    }

    return this.shuffleBricks(bricks)
  }

  /**
   * Shuffles the bricks
   *
   * @param {Array} bricks - The brick order
   * @returns {Array} - The shuffled bricks
   * @memberof Memory
   */
  shuffleBricks (bricks) {
    // https://www.youtube.com/watch?v=8Mt0Buk3rK0&feature=youtu.be
    // Time: 31:02
    for (let i = bricks.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1))
      const temp = bricks[i]
      bricks[i] = bricks[random]
      bricks[random] = temp
    }

    return bricks
  }

  /**
   * Creates the visual bricks
   *
   * @this {shadowRoot} - The shadowroot of the Memory
   *
   * @param {Number} numOfBricks - The ammount of bricks to be created
   * @memberof Memory
   */
  createBricks (numOfBricks) {
    const memoryDiv = this.shadowRoot.querySelector('.memory-window')

    for (let i = 0; i < numOfBricks * 2; i++) {
      this.createBrick(memoryDiv, i)
    }
  }

  /**
   * Displays the bricks in the DOM
   *
   * @this {brickIndex} - The custom html attribute for the index of a brick
   * @param {Object} memoryDiv - The html element to append the brick to
   * @param {Number} i - The index of the brick
   * @memberof Memory
   */
  createBrick (memoryDiv, i) {
    const a = brickTemplate.content.cloneNode(true)
    const img = a.querySelector('.cardImage')

    img.setAttribute(this.brickIndex, i)

    memoryDiv.appendChild(a)
  }

  /**
   * Game logic for turning a brick
   *
   * @this {brick1} - The image of the first brick
   * @this {brick2} - The image of the second brick
   * @this {brick1Index} - The index of the first brick
   * @this {ammoutOfPairs} - The ammount of pairs on the board
   * @this {currentPairs} - The ammount of pairs that a player has found
   * @this {tries} - The ammount of times that a player has turned 2 bricks
   * @this {folderURL} - The URL for the images used in the memory
   *
   * @param {Number} index - The index of the brick that recently got turned
   * @param {Object} img - The html element of the brick that recently got turned
   * @memberof Memory
   */
  turnBrick (index, img) {
    // If the same brick was clicked multiple times
    if (this.brick1 === img) return

    if (this.brick2) return

    img.src = `${this.folderURL + index}.png`

    if (!this.brick1Index) {
      this.brick1Index = index
      this.brick1 = img
    } else {
      this.brick2 = img

      this.tries += 1
      if (this.brick1Index === index) {
        this.currentPairs += 1

        setTimeout(() => {
          img.parentNode.classList.add('hidden')
          this.brick1.parentNode.classList.add('hidden')
        }, 500)

        if (this.currentPairs === this.ammoutOfPairs) {
          this.displayEndWindow()
        }
      }

      this.resetBricks(img)
    }
  }

  /**
   * Displays the window whenever a player has finished a game
   *
   * @this {shadowRoot} - The shadowroot of the Memory
   * @this {tries} - The ammount of times that a player has turned 2 bricks
   *
   * @memberof Memory
   */
  displayEndWindow () {
    const end = endTemplate.content.cloneNode(true)
    const div = this.shadowRoot.querySelector('.memory-window')

    div.innerHTML = ''

    const triesTag = end.querySelector('#tries')
    triesTag.textContent = this.tries
    div.appendChild(end)

    const button = this.shadowRoot.querySelector('.endscreen .button')
    button.addEventListener('click', event => this.createNewGame(this.ammoutOfPairs))
  }

  /**
   * Removes the end screen from the DOM
   *
   * @this {shadowRoot} - The shadowroot of the Memory
   *
   * @memberof Memory
   */
  removeEndscreen () {
    const endscreen = this.shadowRoot.querySelector('.endscreen')
    const div = this.shadowRoot.querySelector('.memory-window')

    if (div.contains(endscreen) === true) {
      endscreen.remove()
    }
  }

  /**
   * Turns the 2 bricks back to normal
   *
   * @this {brick1} - The image of the first brick
   * @this {brick2} - The image of the second brick
   * @this {brick1Index} - The index of the first brick
   * @this {folderURL} - The URL for the images used in the memory
   *
   * @param {Object} img - The brick that recently got turned
   * @memberof Memory
   */
  resetBricks (img) {
    setTimeout(() => {
      img.src = `${this.folderURL}0.png`
      this.brick1.src = `${this.folderURL}0.png`

      this.brick1 = null
      this.brick1Index = null
      this.brick2 = null
    }, 900)
  }
}

window.customElements.define('memory-game', Memory)
