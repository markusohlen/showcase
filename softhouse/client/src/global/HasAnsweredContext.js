import React, { useState, createContext } from 'react'
import { getPlayerState } from '../Models/StateModel'

const state = getPlayerState()

export const HasAnsweredContext = createContext()

export const HasAnsweredProvider = (props) => {
  const [hasAnswered, setHasAnswered] = useState(
    state ? state.hasAnswered : true
  )
  return (
    <HasAnsweredContext.Provider value={{ hasAnswered, setHasAnswered }}>
      {props.children}
    </HasAnsweredContext.Provider>
  )
}
