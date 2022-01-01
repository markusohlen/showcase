/**
 * The starting point of the react application.
 *
 * @version 1.0.0
 */

import './styles/style.css'
import Game from './components/Game'

// Provider imports
import { HeaderProvider } from './global/HeaderContext'
import { HamburgerProvider } from './global/HamburgerContext'
import { PlayerPositionProvider } from './global/PlayerPositionContext'
import { CurrentCardProvider } from './global/CurrentCardContext'
import { DaysProvider } from './global/DaysContext'
import { TileProvider } from './global/TileContext'
import { HasAnsweredProvider } from './global/HasAnsweredContext'
import { VelocityProvider } from './global/VelocityContext'
import { StorypointsProvider } from './global/StorypointsContext'
import { HighlightProvider } from './global/HighlightContext'
import { RetrospectiveProvider } from './global/RetrospectiveContext'
import { UsernameProvider } from './global/UsernameContext'
import { VelocityListProvider } from './global/VelocityListContext'
import { PlayerMoveProvider } from './global/PlayerMoveContext'
import { PointsProvider } from './global/PointsContext'
import { FinalScoreProvider } from './global/FinalScoreContext'

function App() {
  return (
    <HamburgerProvider>
      <HeaderProvider>
        <PlayerPositionProvider>
          <CurrentCardProvider>
            <DaysProvider>
              <TileProvider>
                <HasAnsweredProvider>
                  <VelocityProvider>
                    <StorypointsProvider>
                      <HighlightProvider>
                        <RetrospectiveProvider>
                          <UsernameProvider>
                            <VelocityListProvider>
                              <PlayerMoveProvider>
                                <PointsProvider>
                                  <FinalScoreProvider>
                                    <div className="container">
                                      <Game />
                                    </div>
                                  </FinalScoreProvider>
                                </PointsProvider>
                              </PlayerMoveProvider>
                            </VelocityListProvider>
                          </UsernameProvider>
                        </RetrospectiveProvider>
                      </HighlightProvider>
                    </StorypointsProvider>
                  </VelocityProvider>
                </HasAnsweredProvider>
              </TileProvider>
            </DaysProvider>
          </CurrentCardProvider>
        </PlayerPositionProvider>
      </HeaderProvider>
    </HamburgerProvider>
  )
}

export default App
