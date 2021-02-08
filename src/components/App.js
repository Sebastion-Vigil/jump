import React from 'react'

import '../css/App.css'
// square start point: top: 423px (bottom of square-section)
// min jump: top: 323px (lowest)
// max jump: top: 123px (highest)
class App extends React.Component {
  state = {
    squareTop: '375px',
    squareLeft: '100px',
    foregroundLeft: '0px',
    backgroundLeft: '0px',
    gameActive: false,
    goingUp: false,
    goingDown: false,
    buttonPressDuration: 0,
    buttonTimer: undefined,
    descendTimer: undefined,
    foregroundTimer: undefined,
    backgroundTimer: undefined,
    obstacles: [] // info for onscreen obstacles
  }

  generateObstacles = () => {
    if (!this.state.gameActive) return
    console.log('generateObstacles button pressed!')
    const obstacles = this.state.obstacles
    obstacles.push({
      id: (obstacles.length + 1).toString(),
      top: '350px',
      left: '775px'
    })
    this.setState({
      obstacles: obstacles
    })
  }

  scanObstacles = () => {
    // invoke within interval in startForeground()
    // scans obstacles state arr
    // decrements left var for each obstacle
    // if any obstacle fully passed from right to left
    // remove obstacle from obstacles arr w/ splice()
    // game over if any obstacle touches sprite
    const obstacles = this.state.obstacles
    const sLeft = this.state.squareLeft
    const sTop = this.state.squareTop
    obstacles.forEach((obstacle, i) => {
      if (parseInt(obstacle.left) <= -75) {
        obstacles.splice(i, 1)
      }
      if (
        (parseInt(obstacle.left) >= parseInt(sLeft) && parseInt(obstacle.left) < parseInt(sLeft) + 75) &&
        (parseInt(obstacle.top) >= parseInt(sTop) && parseInt(obstacle.top) < parseInt(sTop) + 75)
      ) {
        console.log(`gotcha! sLeft: ${sLeft} sTop: ${sTop} obstacle.left: ${obstacle.left} obstacle.top: ${obstacle.top}`)
        alert(
          `gotcha! sLeft: ${sLeft} sTop: ${sTop} obstacle.left: ${obstacle.left} obstacle.top: ${obstacle.top}`
        )
        // this.toggleStartButton()
      }
      obstacle.left = (parseInt(obstacle.left) - 2).toString() + 'px'
    })
    this.setState({
      obstacles: obstacles
    })
  }

  startAscension = () => {
    console.log('starting ascension!')
    this.setState({
      goingUp: true
    })
  }

  startDescension = () => {
    console.log('starting descension!')
    this.setState({
      goingDown: true
    })
  }

  toggleStartButton = () => {
    // stop background/foreground if active
    if (this.state.gameActive) {
      clearInterval(this.state.foregroundTimer)
      clearInterval(this.state.backgroundTimer)
      this.setState({
        gameActive: false
      })
    } else {
      // start background/foreground if not active
      this.startForeground()
      this.startBackground()
    }
  }
  calculateButtonPress = () => {
    // records press duration with cap on how long
    let pressDuration = this.state.buttonPressDuration
    this.setState({
      // need 2 fix
      buttonTimer: setInterval(() => {
        // jump ht should be determined by px
        if (pressDuration > 100) {
          // not button press duration
          // stop & exit if more than cap
          this.handleButtonUp()
          return
        }
        this.ascend()
        pressDuration += 1
        this.setState({
          buttonPressDuration: pressDuration
        })
      })
    })
  }
  startForeground = () => {
    // starts foregound loop
    let fLeft = parseInt(this.state.foregroundLeft)
    this.setState({
      gameActive: true,
      foregroundTimer: setInterval(() => {
        this.scanObstacles()
        fLeft += -2
        if (fLeft === -1550) {
          console.log('resetting foregroundLeft!')
          fLeft = 0
        }
        this.setState({
          foregroundLeft: fLeft + 'px'
        })
      }, 1)
    })
  }
  startBackground = () => {
    // starts background loop
    let bLeft = parseInt(this.state.backgroundLeft)
    this.setState({
      backgroundTimer: setInterval(() => {
        bLeft += -1
        if (bLeft === -1550) {
          console.log('resetting backgroundLeft')
          bLeft = 0
        }
        this.setState({
          backgroundLeft: bLeft + 'px'
        })
      }, 60)
    })
  }

  handleButtonDown = () => {
    if (!this.state.gameActive) return
    if (this.state.goingUp) return
    this.startAscension()
    this.calculateButtonPress()
  }

  handleButtonUp = () => {
    if (this.state.goingDown) return
    if (parseInt(this.state.squareTop) >= 375) return
    this.startDescension()
    clearInterval(this.state.buttonTimer)
    this.setState({
      descendTimer: setInterval(() => {
        this.descend()
        if (parseInt(this.state.squareTop) >= 375) {
          this.reset()
          return
        }
      })
    })
  }

  ascend = () => {
    // moves sprite up
    let squareT = parseInt(this.state.squareTop)
    squareT -= 3
    this.setState({
      squareTop: squareT + 'px'
    })
  }

  descend = () => {
    // moves sprite down
    let squareT = parseInt(this.state.squareTop)
    squareT += 3
    this.setState({
      squareTop: squareT + 'px'
    })
  }

  reset = () => {
    // resets game
    clearInterval(this.state.descendTimer)
    this.setState({
      squareTop: '375px',
      goingUp: false,
      goingDown: false,
      buttonPressDuration: 0
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='game-screen'>
          <div className='background'>
            <div
              className='background-strip'
              style={{
                left: this.state.backgroundLeft
              }}
            ></div>
          </div>
          <div className='foreground'>
            <div
              className='foreground-strip'
              style={{
                left: this.state.foregroundLeft
              }}
            ></div>
          </div>
          <div
            className='square'
            style={{
              top: this.state.squareTop,
              left: this.state.squareLeft
            }}
          ></div>
          {this.state.obstacles.map((obstacle, i) => {
            return (
              <div
                className='obstacle'
                style={{
                  top: obstacle.top,
                  left: obstacle.left
                }}
                key={i}
              ></div>
            )
          })}
        </div>
        <div
          className='jump-button'
          onMouseDown={this.handleButtonDown}
          onMouseUp={this.handleButtonUp}
        ></div>
        <div className='start-button' onClick={this.toggleStartButton}></div>
        <div
          className='generate-obstacle-button'
          onClick={this.generateObstacles}
        ></div>
      </div>
    )
  }
}
export default App
// Porque de tal manera amó Dios al mundo, que ha dado a su Hijo Unigénito para que
// todo aquel que en Él crea, no se pierda, mas tenga vida eterna. Juan 3:16
