import React, { useState, createContext } from 'react'

export const HighlightContext = createContext()

export const HighlightProvider = (props) => {
  const [highlight, setHighlight] = useState(false)
  return (
    <HighlightContext.Provider value={{ highlight, setHighlight }}>
      {props.children}
    </HighlightContext.Provider>
  )
}
