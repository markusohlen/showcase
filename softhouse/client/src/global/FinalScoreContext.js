import React, { useState, createContext } from 'react'

export const FinalScoreContext = createContext()

export const FinalScoreProvider = (props) => {
  const [finalScore, setFinalScore] = useState(0)
  return (
    <FinalScoreContext.Provider value={{ finalScore, setFinalScore }}>
      {props.children}
    </FinalScoreContext.Provider>
  )
}
