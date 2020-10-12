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
    targetHeight: 100
  }
  handleJumpButton = () => {
    if (this.state.jumping) return
    this.setState({
      jumping: true,
      buttonTimer: setInterval(() => {
        let pressDuration = this.state.buttonPressDuration
        let targetHT = this.state.targetHeight
        if (pressDuration >= 60) {
          this.handleJumpPhysics()
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
  handleJumpPhysics = () => {
    if (this.state.buttonPressDuration === 0 && !this.state.jumping) return
    clearInterval(this.state.buttonTimer)
    // console.log('buttonPressDuration: ', this.state.buttonPressDuration)
    // console.log('targetHT: ', this.state.targetHeight)
    
    this.setState({
      buttonPressDuration: 0,
      jumping: false,
      targetHeight: 100
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
          onMouseDown={this.handleJumpButton}
          onMouseUp={this.handleJumpPhysics}
        ></div>
      </div>
    )
  }
}

export default App
