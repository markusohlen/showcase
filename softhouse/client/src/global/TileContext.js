import React, { useState, createContext } from 'react'
import { getPlayerState } from '../Models/StateModel'

const state = getPlayerState()

export const TileContext = createContext()

export const TileProvider = (props) => {
  const [currentTile, setCurrentTile] = useState(state ? state.currentTile : {})
  return (
    <TileContext.Provider value={{ currentTile, setCurrentTile }}>
      {props.children}
    </TileContext.Provider>
  )
}
