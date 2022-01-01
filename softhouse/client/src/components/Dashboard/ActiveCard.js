/**
 * The holder for the open cards.
 *
 * @version 1.0.0
 */

import '../../styles/active-card.css'
import { CurrentCardContext } from '../../global/CurrentCardContext'
import { HasAnsweredContext } from '../../global/HasAnsweredContext'
import { VelocityContext } from '../../global/VelocityContext'
import { VelocityListContext } from '../../global/VelocityListContext'
import { HighlightContext } from '../../global/HighlightContext'
import { PointsContext } from '../../global/PointsContext'
import info from '../../pictures/info.png'

import { useContext, useState, useEffect } from 'react'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

const cookieName = 'ConsequenceCookie::ActiveCard'

function ActiveCard() {
  const { currentCard } = useContext(CurrentCardContext)
  const { hasAnswered, setHasAnswered } = useContext(HasAnsweredContext)
  const { currentVelocity, setCurrentVelocity } = useContext(VelocityContext)
  const { velocityList, addToVelovityList } = useContext(VelocityListContext)
  const { highlight } = useContext(HighlightContext)

  const [toggle, setToggle] = useState('')
  const [consequence, setConsequence] = useState(
    cookies.get(cookieName) ? cookies.get(cookieName) : ''
  )
  const { points, setPoints } = useContext(PointsContext)

  /**
   * Changes Velocity everytime player ends up on card with absolute event.
   */
  useEffect(() => {
    // TODO: Tycker det är fult att denna if-sats görs både här och nere i renderNoAlternatives(). Men vet inte hur jag ska göra.
    // Om jag gör changeVelocity(currentCard.velocity) i renderNoAlternatives() tas det bort velocity poäng flera ggr.

    // Vi tror att det är denna kod som skapar buggen att man kan få Velocity när man renderar om sidan.

    if (
      currentCard.category === 'day-of-illness-card' ||
      currentCard.category === 'customer-card' ||
      currentCard.category === 'daily-stand-up-card'
    ) {
      if (currentCard.alternatives === undefined) {
        changeVelocity(currentCard.velocity)
      }
    }
  }, [currentCard])

  const renderCard = () => {
    if (currentCard.alternatives) {
      return renderAlternatives()
    } else {
      return renderNoAlternatives()
    }
  }

  useEffect(() => {
    cookies.set(cookieName, consequence)
  }, [consequence])

  /**
   * Renders card with alternatives.
   *
   * @returns JSX for correct card.
   */
  const renderAlternatives = () => {
    if (!hasAnswered) {
      return (
        <>
          <h1 className="card-header">{currentCard.title}</h1>

          <p className="active-card-question">{currentCard.question}</p>

          <form onSubmit={(e) => handleSubmit(e)}>
            {currentCard.alternatives.map((alternative, index) => (
              <div key={index}>
                <label className="card-label-container">
                  {alternative.answer}
                  <input
                    type="radio"
                    value={alternative.answer}
                    onChange={(e) => handleToggle(e)}
                    name="radio"
                    required
                  />
                  <span className="alt"></span>
                </label>
              </div>
            ))}

            <input type="submit" value="Reply" className="btn" />
          </form>
        </>
      )
    } else {
      return renderConsequence()
    }
  }

  /**
   * Renders card without alternatives.
   *
   * @returns JSX for correct card.
   */
  const renderNoAlternatives = () => {
    if (currentCard.category === 'normal-day-card') {
      return renderNormalDay()
    } else if (
      currentCard.category === 'day-of-illness-card' ||
      currentCard.category === 'customer-card' ||
      currentCard.category === 'daily-stand-up-card'
    ) {
      return (
        <>
          <h1 className="card-header">{currentCard.title}</h1>
          <p className="active-card-question">{currentCard.information}</p>
          <div className="fun-fact-wrapper">
            <div className="icon-fun-fact"></div>

            <div className="text-fun-fact">
              <p className="fun-fact">{currentCard.consequence}</p>
            </div>
          </div>
        </>
      )
    } else {
      return <h1 className="card-header">Click dice to start the game</h1>
    }
  }

  /**
   * @returns JSX for normal day card.
   */
  const renderNormalDay = () => {
    return (
      <>
        <h1 className="card-header">{currentCard.title}</h1>
        <p className="active-card-question">{currentCard.information}</p>
        <div className="fun-fact-wrapper">
          <div className="icon-fun-fact">
            <img alt="information" src={info} />
          </div>

          <div className="text-fun-fact">
            <p className="fun-fact">{currentCard.funFact}</p>
          </div>
        </div>
      </>
    )
  }

  const handleToggle = (e) => {
    setToggle(e.target.value)
  }

  /**
   *
   * @param {object} e The event from the form.
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    currentCard.alternatives.forEach((alternative) => {
      if (alternative.answer === toggle) {
        if (currentCard.category !== 'normal-day-card') {
          changeVelocity(alternative.velocity)
        } else {
          setPoints(points + alternative.points)
        }
        setConsequence(alternative.consequence)
      }
    })

    setHasAnswered(true)
  }

  /**
   * Calculate velocity according to consequence.
   *
   * @param {number} velocityToAdd
   */
  const changeVelocity = (velocityToAdd) => {
    if (currentVelocity + velocityToAdd <= 0) {
      setCurrentVelocity(0)
    } else {
      setCurrentVelocity(currentVelocity + velocityToAdd)
    }

    addToVelovityList([...velocityList, currentVelocity])
  }

  const renderConsequence = () => {
    return (
      <>
        <h1 className="card-header">Consequence</h1>
        <p className="active-card-question">{consequence}</p>
      </>
    )
  }

  return (
    <>
      <div className={highlight ? 'card card-highlight' : 'card'}>
        {renderCard()}
      </div>
    </>
  )
}

export default ActiveCard
