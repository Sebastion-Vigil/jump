import React from 'react'

import '../css/App.css'
// square start point: top: 423px (bottom of square-section)
// min jump: top: 323px (lowest)
// max jump: top: 123px (highest)
class App extends React.Component {
  state = {
    squareTop: '375px',
    goingUp: false,
    goingDown: false,
    buttonPressDuration: 0,
    buttonTimer: undefined,
    descendTimer: undefined,
    foregroundLeft: '0px',
    backgroundLeft: '0px',
    gameActive: false,
    foregroundTimer: undefined,
    backgroundTimer: undefined
  }

  startAscension = () => {
    console.log('starting ascension!')
    this.setState({
      goingUp: true,
    })
  }

  startDescension = () => {
    console.log('starting descension!')
    this.setState({
      goingDown: true
    })
  }

  toggleStartButton = () => {
    let fLeft = parseInt(this.state.foregroundLeft)
    if (this.state.gameActive) {
      clearInterval(this.state.foregroundTimer)
      this.setState({
        gameActive: false
      })
    } else {
      this.setState({
        gameActive: true,
        foregroundTimer: setInterval(() => {
          fLeft += -2
          if (fLeft === -1500) {
            console.log('resetting foregroundLeft!')
            fLeft = 0
          }
          this.setState({
            foregroundLeft: fLeft + 'px'
          })
        }, 1)
      })
    }
  }

  startBackground = () => {
    
  }

  handleButtonDown = () => {
    if (this.state.goingUp) return
    this.startAscension()
    let pressDuration = this.state.buttonPressDuration
    this.setState({
      buttonTimer: setInterval(() => {
        // console.log('pressDuration: ', pressDuration)
        if (pressDuration > 125) {
          this.handleButtonUp()
          return
        }
        this.ascend()
        pressDuration += 1
        this.setState({
          buttonPressDuration: pressDuration
        })
      })
    })
  }

  handleButtonUp = () => {
    if (this.state.goingDown) return
    if (parseInt(this.state.squareTop) >= 375) return
    this.startDescension()
    clearInterval(this.state.buttonTimer)
    this.setState({
      descendTimer: setInterval(() => {
        this.descend()
        if (parseInt(this.state.squareTop) >= 375) {
          this.reset()
          return
        }
      })
    })
  }

  ascend = () => {
    // console.log('going up!')
    let squareT = parseInt(this.state.squareTop)
    squareT -= 3
    this.setState({
      squareTop: squareT + 'px'
    })
  }

  descend = () => {
    // console.log('going down!')
    let squareT = parseInt(this.state.squareTop)
    squareT += 3
    this.setState({
      squareTop: squareT + 'px'
    })
  }

  reset = () => {
    clearInterval(this.state.descendTimer)
    this.setState({
      squareTop: '375px',
      goingUp: false,
      goingDown: false,
      buttonPressDuration: 0
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='game-screen'>
          <div className='background'>
            <div 
              className='background-strip'
              style={{
                left: this.state.backgroundLeft
              }}
            ></div>
          </div>
          <div className='foreground'>
            <div 
              className='foreground-strip'
              style={{
                left: this.state.foregroundLeft
              }}
            >
            </div>
          </div>
          <div
            className='square'
            style={{
              top: this.state.squareTop
            }}
          ></div>
        </div>
        <div
          className='jump-button'
          onMouseDown={this.handleButtonDown}
          onMouseUp={this.handleButtonUp}
        ></div>
        <div 
          className='start-button'
          onClick={this.toggleStartButton}
        ></div>
      </div>
    )
  }
}
export default App
// as code stands, program waits for press duration to finish before executing
// need to execute as targetHT is being determined, up to targetHT
// as button pressed:
// square ascends up to targetHT, determined by buttonPressDuration
// square pauses briefly in mid air
// square descends
// reset state vars
// need onMouseDown() without a doubt
// do we really need a onMouseUp() method?
// (methinks not)
// handleButtonPress()
// is already jumping?
// need to ascend?
// need to descend?
// need to pause?
// time to reset?
// ascend()
//
// descend()
//
// pause()
//
