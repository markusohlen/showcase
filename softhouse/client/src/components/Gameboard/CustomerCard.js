/**
 * The card pile for customer cards.
 *
 * @version 1.0.0
 */

import '../../styles/cards.css'
import customers from '../../pictures/customer.png'

function CustomerCard() {
  return (
    <div className="card-holder customer-card">
      <img
        src={customers}
        alt="Customers"
        width="90px"
        className="customersPic"
      />
    </div>
  )
}

export default CustomerCard
