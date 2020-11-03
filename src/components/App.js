import React from 'react'

import '../css/App.css'
// square start point: top: 423px (bottom of square-section)
// min jump: top: 323px (lowest)
// max jump: top: 123px (highest)
class App extends React.Component {
  state = {
    squareTop: '423px',
    jumping: false,
    buttonPressDuration: undefined,
    targetHT: 100,
    currentHT: 0,
    buttonTimer: undefined,
    upTimer: undefined,
    downTimer: undefined
  }

  stopMovementTimer = (whichTimer) => {
    if (whichTimer === 'up') {
      clearInterval(this.state.upTimer)
    }
    if (whichTimer === 'down') {
      clearInterval(this.state.downTimer)
    }
  }

  initializeJump = () => {
    if (this.state.jumping) return
    console.log('jump initialized!')
    this.setState({
      jumping: true
    })
  }

  handleButtonPress = () => {
    this.initializeJump()
    console.log('button pressed!')
    let pressDuration = !isNaN(this.state.buttonPressDuration)
    ? this.state.buttonPressDuration 
    : 0
  }

  ascend = () => {
    // this should only ascend the square
    this.setState({
      upTimer: setInterval(() => {
        let squareT = parseInt(this.state.squareTop)
        squareT -= 3
        this.setState({
          squareTop: squareT + 'px'
        })
      }, 1)
    })
  }

  pause = () => {
    // this should only pause the square
  }

  descend = () => {
    // this should only descend the square
    this.setState({
      upTimer: setInterval(() => {
        let squareT = parseInt(this.state.squareTop)
        squareT += 3
        this.setState({
          squareTop: squareT + 'px'
        })
      }, 1)
    })
  }

  reset = () => {
    // this should only reset square after jump
    this.setState({
      buttonPressDuration: undefined,
      targetHeight: 100,
      currentHeight: 0,
      jumping: false
    })
  }

  render() {
    return (
      <div className='App'>
        <div className='square-section'>
          <div
            className='square'
            style={{
              top: this.state.squareTop
            }}
          ></div>
        </div>
        <div
          className='jump-button'
          onMouseDown={this.handleButtonPress}
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
