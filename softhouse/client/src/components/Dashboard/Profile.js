/**
 * The players profile during the game.
 *
 * @version 1.0.0
 */

import '../../styles/profile.css'
import Scoreboard from './Scoreboard.js'
import { useSpring, animated } from 'react-spring'
import { useContext } from 'react'
import { UsernameContext } from '../../global/UsernameContext'

function Profile() {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 }
  })

  const { username } = useContext(UsernameContext)

  return (
    <animated.div style={props} className="profile-container">
      <div className="picture-container">
        <img
          className="picture"
          src="https://i.pinimg.com/originals/ea/c5/6f/eac56f0157e9f08dd12659da8e4b364c.jpg"
          alt=""
        />
        <h1>{username}</h1>
      </div>
      <Scoreboard />
    </animated.div>
  )
}

export default Profile
