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
    targetHT: 0, // make no min jump ht
    currentHT: 0,
    buttonTimer: undefined,
    descendTimer: undefined
  }

  initializeJump = () => {
    console.log('jump initialized!')
    this.setState({
      jumping: true
    })
  }

  handleButtonDown = () => {
    if (this.state.jumping) return
    this.initializeJump()
    console.log('button down!')
    let pressDuration = !isNaN(this.state.buttonPressDuration)
    ? this.state.buttonPressDuration 
    : 0
    this.setState({
      buttonTimer: setInterval(() => {
        if (this.state.buttonPressDuration > 125) {
          this.handleButtonUp()
          return
        }
        this.ascend()
        console.log('buttonPressDuration: ', this.state.buttonPressDuration)
        pressDuration += 1
        this.setState({
          buttonPressDuration: pressDuration
        })
      }, 1)
    })
  }

  handleButtonUp = () => {
    if (!this.state.jumping) return
    console.log('button up!')
    clearInterval(this.state.buttonTimer)
    this.setState({
      buttonPressDuration: undefined,
      jumping: false
    })
  }

  ascend = () => {
    // this should only ascend the square
    let squareT = parseInt(this.state.squareTop)
    squareT -= 3
    this.setState({
      squareTop: squareT + 'px'
    })
  }

  pause = () => {
    // this should only pause the square
  }

  descend = () => {
    // this should only descend the square
    let squareT = parseInt(this.state.squareTop)
    squareT += 3
    this.setState({
      squareTop: squareT + 'px'
    })
  }

  reset = () => {
    // this should only reset square after jump
    this.setState({
      targetHeight: 0,
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
