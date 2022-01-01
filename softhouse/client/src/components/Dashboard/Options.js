/**
 * The menu that appears when clicking on the hamburger.
 *
 * @version 1.0.0
 */

import '../../styles/options.css'
import { useContext } from 'react'
import socials from '../../pictures/socials/images2'
import { HeaderContext } from '../../global/HeaderContext'
import { HamburgerContext } from '../../global/HamburgerContext'

function Options() {
  const { setCurrentComponent } = useContext(HeaderContext)
  const { active, setActive } = useContext(HamburgerContext)

  const socialMediaLinks = [
    'https://www.facebook.com/softhouseconsulting',
    'https://www.instagram.com/softhouseconsulting/',
    'https://se.linkedin.com/company/softhouse'
  ]

  const closeMenu = (value) => {
    setCurrentComponent(value)
    setActive(!active)
  }

  return (
    <div className="options-container">
      <ul>
        <li data-testid="profile-option" onClick={() => closeMenu('profile')}>
          Profile
        </li>
        <li onClick={() => closeMenu('highscore')}>HighScore</li>
        <li onClick={() => closeMenu('rules')}>Rules</li>
      </ul>

      <div className="social-media-icons">
        {socials.map((img, index) => {
          return (
            <a
              key={index}
              href={socialMediaLinks[index]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={img} alt="Social media" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Options
