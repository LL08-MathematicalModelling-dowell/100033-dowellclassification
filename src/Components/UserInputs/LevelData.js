import React from 'react'
import './LevelData.css'
import ItemInputs from './ItemInputs'

function LevelData({levelName, inputCount}) {
  
  
  return (
    <div className='levelData'>
      <div className='levelDataP'>
      <p>{levelName}</p>
      </div>
      <div className='inputComp'>
      {
        Array.from(Array(Number(inputCount)), (e, i) => {
          return <ItemInputs basketName={levelName} key={i} />
        })
      }
      </div>
    </div>
  )
}

export default LevelData
