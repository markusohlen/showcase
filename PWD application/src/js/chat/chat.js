import DefaultTemplate from '../defaultTemplate/DefaultTemplate.js'
import htmlTemplate from './html.js'
import cssTemplate from './css.js'

import selectUsernameTemplate from './selectUsernameTemplate.js'

import SmileySelector from '../SmileySelector/SmileySelector.js'

/**
 * A draggable chat component
 *
 * @this {_apiKey} The api key used for the chat
 * @this {_server} The server used for the chat
 * @this {_storageUsername} The key used to store the username in sessionstorage
 * @this {shadowRoot} The shadowroot of the chat
 *
 * @class Chat
 * @extends {DefaultTemplate}
 */
class Chat extends DefaultTemplate {
  constructor () {
    const config = { height: 500, width: 300, imgUrl: '../../image/chat.png', title: 'Chat' }
    super(config)

    const container = this.shadowRoot.querySelector('.container')
    container.appendChild(htmlTemplate.content.cloneNode(true))
    container.appendChild(cssTemplate.content.cloneNode(true))

    // Constant variables
    this._apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    this._server = 'ws://vhost3.lnu.se:20080/socket/'
    this._storageUsername = 'Chat::SessionStorageUsername'
  }

  /**
   * Creates eventlisteners
   *
   * @this {shadowRoot} The shadowroot of the chat
   * @this {_server} The server used for the chat
   *
   * @memberof Chat
   */
  connectedCallback () {
    this.openUsernameModal()

    const socket = new window.WebSocket(this._server)

    socket.addEventListener('open', event => this.openSocket(event, socket))

    socket.addEventListener('message', event => this.messageSocket(event))

    const openModal = this.shadowRoot.querySelector('#newNickname')
    openModal.addEventListener('click', event => this.openModal(event))

    const close = this.shadowRoot.querySelector('#close')
    close.addEventListener('click', event => this.closeChangeUsernameModal(event, close))

    const body = document.querySelector('.content')
    body.addEventListener('click', event => this.closeChangeUsernameModal(event, body))

    const modal = this.shadowRoot.querySelector('#changeNickModal')
    modal.addEventListener('click', event => this.closeChangeUsernameModal(event, modal))

    const changeUsername = this.shadowRoot.querySelector('#changeNickname')
    changeUsername.addEventListener('click', event => this.changeUsername(event))

    const chatInput = this.shadowRoot.querySelector('#chat-message')
    const smileySelector = new SmileySelector(chatInput)
    this.shadowRoot.querySelector('#smileySelector').appendChild(smileySelector)
  }

  /**
   * Opens a modal for choosing the initial username
   *
   * @this {shadowRoot} The shadowroot of the chat
   *
   * @memberof Chat
   */
  openUsernameModal () {
    if (this.getUsername() === null) {
      const container = this.shadowRoot.querySelector('.container')
      container.appendChild(selectUsernameTemplate.content.cloneNode(true))

      const submitUsername = this.shadowRoot.querySelector('#submitUsername')
      submitUsername.addEventListener('click', event => this.submitUsername(event))
    }
  }

  /**
   * The websocket that sends messages
   *
   * @this {shadowRoot} The shadowroot of the chat
   * @this {_apiKey} The api key used for the chat
   *
   * @param {Object} event - The event for when a socket is open
   * @param {Object} socket - The socket that is open
   * @memberof Chat
   */
  openSocket (event, socket) {
    let sendMsg = this.shadowRoot.querySelector('#sendMsg')
    sendMsg.addEventListener('click', event => {
      event.preventDefault()

      let message = this.shadowRoot.querySelector('#chat-message').value

      if (message.length > 0) {
        let data = {
          'type': 'message',
          'data': message,
          'username': this.getUsername(),
          'key': this._apiKey
        }
        socket.send(JSON.stringify(data))
      }

      this.shadowRoot.querySelector('#chatForm').reset()
    })
  }

  /**
   * Displays a message to the user
   *
   * @this {shadowRoot} The shadowroot of the chat
   *
   * @param {Object} event - The event when a user press the send button
   * @memberof Chat
   */
  messageSocket (event) {
    let jsonData = JSON.parse(event.data)

    if (jsonData.username !== 'The Server') {
      let chatWindow = this.shadowRoot.querySelector('.chat-window')

      let h3 = document.createElement('h3')
      let p = document.createElement('p')

      h3.textContent = jsonData.username
      p.textContent = jsonData.data

      chatWindow.appendChild(h3)
      chatWindow.appendChild(p)

      let scroll = this.shadowRoot.querySelector('.chat-window')
      scroll.scrollTop = scroll.scrollHeight
    }
  }

  /**
   * Displays a module that let's the user change their username
   *
   * @this {shadowRoot} The shadowroot of the chat
   *
   * @param {Object} event - The event for when the user closes the change username modal
   * @memberof Chat
   */
  openModal (event) {
    const modal = this.shadowRoot.querySelector('#changeNickModal')
    modal.style.display = 'block'
  }

  /**
   * Changes the username
   *
   * @this {shadowRoot} The shadowroot of the chat
   *
   * @param {Object} event - The event for when the user presses change username
   * @memberof Chat
   */
  changeUsername (event) {
    event.preventDefault()

    const errorMessageElement = this.shadowRoot.querySelector('#newUsernameErrorMessage')

    const username = this.shadowRoot.querySelector('#newNick').value
    if (username.length >= 3) {
      this.setUsername(username)

      this.shadowRoot.querySelector('#newNickForm').reset()

      this.resetErrorMessage(errorMessageElement)
      this.closeModal()
    } else {
      this.showErrorMessage(errorMessageElement)
    }
  }

  /**
   * Closes the modal that changes the username
   *
   * @this {shadowRoot} The shadowroot of the chat
   *
   * @param {Object} event - The event when a user press the send button
   * @param {Object} target - The html element that allows to close the modal
   * @memberof Chat
   */
  closeChangeUsernameModal (event, target) {
    if (event.target === target) {
      const errorMessageElement = this.shadowRoot.querySelector('#newUsernameErrorMessage')
      this.resetErrorMessage(errorMessageElement)
      this.shadowRoot.querySelector('#newNickForm').reset()

      this.closeModal()
    }
  }

  /**
   * Removes the modal for changing username
   *
   * @this {shadowRoot} The shadowroot of the chat
   *
   * @memberof Chat
   */
  closeModal () {
    const modal = this.shadowRoot.querySelector('#changeNickModal')
    modal.style.display = 'none'
  }

  /**
   * Creates a username
   *
   * @this {shadowRoot} The shadowroot of the chat
   *
   * @param {Object} event - The event for submitting the initial username
   * @memberof Chat
   */
  submitUsername (event) {
    event.preventDefault()
    const errorMessageElement = this.shadowRoot.querySelector('#createUsernameErrorMessage')
    const username = this.shadowRoot.querySelector('#username').value

    if (username.length >= 3) {
      this.setUsername(username)

      this.resetErrorMessage(errorMessageElement)

      const div = this.shadowRoot.querySelector('#createUsernameModal')
      div.parentNode.removeChild(div)
    } else {
      this.showErrorMessage(errorMessageElement)
    }
  }

  /**
   * Resets the error message
   *
   * @param {Object} p - The reference to the html element
   * @memberof Chat
   */
  resetErrorMessage (p) {
    p.textContent = ''
  }

  /**
   * Creates an error message
   *
   * @param {Object} p - The reference to the html element
   * @memberof Chat
   */
  showErrorMessage (p) {
    p.textContent = 'Username too short. At least 3 characters expected.'
  }

  /**
   * Gets the username from localstorage
   *
   * @returns {String} - The username
   * @memberof Chat
   */
  getUsername () {
    return window.sessionStorage.getItem(this._storageUsername)
  }

  /**
   * Sets a new username
   *
   * @param {String} username - The new username
   * @memberof Chat
   */
  setUsername (username) {
    window.sessionStorage.setItem(this._storageUsername, username)
  }
}

window.customElements.define('chat-window', Chat)
