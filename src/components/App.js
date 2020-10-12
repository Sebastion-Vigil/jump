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
    buttonPressDuration: 0,
    targetHeight: 100,
    currentHeight: 0,
  }
  handleButtonDown = () => {
    if (this.state.jumping) return
    this.setState({
      jumping: true,
      buttonTimer: setInterval(() => {
        let pressDuration = this.state.buttonPressDuration
        let targetHT = this.state.targetHeight
        if (pressDuration >= 60 && targetHT >= 300) {
          this.handleButtonDuration()
          return
        }
        pressDuration += 1
        targetHT = pressDuration * 5 > 100 ? pressDuration * 5 : targetHT
        this.setState({
          buttonPressDuration: pressDuration,
          targetHeight: targetHT
        })
      }, 1)
    })
  }
  handleButtonDuration = () => {
    clearInterval(this.state.buttonTimer)
    this.handleJumpPhysics()
  }
  handleJumpPhysics = () => {
    this.ascend()
  }
  ascend = () => {
    let speed = this.state.upSpeed
    this.setState({
      upTimer: setInterval(() => {
        let squareT = parseInt(this.state.squareTop)
        let currentHT = this.state.currentHeight
        if (currentHT === this.state.targetHeight) {
          this.descend()
          return
        }
        squareT -= 1
        currentHT += 1
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
        if (currentHT === 0) {
          this.handleJumpFinished()
          return
        }
        squareT += 1
        currentHT -= 1
        this.setState({
          squareTop: squareT + 'px',
          currentHeight: currentHT
        })
      }, this.state.downSpeed)
    })
  }
  handleJumpFinished = () => {
    clearInterval(this.state.downTimer)
    this.setState({
      buttonPressDuration: 0,
      targetHeight: 100,
      currentHeight: 0
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
