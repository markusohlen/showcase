import React, { useState, createContext } from 'react'

export const HeaderContext = createContext()

export const HeaderProvider = (props) => {
  const [currentComponent, setCurrentComponent] = useState('profile')
  return (
    <HeaderContext.Provider value={{ currentComponent, setCurrentComponent }}>
      {props.children}
    </HeaderContext.Provider>
  )
}
