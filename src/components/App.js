import React from 'react'

import '../css/App.css'

class App extends React.Component {
    state = {
        squareTop: '410px'
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