import React from 'react'

import '../css/App.css'
// square start point: top: 423px (bottom of square-section)
// min jump: top: 323px (lowest)
// max jump: top: 123px (highest)
class App extends React.Component {
  state = {
    squareTop: '423px',
    jumping: false,
    buttonTimer: undefined,
    upTimer: undefined,
    downTimer: undefined,
    upSpeed: 1,
    downSpeed: 1,
    buttonPressDuration: undefined,
    targetHeight: 100,
    currentHeight: 0
  }
  handleButtonDown = () => {
    if (this.state.jumping) return // exit function if already in jumping state
    this.setState({
      buttonTimer: setInterval(() => {
        let pressDuration = !isNaN(this.state.buttonPressDuration)
          ? this.state.buttonPressDuration
          : 0
        let targetHT = this.state.targetHeight
        if (pressDuration >= 50 && targetHT >= 300) {
          this.handleButtonDuration()
          return
        }
        pressDuration += 1
        targetHT = pressDuration * 6 > 100 ? pressDuration * 6 : targetHT
        this.setState({
          buttonPressDuration: pressDuration,
          targetHeight: targetHT
        })
      }, 1)
    })
  }
  handleButtonDuration = () => {
    if (this.state.jumping || isNaN(this.state.buttonPressDuration)) return
    clearInterval(this.state.buttonTimer)
    this.handleJumpPhysics()
  }
  handleJumpPhysics = () => {
    this.ascend()
  }
  ascend = () => {
    let speed = this.state.upSpeed
    this.setState({
      jumping: true,
      upTimer: setInterval(() => {
        let squareT = parseInt(this.state.squareTop)
        let currentHT = this.state.currentHeight
        if (currentHT >= this.state.targetHeight) {
          this.descend()
          return
        }
        squareT -= 3
        currentHT += 3
        this.setState({
          squareTop: squareT + 'px',
          currentHeight: currentHT
        })
      }, speed)
    })
  }
  descend = () => {
    clearInterval(this.state.upTimer)
    this.setState({
      downTimer: setInterval(() => {
        let squareT = parseInt(this.state.squareTop)
        let currentHT = this.state.currentHeight
        if (currentHT <= 0) {
          this.handleJumpFinished()
          return
        }
        squareT += 3
        currentHT -= 3
        this.setState({
          squareTop: squareT + 'px',
          currentHeight: currentHT
        })
      }, this.state.downSpeed)
    })
  }
  handleJumpFinished = () => {
    clearInterval(this.state.downTimer)
    console.log('targetHT jump finished: ', this.state.targetHeight)
    this.setState({
      buttonPressDuration: undefined,
      targetHeight: 100,
      currentHeight: 0,
      jumping: false
    })
  }
  render () {
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
          onMouseUp={this.handleButtonDuration}
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
  //
// ascend()
  //
// descend()
  //
// pause()
  //





