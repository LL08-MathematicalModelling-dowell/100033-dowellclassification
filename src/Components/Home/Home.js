import React from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import UserInputs from '../UserInputs/UserInputs'

function Home() {
  return (
    <div className='home'>
      <HashRouter>
        <Routes>
        <Route path="/" element={<UserInputs />}/>
        </Routes>
        </HashRouter>
    </div>
  )
}

export default Home
