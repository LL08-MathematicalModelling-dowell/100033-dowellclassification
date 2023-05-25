import React from 'react'
import './UserInputs.css'
import arrayData from './arrayData'
import ItemNum from './ItemNum'
import { useDispatch} from 'react-redux'
import { assignBasketId, assignItemNum} from '../../app/features/counter/CounterSlice'

function UserInputs() {

  const dispatch = useDispatch()
  const [levels, setLevels] = React.useState(0)
  
  React.useEffect(() => {
    dispatch(assignBasketId(""))
    dispatch(assignItemNum(0))
  })
  const itemNum = () => {
    for(let i = 0; i< levels; i++){
      if(arrayData.includes(i) === true){

      }else {
        arrayData.push(i)
      }
    }
    dispatch(assignItemNum(levels))
  }
 
  
  itemNum()
  return (
    <div className='userInputs'>
      <div className='numberOfLevels'>
        <p>Enter number of Levels/Baskets</p>
        <input type='Number'
               name='levels'
               value={levels}
               onChange={(e) => setLevels(e.target.value)}/>
        <span>Hint: Max limit is 5</span>
      </div>
        <div className='itemsNum'>
        {
         levels < 0|| levels > 5 ? "": Array.from(Array(Number(levels)), (e, i) => {
             return <ItemNum key={i} i={i+1} />
          })
      }
        </div>  
    </div>
  )
}

export default UserInputs
