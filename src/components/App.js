import React from 'react'

import '../css/App.css'

const App = () => {
  return (
    <div className='App'>
      <div className='game-screen'>
        <div className='background'>
          <div className='background-strip'></div>
        </div>
        <div className='foreground'>
          <div className='foreground-strip'></div>
        </div>
        <div className='square'></div>
      </div>
      <div className='jump-button'></div>
      <div className='start-button'></div>
      <div className='generate-obstacle-button'></div>
    </div>
  )
}

export default App

// TODO:
// use requestAnimationFrame to make background/foreground start & stop w/button
