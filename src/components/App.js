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
    jumpTimer: undefined,
    buttonPressDuration: 0,
    targetHeight: 100
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
  }
  handleJumpPhysics = () => {
        
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
