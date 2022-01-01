import React, { useState, createContext } from 'react'
import { getPlayerState } from '../Models/StateModel'

const state = getPlayerState()

export const PlayerPositionContext = createContext()

export const PlayerPositionProvider = (props) => {
  const [currentPositionValue, setCurrentPositionValue] = useState(
    state ? state.currentPositionValue : 1
  )
  return (
    <PlayerPositionContext.Provider
      value={{ currentPositionValue, setCurrentPositionValue }}
    >
      {props.children}
    </PlayerPositionContext.Provider>
  )
}
