/**
 * The entire dashboard - left side of the browser.
 *
 * @version 1.0.0
 */

import '../../styles/dashboard.css'
import Header from './Header'
import Highscore from './Highscore'
import Rules from './Rules'
import Profile from './Profile'
import { HeaderContext } from '../../global/HeaderContext'
import { useContext } from 'react'

function Dashboard() {
  const { currentComponent } = useContext(HeaderContext)

  /**
   * @returns The component that should be rendered on the Dashboard.
   */
  const renderComponent = () => {
    if (currentComponent === 'highscore') {
      return <Highscore />
    } else if (currentComponent === 'rules') {
      return <Rules />
    } else {
      return <Profile />
    }
  }

  return (
    <div className="dashboard-container">
      <Header />
      {renderComponent()}
    </div>
  )
}

export default Dashboard
