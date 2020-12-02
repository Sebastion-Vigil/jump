import React from 'react'

import '../css/App.css'
// square start point: top: 423px (bottom of square-section)
// min jump: top: 323px (lowest)
// max jump: top: 123px (highest)
class App extends React.Component {
  state = {
    squareTop: '423px',
    jumping: false,
    buttonPressDuration: 0,
    buttonTimer: undefined,
    descendTimer: undefined
  }

  handleButtonDown = () => {
    if (this.state.jumping) return
    let pressDuration = 0
    this.setState({
      jumping: true,
      buttonTimer: setInterval(() => {
        if (this.state.buttonPressDuration > 125) {
          this.handleButtonUp()
          return
        }
        console.log(this.state.buttonPressDuration)
        this.ascend()
        pressDuration += 1
        this.setState({
          buttonPressDuration: pressDuration
        })
      }, 1)
    })
  }

  handleButtonUp = () => {
    if (!this.state.jumping) return
    clearInterval(this.state.buttonTimer)
    this.setState({
      descendTimer: setInterval(() => {
        if (parseInt(this.state.squareTop) >= 423) {
          this.reset()
          return
        }
        this.descend()
      })
    })
    this.setState({
      buttonPressDuration: 0
    })
  }

  ascend = () => {
    console.log('going up!')
    // this should only ascend the square
    let squareT = parseInt(this.state.squareTop)
    squareT -= 3
    this.setState({
      squareTop: squareT + 'px'
    })
  }

  descend = () => {
    console.log('going down!')
    // this should only descend the square
    let squareT = parseInt(this.state.squareTop)
    squareT += 3
    this.setState({
      squareTop: squareT + 'px'
    })
  }

  reset = () => {
    clearInterval(this.state.descendTimer)
    this.setState({
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
