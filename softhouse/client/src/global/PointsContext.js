import React, { useState, createContext } from 'react'
import { getPlayerState } from '../Models/StateModel'

const state = getPlayerState()

export const PointsContext = createContext()

export const PointsProvider = (props) => {
  const [points, setPoints] = useState(state ? state.points : 0)
  return (
    <PointsContext.Provider value={{ points, setPoints }}>
      {props.children}
    </PointsContext.Provider>
  )
}
