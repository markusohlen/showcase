import React, { useState, createContext } from 'react'

export const DaysContext = createContext()

export const DaysProvider = (props) => {
  const [days, setDays] = useState([
    { number: 1, name: 'Monday', boardValue: 1, color: 'white' },
    { number: 2, name: 'Tuesday', boardValue: 2, color: 'orange' },
    { number: 3, name: 'Wednesday', boardValue: 3, color: 'blue' },
    { number: 4, name: 'Thursday', boardValue: 4, color: 'white' },
    { number: 5, name: 'Friday', boardValue: 5, color: 'orange' },
    { number: 6, name: 'Saturday', boardValue: 6, color: 'blue' },
    { number: 7, name: 'Sunday', boardValue: 7, color: 'white' },
    { number: 8, name: 'Monday', boardValue: 8, color: 'blue' },
    { number: 9, name: 'Tuesday', boardValue: 9, color: 'orange' },
    { number: 10, name: 'Wednesday', boardValue: 10, color: 'blue' },
    { number: 11, name: 'Thursday', boardValue: 11, color: 'white' },
    { number: 12, name: 'Day of illness', boardValue: '', color: 'red' },
    { number: 13, name: 'Friday', boardValue: 12, color: 'orange' },
    { number: 14, name: 'Saturday', boardValue: 13, color: 'blue' },
    { number: 15, name: 'Sunday', boardValue: 14, color: 'white' },
    { number: 16, name: 'Monday', boardValue: 15, color: 'orange' },
    { number: 17, name: 'Tuesday', boardValue: 16, color: 'blue' },
    { number: 18, name: 'Wednesday', boardValue: 17, color: 'white' },
    { number: 19, name: 'Thursday', boardValue: 18, color: 'orange' },
    { number: 20, name: 'Friday', boardValue: 19, color: 'white' },
    { number: 21, name: 'Saturday', boardValue: 20, color: 'blue' },
    { number: 22, name: 'Sunday', boardValue: 21, color: 'orange' }
  ])
  return (
    <DaysContext.Provider value={{ days, setDays }}>
      {props.children}
    </DaysContext.Provider>
  )
}
