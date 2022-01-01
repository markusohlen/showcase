import React, { useState, createContext } from 'react'
import { getPlayerState } from '../Models/StateModel'

const state = getPlayerState()

export const RetrospectiveContext = createContext()

export const RetrospectiveProvider = (props) => {
  const [retrospective, setRetrospective] = useState(
    state
      ? state.retrospective
      : {
          state: false,
          level: 1
        }
  )
  return (
    <RetrospectiveContext.Provider value={{ retrospective, setRetrospective }}>
      {props.children}
    </RetrospectiveContext.Provider>
  )
}
