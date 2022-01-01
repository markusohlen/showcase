import React, { useState, createContext } from 'react'

export const HamburgerContext = createContext()

export const HamburgerProvider = (props) => {
  const [active, setActive] = useState(false)
  return (
    <HamburgerContext.Provider value={{ active, setActive }}>
      {props.children}
    </HamburgerContext.Provider>
  )
}
