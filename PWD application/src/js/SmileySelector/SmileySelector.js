import htmlTemplate from './html.js'
import cssTemplate from './css.js'

/**
 * Smiley selector component
 *
 * @this {shadowRoot} - The shadowroot of the SmileySelector
 * @this {textfield} - The textfield where smileys will appear
 * @this {smileys} - The smileys
 * @this {smileySelectorAppended} - A checker to see if the SmileySelector is appended
 *
 * @export
 * @class SmileySelector
 * @extends {window.HTMLElement}
 */
export default class SmileySelector extends window.HTMLElement {
  constructor (textfield) {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this.textfield = textfield
    this.smileys = []
    this.smileySelectorAppended = false
  }

  /**
   * Creates event listeners
   *
   * @this {shadowRoot} - The shadowroot of the SmileySelector
   *
   * @memberof SmileySelector
   */
  connectedCallback () {
    this.appendSmileySelector()
    this.fetchSmileys()

    const appendSmileySelector = this.shadowRoot.querySelector('.appendSmileySelector')
    appendSmileySelector.addEventListener('click', event => this.displaySmileySelector(event))

    const smileys = this.shadowRoot.querySelector('.selectorTemplate')
    smileys.addEventListener('click', event => this.writeSmiley(event))

    const close = this.shadowRoot.querySelector('#closeSelector')
    close.addEventListener('click', event => this.closeSmileySelector())
  }

  /**
   * Fetches smileys from an api
   *
   * @this {smileys} - The smileys
   *
   * @memberof SmileySelector
   */
  async fetchSmileys () {
    const smileyUrl = 'https://unpkg.com/emoji.json@12.1.0/emoji.json'

    let res = await window.fetch(smileyUrl)
    res = await res.json()

    let whitelist = ['Smileys & Emotion', 'Objects']
    let smileys = []
    res.forEach(smiley => {
      const charToRemove = smiley.category.indexOf(' (')
      const smileyCategory = smiley.category.substring(0, charToRemove)

      for (let i = 0; i < whitelist.length; i++) {
        if (whitelist[i] === smileyCategory) {
          smileys.push(smiley)
        }
      }
    })

    this.smileys = smileys
  }

  /**
   * Writes a smiley to the textfield
   *
   * @this {textfield} - The textfield where smileys will appear
   *
   * @param {Object} event - The event for when a user presses a smiley
   * @memberof SmileySelector
   */
  writeSmiley (event) {
    event.preventDefault()

    const classList = event.target.classList

    if (classList.contains('smiley') || classList.contains('smileyDiv')) {
      this.textfield.value += event.target.textContent

      this.closeSmileySelector()
    }
  }

  /**
   * Closes the SmileySelector
   *
   * @this {shadowRoot} - The shadowroot of the SmileySelector
   *
   * @memberof SmileySelector
   */
  closeSmileySelector () {
    const div = this.shadowRoot.querySelector('.smileySelector')
    div.classList.replace('active', 'inactive')
  }

  /**
   * Displays the SmileySelector
   *
   * @this {shadowRoot} - The shadowroot of the SmileySelector
   *
   * @param {Object} event - The event for when a user opens the SmileySelector
   * @memberof SmileySelector
   */
  displaySmileySelector (event) {
    const div = this.shadowRoot.querySelector('.smileySelector')
    div.classList.replace('inactive', 'active')
  }

  /**
   * Appends the SmileySelector to the DOM
   *
   * @this {shadowRoot} - The shadowroot of the SmileySelector
   * @this {smileys} - The smileyselectorAppended
   * @this {smileys} - The smileys
   * @memberof SmileySelector
   */
  async appendSmileySelector () {
    await this.fetchSmileys()

    if (this.smileySelectorAppended === false) {
      this.smileySelectorAppended = true

      const template = this.shadowRoot.querySelector('.selectorTemplate')

      this.smileys.forEach(smiley => {
        const div = document.createElement('div')
        const p = document.createElement('p')

        div.classList.add('smileyDiv')
        p.classList.add('smiley')

        p.textContent = smiley.char

        div.appendChild(p)
        template.appendChild(div)
      })
    }
  }
}

window.customElements.define('smiley-selector', SmileySelector)
