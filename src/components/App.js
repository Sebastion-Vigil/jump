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
    buttonPressDuration: 0,
    targetHeight: 100,
    xPercentTargetHeight: 10,
    jumpTimer: undefined,
    speed: 0
  }
  handleJumpButton = () => {
    if (this.state.jumping) return
    this.setState({
      jumping: true,
      buttonTimer: setInterval(() => {
        let pressDuration = this.state.buttonPressDuration
        let targetHT = this.state.targetHeight
        let xPercentTargetHT = this.state.xPercentTargetHeight
        if (pressDuration >= 60) {
          this.handleButtonDuration()
          return
        }
        pressDuration += 1
        targetHT = pressDuration * 5 > 100 ? pressDuration * 5 : targetHT
        xPercentTargetHT = targetHT - Math.round(targetHT * 0.9)
        this.setState({
          buttonPressDuration: pressDuration,
          targetHeight: targetHT,
          xPercentTargetHeight: xPercentTargetHT
        })
      }, 1)
    })
  }
  handleButtonDuration = () => {
    if (this.state.buttonPressDuration === 0 && !this.state.jumping) return
    clearInterval(this.state.buttonTimer)
    this.handleJumpPhysics()
    this.setState({
      buttonPressDuration: 0,
      jumping: false,
      targetHeight: 100
    })
  }
  handleJumpPhysics = () => {
    const originalTargetHT = this.state.targetHeight
    const originalSquareT = parseInt(this.state.squareTop)
    const difference = originalSquareT - originalTargetHT
    this.setState({
      jumpTimer: setInterval(() => {
        let squareT = parseInt(this.state.squareTop)
        if (squareT < difference) {
          this.clearJumpTimer()
          console.log(this.state)
          return
        }
        let targetHT = this.state.targetHeight
        let jumpFallSpeed = this.state.speed
        squareT -= 1
        targetHT -= 1
        jumpFallSpeed =
          targetHT <= this.state.xPercentTargetHeight && targetHT > 0 ? 10 : 0
        this.setState({
          squareTop: squareT + 'px',
          targetHeight: targetHT,
          speed: jumpFallSpeed
        })
      })
    })
  }
  clearJumpTimer = () => {
    clearInterval(this.state.jumpTimer)
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
          onMouseDown={this.handleJumpButton}
          onMouseUp={this.handleButtonDuration}
        ></div>
      </div>
    )
  }
}

export default App
