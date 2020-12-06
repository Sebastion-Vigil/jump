import React from 'react'

import '../css/App.css'
// square start point: top: 423px (bottom of square-section)
// min jump: top: 323px (lowest)
// max jump: top: 123px (highest)
class App extends React.Component {
  state = {
    squareTop: '423px',
    goingUp: false,
    goingDown: false,
    buttonPressDuration: 0,
    buttonTimer: undefined,
    descendTimer: undefined
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

  handleButtonDown = () => {
    if (this.state.goingUp) return
    this.startAscension()
    let pressDuration = this.state.buttonPressDuration
    this.setState({
      buttonTimer: setInterval(() => {
        console.log('pressDuration: ', pressDuration)
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
    if (parseInt(this.state.squareTop) >= 423) return
    this.startDescension()
    clearInterval(this.state.buttonTimer)
    this.setState({
      descendTimer: setInterval(() => {
        this.descend()
        if (parseInt(this.state.squareTop) >= 423) {
          this.reset()
          return
        }
      })
    })
  }

  ascend = () => {
    console.log('going up!')
    let squareT = parseInt(this.state.squareTop)
    squareT -= 3
    this.setState({
      squareTop: squareT + 'px'
    })
  }

  descend = () => {
    console.log('going down!')
    let squareT = parseInt(this.state.squareTop)
    squareT += 3
    this.setState({
      squareTop: squareT + 'px'
    })
  }

  reset = () => {
    clearInterval(this.state.descendTimer)
    this.setState({
      squareTop: '423px',
      goingUp: false,
      goingDown: false,
      buttonPressDuration: 0
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='game-screen'>
          <div className='background'></div>
          <div className='foreground'></div>
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
