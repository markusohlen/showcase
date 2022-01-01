/**
 * Where the player enters its Username in the beginning of the game.
 *
 * @version 1.0.0
 */

import '../../styles/username.css'
import { UsernameContext } from '../../global/UsernameContext'
import { useEffect, useState, useContext } from 'react'

import React from 'react'
import ReactModal from 'react-modal'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

function UsernameModal() {
  const { setUsername } = useContext(UsernameContext)
  const [isOpen, setIsOpen] = useState(true)

  const usernameCookieKey = 'Username::Cookie'

  useEffect(() => {
    const usernameCookie = cookies.get(usernameCookieKey)

    if (usernameCookie) {
      setUsername(usernameCookie)
      closeModal()
    }
  }, [])

  const closeModal = () => setIsOpen(false)

  const submitUsername = (e) => {
    e.preventDefault()

    const name = document.querySelector('#username').value

    if (name.length === 0) return

    setUsername(name)
    setCookie(usernameCookieKey, name)

    closeModal()
  }

  const setCookie = (key, value) =>
    cookies.set(key, value, { path: '/', sameSite: 'lax' })

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      data={{
        background: '#ffffffa8;'
      }}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 15,
          overflow: 'auto'
        },
        content: {
          position: 'absolute',
          top: '30%',
          left: '30%',
          right: '30%',
          bottom: '30%',
          zIndex: 15,
          overflow: 'auto',
          border: '5px solid #dc823d',
          borderRadius: '30px'
        }
      }}
    >
      <div className="username-container">
        <h1>Select username</h1>
        <form className="username-form" onSubmit={(e) => submitUsername(e)}>
          <div className="username-row">
            <label htmlFor="username">Username</label>
            <input type="text" className="input-data" id="username" />
          </div>

          <input type="submit" name="submit" value="Submit" />
        </form>
      </div>
    </ReactModal>
  )
}

export default UsernameModal
