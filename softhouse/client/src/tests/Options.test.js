// import Options from '../components/Options'
// import ReactDOM from 'react-dom'
// import { render, fireEvent } from '@testing-library/react'
// import { HeaderProvider } from '../global/HeaderContext'
// import { HamburgerProvider } from '../global/HamburgerContext'

// import Enzyme  from 'enzyme'
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
// import { shallow } from 'enzyme'
// import { mount } from 'enzyme'

// Enzyme.configure({ adapter: new Adapter() });

// const wrapperShallow = shallow(
//     <HeaderProvider>
//         <HamburgerProvider>
//             <Options />
//         </HamburgerProvider>
//     </HeaderProvider>
//     )

//     const wrapperMount = mount(
//         <HeaderProvider>
//         <HamburgerProvider>
//             <Options />
//         </HamburgerProvider>
//     </HeaderProvider>
//     )

// describe('Testing the options component', () => {
//     it('should match the snapshot', () => {
//         expect(wrapperShallow.html()).toMatchSnapshot()
//       })

//       it('should render without crashing', () => {
//         const div = document.createElement('div')

//         ReactDOM.render(
//             <HeaderProvider>
//                 <HamburgerProvider>
//                     <Options />
//                 </HamburgerProvider>
//             </HeaderProvider>, div
//         )
//     })

//     it('should have 1 options-container', () => {
//         expect(wrapperMount.find('.options-container').length).toEqual(1)
//     })

//     it('There should be 4 options to choose from', () => {
//         expect(wrapperMount.find('p').length).toEqual(4)
//      })

//      it('Should contain a P element with textcontent: Profile', () => {
//         const { getByTestId } = render(
//             <HeaderProvider>
//                 <HamburgerProvider>
//                     <Options />
//                 </HamburgerProvider>
//             </HeaderProvider>
//         )

//         const pTag = getByTestId('profile-option')
//         expect(pTag.textContent).toBe('Profile')
//      })
// })

// tärningstest
function rollTheDice() {
  const imgs = [0, 1, 2, 3, 4, 5]

  const newDice = Math.floor(Math.random() * imgs.length)
  return newDice + 1
}

test('Value between 1 - 6', () => {
  expect(rollTheDice()).toBeGreaterThanOrEqual(1)
  expect(rollTheDice()).toBeLessThan(7)
})

// Algoritm för highscore

function getScore(velocityList, nrOfMoves) {
  const sum = velocityList.reduce((a, b) => a + b, 0)
  const average = sum / velocityList.length
  const finalScore = Number(((average / nrOfMoves) * 100).toFixed(0))

  return finalScore
}

test('Value of algorithm should be 22', () => {
  const velocityList = [12, 12, 13, 15, 16, 10, 0, 2, 3]
  const nrOfMoves = 42

  expect(getScore(velocityList, nrOfMoves)).toBe(22)
})
