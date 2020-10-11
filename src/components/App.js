import React from 'react'

import '../css/App.css'

class App extends React.Component {
    state = {
        squareTop: '423px'
    }
    handleJump = () => {
        // more stuff soon
    }
    render() {
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
                <div className='jump-button'></div>
            </div>
        )
    }
}

export default App

// min jump: top: 300px (lowest)
// max jump: top: 123px (highest)