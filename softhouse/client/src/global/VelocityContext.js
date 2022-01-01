import React, { useState, createContext } from 'react'
import { getPlayerState } from '../Models/StateModel'

const state = getPlayerState()

export const VelocityContext = createContext()

export const VelocityProvider = (props) => {
  const [currentVelocity, setCurrentVelocity] = useState(
    state ? state.currentVelocity : 5
  )
  return (
    <VelocityContext.Provider value={{ currentVelocity, setCurrentVelocity }}>
      {props.children}
    </VelocityContext.Provider>
  )
}
