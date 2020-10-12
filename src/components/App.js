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
    buttonPressDuration: 0
  }
  handleJumpButton = () => {
    if (this.state.jumping) return
    this.setState({
      jumping: true,
      buttonTimer: setInterval(() => {
        let pressDuration = this.state.buttonPressDuration
        console.log('button pressed for ' + pressDuration + ' milliseconds!')
        if (pressDuration >= 500) {
          this.clearButtonDuration()
          return
        }
        pressDuration += 1
        this.setState({
          buttonPressDuration: pressDuration
        })
      }, 1)
    })
  }
  clearButtonDuration = () => {
    clearInterval(this.state.buttonTimer)
    this.setState({
      buttonPressDuration: 0,
      jumping: false // tmp for testing -> remove later
    })
  }
  handleJumpPhysics = (tH) => {
    // cool physics stuff coming soon!
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
          onMouseUp={this.clearButtonDuration}
        ></div>
      </div>
    )
  }
}

export default App
