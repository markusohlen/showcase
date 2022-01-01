import React, { useState, createContext } from 'react'
import { getPlayerState } from '../Models/StateModel'

const state = getPlayerState()

export const CurrentCardContext = createContext()

export const CurrentCardProvider = (props) => {
  const [currentCard, setCurrentCard] = useState(
    state ? state.currentCard : {}
  )
  return (
    <CurrentCardContext.Provider value={{ currentCard, setCurrentCard }}>
      {props.children}
    </CurrentCardContext.Provider>
  )
}
