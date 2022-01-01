/**
 * The Retrospective component.
 *
 * @version 1.0.0
 */

import '../../styles/retrospective.css'
import retrospectiveJSON from '../../JSON/retrospective.json'
import { VelocityContext } from '../../global/VelocityContext'
import { StorypointsContext } from '../../global/StorypointsContext'
import { RetrospectiveContext } from '../../global/RetrospectiveContext'
import { VelocityListContext } from '../../global/VelocityListContext'
import { useState, useContext } from 'react'

function Retrospective() {
  const { currentVelocity, setCurrentVelocity } = useContext(VelocityContext)
  const { velocityList, addToVelovityList } = useContext(VelocityListContext)
  const { currentStorypoints, setCurrentStorypoints } =
    useContext(StorypointsContext)
  const { retrospective, setRetrospective } = useContext(RetrospectiveContext)

  const [toggle, setToggle] = useState([])
  const [level] = useState('level' + retrospective.level)

  /**
   *
   * @returns The title of the Retrospective.
   */
  const getTitle = () => {
    return retrospectiveJSON.mainInformation.title
  }

  /**
   *
   * @returns The description of the Retrospective.
   */
  const getPreamble = () => {
    return retrospectiveJSON.mainInformation.description
  }

  /**
   *
   * @returns The alternatives of the Retrospective according to level.
   */
  const generateLevelStrategies = () => {
    return retrospectiveJSON.retrospectives[level]
  }

  /**
   * Change chosen alternative on user input.
   *
   * @param {object} e The event from form
   */
  const handleToggle = (e) => {
    const strategy = e.target.value

    // If target is chosen add it to toggle state
    if (!toggle.includes(strategy)) {
      setToggle([...toggle, strategy])
    }
    // If target is unchosen remove from toggle state
    else if (toggle.includes(strategy)) {
      const index = toggle.indexOf(strategy)

      if (index !== -1) {
        toggle.splice(index, 1)
        setToggle(toggle)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    renderConsequences()
  }

  /**
   * Changes HTML to consequences instead of form.
   */
  const renderConsequences = () => {
    const div = document.querySelector('.retrospective-frame')
    const header = document.createElement('h1')
    const text = document.createElement('p')
    const constDiv = document.createElement('div')
    let velP = document.createElement('p')
    let consP

    let velocityCost = 0

    if (toggle.length !== 0) {
      addToStoryPoints()

      retrospectiveJSON.retrospectives[level].forEach((el) => {
        toggle.forEach((strat) => {
          if (strat === el.strategy) {
            const randomCon = getRandomConsequence(el)
            consP = document.createElement('p')
            consP.textContent += randomCon.consequence
            constDiv.appendChild(consP)
            velocityCost = velocityCost + randomCon.velocity
          }
        })
      })

      text.textContent =
        'You have now made your choises and the consequences are displayed below.'
    } else {
      text.textContent =
        'You decided not to choose any alternatives. Your story point-score remains the same.'
    }

    // Makes sure user can click down the retrospective
    document.querySelector('.close-wrapper-retrospective').style.display =
      'flex'

    div.textContent = ''
    header.textContent = 'Consequences'
    div.appendChild(header)
    div.appendChild(text)

    if (consP !== undefined) {
      div.appendChild(constDiv)
      velP.textContent =
        'Your velocity has changed by ' + velocityCost + ' points'
      div.appendChild(velP)
      changeVelocity(velocityCost)
    }
  }

  /**
   * Calculate storypoints according to players choices.
   */
  const addToStoryPoints = () => {
    let storypointCost = 0

    retrospectiveJSON.retrospectives[level].forEach((el) => {
      toggle.forEach((strat) => {
        if (strat === el.strategy) {
          storypointCost = storypointCost + el.cost
        }
      })
    })

    setCurrentStorypoints(currentStorypoints + storypointCost)
  }

  const getRandomConsequence = (el) => {
    const randomValue = Math.floor(Math.random() * el.consequences.length)
    return el.consequences[randomValue]
  }

  /**
   * Calculates velocity according to consequence.
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

  return (
    <div className="retrospective-layer">
      <div
        className="close-wrapper-retrospective"
        onClick={() =>
          setRetrospective({
            state: false,
            level: retrospective.level + 1
          })
        }
      >
        <div className="close-line1"></div>
        <div className="close-line2"></div>
      </div>
      <div className="retrospective-frame">
        <h1>{getTitle()}</h1>

        <p>{getPreamble()}</p>
        <form className="retrospective-form" onSubmit={(e) => handleSubmit(e)}>
          {generateLevelStrategies().map((strategy, index) => {
            return (
              <>
                <label class="retrospective-checkbox-container">
                  {strategy.strategy} [{strategy.cost}]
                  <input
                    type="checkbox"
                    value={strategy.strategy}
                    onChange={(e) => handleToggle(e)}
                  />
                  <span class="checkmark-retrospective-custom"></span>
                </label>
              </>
            )
          })}
          <input
            type="submit"
            value="Submit choices"
            className="form-button-retrospective"
          />
        </form>
      </div>
    </div>
  )
}

export default Retrospective
