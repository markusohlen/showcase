/**
 * The starting point of the Game.
 *
 * @version 1.0.0
 */

import Dashboard from './Dashboard/Dashboard'
import Gameboard from './Gameboard/Gameboard'
import UsernameModal from './Gameboard/UsernameModal'

import { useEffect, useContext } from 'react'
import { setPlayerState } from '../Models/StateModel'

import { PlayerPositionContext } from '../global/PlayerPositionContext'
import { VelocityContext } from '../global/VelocityContext'
import { TileContext } from '../global/TileContext'
import { CurrentCardContext } from '../global/CurrentCardContext'
import { StorypointsContext } from '../global/StorypointsContext'
import { HasAnsweredContext } from '../global/HasAnsweredContext'
import { PointsContext } from '../global/PointsContext'
import { VelocityListContext } from '../global/VelocityListContext'
import { PlayerMoveContext } from '../global/PlayerMoveContext'
import { RetrospectiveContext } from '../global/RetrospectiveContext'

function Game() {
  const { currentPositionValue, setCurrentPositionValue } = useContext(
    PlayerPositionContext
  )
  const { currentTile, setCurrentTile } = useContext(TileContext)
  const { currentCard, setCurrentCard } = useContext(CurrentCardContext)
  const { currentStorypoints, setCurrentStorypoints } =
    useContext(StorypointsContext)
  const { currentVelocity, setCurrentVelocity } = useContext(VelocityContext)
  const { hasAnswered, setHasAnswered } = useContext(HasAnsweredContext)
  const { points, setPoints } = useContext(PointsContext)
  const { velocityList, addToVelovityList } = useContext(VelocityListContext)
  const { currentPlayerMove, setPlayerMove } = useContext(PlayerMoveContext)
  const { retrospective, setRetrospective } = useContext(RetrospectiveContext)

  /**
   * Saves state of the game everytime something is changing.
   */
  useEffect(() => {
    setPlayerState({
      currentPositionValue,
      currentTile,
      currentCard,
      currentVelocity,
      currentStorypoints,
      hasAnswered,
      points,
      velocityList,
      currentPlayerMove,
      retrospective
    })
  }, [
    currentPositionValue,
    currentTile,
    currentCard,
    currentVelocity,
    currentStorypoints,
    hasAnswered,
    points,
    velocityList,
    currentPlayerMove,
    retrospective
  ])

  const resetState = () => {
    setCurrentPositionValue(1)
    setCurrentTile({})
    setCurrentCard({})
    setCurrentVelocity(5)
    setCurrentStorypoints(200)
    setHasAnswered(true)
    setPoints(0)
    addToVelovityList([])
    setPlayerMove({})
    setRetrospective({
      state: false,
      level: 1
    })
  }

  return (
    <>
      <Dashboard />
      <Gameboard resetState={resetState} />
      <UsernameModal />
    </>
  )
}

export default Game
