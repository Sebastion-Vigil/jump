import React from 'react'

import '../css/App.css'
// square start point: top: 423px (bottom of square-section)
// min jump: top: 323px (lowest)
// max jump: top: 123px (highest)
class App extends React.Component {
  state = {
    squareTop: '323px',
    jumping: false
  }
  handleJumpButton = () => {
    console.log('jump button!') 
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
        ></div>
      </div>
    )
  }
}

export default App
