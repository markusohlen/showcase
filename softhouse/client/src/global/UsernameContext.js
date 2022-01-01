import React, { useState, createContext } from 'react'

export const UsernameContext = createContext()

export const UsernameProvider = (props) => {
  const [username, setUsername] = useState('Guest')
  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {props.children}
    </UsernameContext.Provider>
  )
}
