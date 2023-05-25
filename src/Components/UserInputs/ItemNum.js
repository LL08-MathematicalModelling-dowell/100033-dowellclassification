import React from 'react'
import './ItemNum.css'
import Baskets from './Baskets'
import axios from 'axios'
import LevelData from './LevelData'
import arrayData from './arrayData'
import { useDispatch, useSelector } from 'react-redux'
import { assignBasketId } from '../../app/features/counter/CounterSlice'
import ClassificationType from '../ClassificationTypes/ClassificationType'

function ItemNum({i}) {

  const dispatch = useDispatch()
  const [itemName, setItemName] = React.useState("")
  const [itemNum, setItemNum] = React.useState(0)
  const [isEmpty, setIsEmpty] = React.useState(false)
  const basketId = useSelector((state) => state.userId.basketId)

  const saveItems = async () =>{
    setIsEmpty(true)
    try{
      const resp = await axios.post(
        'http://100061.pythonanywhere.com/allbaskets/', 
          Baskets
  )

  let res = resp.data.dbInsertedId
  dispatch(assignBasketId(res))
  setIsEmpty(false)
  console.log(res)
  }catch(err){
    console.log(err.response)
  }
  }
  
  return (
    <div className='itemNum'>
      <div className='itemNumInside'>
      <div className='itemName'>
        <p>Name basket {i}</p>
        <input type='text'
               value={itemName}
               name='itemName'
               onChange={(e) =>setItemName(e.target.value)}
              />
      </div>
      <div className='NumberOfItems'>
        <p>Number of items in basket  {i}</p>
        <input type='Number'
               value={itemNum}
               onChange={(e) =>setItemNum(e.target.value)}/>
      </div>
      </div>
      <div className='levelName'>
        {
          itemNum <= 0 ? "":<LevelData levelName={itemName} inputCount={itemNum}/>
        }
      </div>
      <div className='save'>
        {
          i === arrayData.length  ? <button onClick={saveItems}>Save Items</button>:""
        }
      </div>
      <div className='cType'>
      {
        isEmpty && i === arrayData.length ?  <div className='loadingSpinner'></div>: (basketId !== "" && i === arrayData.length ? <ClassificationType />: "")
      } 
      </div>
    </div>
  )
}

export default ItemNum
