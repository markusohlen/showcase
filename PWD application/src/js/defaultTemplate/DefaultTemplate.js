import htmlTemplate from './html.js'
import cssTemplate from './css.js'

/**
 * The deafault window
 *
 * @this {shadowRoot} The shadowroot of the chat module
 *
 * @export
 * @class DraggableWindow
 * @extends {window.HTMLElement}
 */
export default class DraggableWindow extends window.HTMLElement {
  constructor (config) {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

    this.applyStyles(config)
    this.active = false

    this.declareEventListeners()
  }

  /**
   * Creates event listeners
   *
   * @this {shadowRoot} The shadowroot of the chat module
   *
   * @memberof DraggableWindow
   */
  declareEventListeners () {
    const element = this.shadowRoot.querySelector('.draggable')
    const body = document.querySelector('body')

    element.addEventListener('mousedown', event => this.startDrag(event), false)
    element.addEventListener('mouseup', event => this.endDrag(event), false)
    body.addEventListener('mousemove', event => this.drag(event), false)
    body.addEventListener('mouseleave', event => this.endDrag(event), false)

    let exit = this.shadowRoot.querySelector('#exit')

    exit.addEventListener('click', event => {
      this.removeElement(this)
    })
  }

  /**
   * Applies styles to the default template
   *
   * @this {shadowRoot} The shadowroot of the chat module
   *
   * @param {Object} config - Object containing all the different styles
   * @memberof DraggableWindow
   */
  applyStyles (config) {
    const container = this.shadowRoot.querySelector('.container')
    container.style.width = config.width + 'px'
    container.style.height = config.height + 'px'

    const img = this.shadowRoot.querySelector('#tempFavicon')
    const imgElement = document.createElement('img')
    imgElement.setAttribute('src', config.imgUrl)
    img.appendChild(imgElement)

    const tempTitle = this.shadowRoot.querySelector('.tempTitle')
    tempTitle.textContent = config.title
  }

  /**
   * Removes an element
   *
   * @param {Object} elem - The element to be removed
   * @memberof DraggableWindow
   */
  removeElement (elem) {
    elem.parentNode.removeChild(elem)
  }

  /**
   * Starts the drag of an element
   *
   * @this {active} - Checks if the mouse is down or not
   * @this {mouseX} - The X position of the mouse
   * @this {mouseY} - The Y position of the mouse
   * @this {offsetLeft} - The ammount of pixels that the element is to the left
   * @this {offsetTop} - The ammount of pixels that the element is to the top
   * @this {diffX} - The X mouse position on the element
   * @this {diffY} - The Y mouse position on the element
   *
   * @param {Object} event - The event for when an element is starting to drag
   * @memberof DraggableWindow
   */
  startDrag (event) {
    this.active = true

    this.mouseX = event.clientX
    this.mouseY = event.clientY

    this.diffX = this.mouseX - this.offsetLeft
    this.diffY = this.mouseY - this.offsetTop
  }

  /**
   * Ends the drag of an element
   *
   * @this {active} - Checks if the mouse is down or not
   *
   * @memberof DraggableWindow
   */
  endDrag () {
    this.active = false
  }

  /**
   * Drags the element around
   *
   * @this {active} - Checks if the mouse is down or not
   * @this {xPos} - The new X position of the element
   * @this {yPos} - The new Y position of the element
   * @this {diffX} - The X mouse position on the element
   * @this {diffY} - The Y mouse position on the element
   *
   * @param {Object} event - The event for draging the mouse
   * @memberof DraggableWindow
   */
  drag (event) {
    if (this.active === true) {
      event.preventDefault()

      this.xPos = event.clientX - this.diffX
      this.yPos = event.clientY - this.diffY

      this.moveItem()
    }
  }

  /**
   * Changes the position of the element
   *
   * @this {style} - The style of the element
   * @this {xPos} - The new X position of the element
   * @this {yPos} - The new Y position of the element
   *
   * @memberof DraggableWindow
   */
  moveItem () {
    this.style.left = this.xPos + 'px'
    this.style.top = this.yPos + 'px'
  }
}
