import React, { useState, createContext } from 'react'
import { getPlayerState } from '../Models/StateModel'

const state = getPlayerState()

export const PlayerMoveContext = createContext()

export const PlayerMoveProvider = (props) => {
  const [currentPlayerMove, setPlayerMove] = useState(
    state ? state.currentPlayerMove : {}
  )
  return (
    <PlayerMoveContext.Provider value={{ currentPlayerMove, setPlayerMove }}>
      {props.children}
    </PlayerMoveContext.Provider>
  )
}
