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
    currentHT: 0
  }

  handleButtonPress = () => {
    // this method handles it all
    // is already jumping?
    // need to ascend?
    // need to pause?
    // need to descend?
    // need to reset?
  }

  ascend = () => {
  }

  pause = () => {
  }

  descend = () => {
  }

  reset = () => {
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





