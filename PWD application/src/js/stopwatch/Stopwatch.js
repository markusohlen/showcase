import DefaultTemplate from '../defaultTemplate/DefaultTemplate.js'
import htmlTemplate from './html.js'
import cssTemplate from './css.js'

/**
 * Stopwatch component
 *
 * @this {shadowRoot} - The shadowroot for a stopwatch
 * @this {timerActive} - Checker to see if the timer is active
 *
 * @class Stopwatch
 * @extends {DefaultTemplate}
 */
class Stopwatch extends DefaultTemplate {
  constructor () {
    const config = { height: 190, width: 335, imgUrl: '../../image/stopwatch.png', title: 'Stopwatch' }
    super(config)

    const container = this.shadowRoot.querySelector('.container')
    container.appendChild(htmlTemplate.content.cloneNode(true))
    container.appendChild(cssTemplate.content.cloneNode(true))

    this.timerActive = false
  }

  /**
   * Creates eventlisteners
   *
   * @this {shadowRoot} - The shadowroot for a stopwatch
   *
   * @memberof Stopwatch
   */
  connectedCallback () {
    const startTimer = this.shadowRoot.querySelector('#startTimer')
    startTimer.addEventListener('click', event => this.startTimer(event))

    const pauseTimer = this.shadowRoot.querySelector('#pauseTimer')
    pauseTimer.addEventListener('click', event => this.pauseTimer(event))

    const resetTimer = this.shadowRoot.querySelector('#resetTimer')
    resetTimer.addEventListener('click', event => this.resetTimer(event))
  }

  /**
   * Starts the timer
   *
   * @this {shadowRoot} - The shadowroot for a stopwatch
   * @this {timerActive} - Checker to see if the timer is active
   * @this {ms} - The milliseconds of the timer
   * @this {s} - The seconds of the timer
   * @this {m} - The minutes of the timer
   * @this {h} - The hours of the timer
   * @this {timer} - The timer
   *
   * @param {Object} event - The event for when the start timer button is pressed
   * @memberof Stopwatch
   */
  startTimer (event) {
    if (this.timerActive === true) return

    this.shadowRoot.querySelector('#startTimer').classList.add('disabled')

    this.timerActive = true

    this.ms = this.ms > 0 ? this.ms : 0
    this.s = this.s > 0 ? this.s : 0
    this.m = this.m > 0 ? this.m : 0
    this.h = this.h > 0 ? this.h : 0

    this.timer = setInterval(() => {
      this.ms++

      this.displayMs()

      this.displayS()

      this.displayM()

      this.displayH()
    }, 10)
  }

  /**
   * Pauses the timer
   *
   * @this {shadowRoot} - The shadowroot for a stopwatch
   * @this {timerActive} - Checker to see if the timer is active
   * @this {timer} - The timer
   *
   * @param {Object} event - The event for when the pause button is pressed
   * @memberof Stopwatch
   */
  pauseTimer (event) {
    this.timerActive = false

    this.shadowRoot.querySelector('#startTimer').classList.remove('disabled')

    clearInterval(this.timer)
  }

  /**
   * Resets the stopwatch
   *
   * @this {ms} - The milliseconds of the timer
   * @this {s} - The seconds of the timer
   * @this {m} - The minutes of the timer
   * @this {h} - The hours of the timer
   *
   * @param {Object} event - The event for when the reset button is pressed
   * @memberof Stopwatch
   */
  resetTimer (event) {
    event.preventDefault()

    this.ms = 0
    this.s = 0
    this.m = 0
    this.h = 0

    this.resetData()
  }

  /**
   * Resets the visual numbers on the stopwatch
   *
   * @this {shadowRoot} - The shadowroot for a stopwatch
   *
   * @memberof Stopwatch
   */
  resetData () {
    this.shadowRoot.querySelector('#ms').textContent = '00'
    this.shadowRoot.querySelector('#s').textContent = '00'
    this.shadowRoot.querySelector('#m').textContent = '00'
    this.shadowRoot.querySelector('#h').textContent = '00'
  }

  /**
   * Displays the milliseconds on the stopwatch
   *
   * @this {shadowRoot} - The shadowroot for a stopwatch
   * @this {ms} - The milliseconds of the timer
   *
   * @memberof Stopwatch
   */
  displayMs () {
    const text = this.shadowRoot.querySelector('#ms')

    if (this.ms <= 9) {
      text.textContent = '0' + this.ms
    } else if (this.ms === 100) {
      text.textContent = '00'
    } else {
      text.textContent = this.ms
    }
  }

  /**
   * Displays the seconds on the stopwatch
   *
   * @this {shadowRoot} - The shadowroot for a stopwatch
   * @this {ms} - The milliseconds of the timer
   * @this {s} - The seconds of the timer
   *
   * @memberof Stopwatch
   */
  displayS () {
    const text = this.shadowRoot.querySelector('#s')

    if (this.ms > 99) {
      this.s++

      if (this.s <= 9) {
        text.textContent = '0' + this.s
      } else if (this.s === 60) {
        text.textContent = '00'
      } else {
        text.textContent = this.s
      }

      this.ms = 0
    }
  }

  /**
   * Displays the minutes on the stopwatch
   *
   * @this {shadowRoot} - The shadowroot for a stopwatch
   * @this {s} - The seconds of the timer
   * @this {m} - The minutes of the timer
   *
   * @memberof Stopwatch
   */
  displayM () {
    const text = this.shadowRoot.querySelector('#m')

    if (this.s > 59) {
      this.m++

      if (this.m <= 9) {
        text.textContent = '0' + this.m
      } else if (this.m === 60) {
        text.textContent = '00'
      } else {
        text.textContent = this.m
      }

      this.s = 0
    }
  }

  /**
   * Displays the hours on the stopwatch
   *
   * @this {shadowRoot} - The shadowroot for a stopwatch
   * @this {m} - The minutes of the timer
   * @this {h} - The hours of the timer
   *
   * @memberof Stopwatch
   */
  displayH () {
    const text = this.shadowRoot.querySelector('#h')

    if (this.m > 59) {
      this.h++

      if (this.h <= 9) {
        text.textContent = '0' + this.h
      } else if (this.h === 60) {
        text.textContent = '00'
      } else {
        text.textContent = this.h
      }

      this.m = 0
    }
  }
}

window.customElements.define('stopwatch-window', Stopwatch)
