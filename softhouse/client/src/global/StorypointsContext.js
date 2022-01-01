import React, { useState, createContext } from 'react'
import { getPlayerState } from '../Models/StateModel'

const state = getPlayerState()

export const StorypointsContext = createContext()

export const StorypointsProvider = (props) => {
  const [currentStorypoints, setCurrentStorypoints] = useState(
    state ? state.currentStorypoints : 200
  )
  return (
    <StorypointsContext.Provider
      value={{ currentStorypoints, setCurrentStorypoints }}
    >
      {props.children}
    </StorypointsContext.Provider>
  )
}
