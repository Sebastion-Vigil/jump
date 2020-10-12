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
    buttonPressDuration: undefined
  }
  handleJumpButton = () => {
    if (this.state.jumping) return
    this.setState({
      jumping: true,
      buttonTimer: setInterval(() => {
        let pressDuration = !isNaN(this.state.buttonPressDuration)
          ? this.state.buttonPressDuration
          : 0
        if (pressDuration >= 60) {
          this.handleJumpPhysics()
          return
        }
        pressDuration += 1
        this.setState({
          buttonPressDuration: pressDuration
        })
      }, 1)
    })
  }
  handleJumpPhysics = () => {
    clearInterval(this.state.buttonTimer)
    if (isNaN(this.state.buttonPressDuration)) return
    console.log('buttonPressDuration: ', this.state.buttonPressDuration)
    let targetHT = this.state.buttonPressDuration * 5
    targetHT = targetHT > 100 ? targetHT : 100 // min targetHT of 100
    this.setState({
      buttonPressDuration: undefined,
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
          onMouseDown={this.handleJumpButton}
          onMouseUp={this.handleJumpPhysics}
        ></div>
      </div>
    )
  }
}

export default App
