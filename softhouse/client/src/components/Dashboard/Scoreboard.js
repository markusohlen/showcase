/**
 * The scoreboard that holds the game logic in the profile.
 *
 * @version 1.0.0
 */

import '../../styles/scoreboard.css'
import ActiveCard from './ActiveCard'
import { VelocityContext } from '../../global/VelocityContext'
import { StorypointsContext } from '../../global/StorypointsContext'
import { useContext } from 'react'

function Scoreboard() {
  const { currentStorypoints } = useContext(StorypointsContext)
  const { currentVelocity } = useContext(VelocityContext)

  return (
    <>
      <div className="scoreboard">
        <div className="scoreboard-item storypoints">
          <h1>Story points</h1>
          <p>{currentStorypoints}</p>
        </div>
        <div className="scoreboard-item velocity">
          <h1>Velocity</h1>
          <p>{currentVelocity}</p>
        </div>
      </div>
      <div className="card-container">
        <ActiveCard />
      </div>
    </>
  )
}

export default Scoreboard
