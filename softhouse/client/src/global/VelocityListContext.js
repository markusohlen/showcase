import React, { useState, createContext } from 'react'
import { getPlayerState } from '../Models/StateModel'

const state = getPlayerState()

export const VelocityListContext = createContext()

export const VelocityListProvider = (props) => {
  const [velocityList, addToVelovityList] = useState(
    state ? state.velocityList : []
  )
  return (
    <VelocityListContext.Provider value={{ velocityList, addToVelovityList }}>
      {props.children}
    </VelocityListContext.Provider>
  )
}
