/**
 * The rules for the game.
 *
 * @version 1.0.0
 */

import '../../styles/rules.css'

function Rules() {
  return (
    <div className="rules-container">
      <h1 className="rules-header">Rules</h1>
      <p>
        The entire game board represents a sprint and each square represents a
        day in this sprint. You start at square 1, Monday. When you click on the
        dice, the player moves as many steps as the dice show.
      </p>
      <p>
        Each time the player moves, Storypoints drop by as many points as you
        currently have in Velocity. The goal is to get down to 0 Storypoints.
        Velocity shows how fast the project is progressing. Higher sum on
        Velocity means that more Storypoints disappear with each move the player
        makes; the project goes faster.
      </p>
      <p>
        If the player ends up on a blue square, you will receive a Customer Card
        and if you end up on an orange square, you will receive a Daily StandUp
        card. These cards contain one of two things:
      </p>
      <ul className="rules-list">
        <li>Something happens that affects the project's Velocity.</li>
        <li>
          Something happens and you are presented with 2-3 choices. The choice
          you make affects the project's Velocity.
        </li>
      </ul>
      <p>
        When the player ends up on Day of Illness, one or more people in the
        team become ill. Depending on how many and how long they are gone,
        Velocity lowers for X number of dice rolls.
      </p>
      <p>
        When a sprint is complete and the player moves from square 21 to square
        1, it becomes a Retrospective. At retrospective, you will invest
        storypoints. This means that the choice you make will add story points.
        But this choice will also affect your Velocity. Think through the choice
        carefully as it will not say anywhere if the choice affects Velocity
        positively or negatively, nor how much.
      </p>
    </div>
  )
}

export default Rules
