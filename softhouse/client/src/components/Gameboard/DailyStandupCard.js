/**
 * The card pile for daily standUp cards.
 *
 * @version 1.0.0
 */

import '../../styles/cards.css'
import customers from '../../pictures/customers.png'

function DailyStandupCard() {
  return (
    <div className="card-holder daily-standup-card">
      <img
        src={customers}
        alt="Customer"
        width="90px"
        className="customerPic"
      />
    </div>
  )
}

export default DailyStandupCard
