import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './ClassificationType.css'
import arrayData from '../UserInputs/arrayData'
import BasketSelection from '../BasketSelection/BasketSelection'

function ClassificationType() {
 
  const basketId = useSelector((state) => state.userId.basketId)
  const [classificationTypeData, setClassificationTypeData] = React.useState({
                                                    clType: "",
                                                    numberOfLevels:0
                                                    })
  
  const [message, setMessage] = React.useState("")
  const [baskets, setBaskets] = React.useState([])
  const [insertedId, setinsertedId] = React.useState("")
  const [isEmpty, setIsEmpty] = React.useState(false)

  const handleChange = (event) => {
  const {name,value, type, checked} = event.target
       setClassificationTypeData(preClType =>{
        return {
            ...preClType,
            [name]: type === "checkbox" ? checked:value
        }
       })
  }

  const saveClassificationType = async () =>{
    setIsEmpty(true)
    try{
      const resp = await axios.post(
        'http://100061.pythonanywhere.com/type/', {

          'numberOfLevels': arrayData.length,
          'classificationType': classificationTypeData.clType,
          'dbInsertedId': `${basketId}`
  })

  console.log(resp.data)
  setMessage(()=>resp.data.message)
  setBaskets(()=>resp.data.baskets)
  setinsertedId(()=>resp.data.insertedId)
  setIsEmpty(false)
  }catch(err){
    console.log(err.response)
  }
  }

  return (
    <div className='classificationTypes'>
      <div className='cType'>
        <label>Enter number of levels</label>
        <input type="Number" placeholder="Number of Levels" onChange={handleChange} name="numberOfLevels" value={classificationTypeData.numberOfLevels}/>
      </div>
       <div className='cType'>
        <label>dbInsertedId</label>
        <input type="Number" placeholder="dbInsertedId" onChange={handleChange} name="dbInsertedId"/>
      </div>
      {/*value={classificationTypeData.dbInsertedId}*/}
        <div className='claTypeRadio'>
          <label className='cTypeLabel'>Classification type</label>
          <input type="radio" id="N" name='clType' value="N" onChange={handleChange} checked={classificationTypeData.clType === "N"}/>
          <label htmlFor='clType'>N</label>
          <input type="radio" id="H" name='clType' value="H" onChange={handleChange} checked={classificationTypeData.clType === "H"}/>
          <label htmlFor='clType'>H</label>
          <input type="radio" id="T" name='clType' value="T" onChange={handleChange} checked={classificationTypeData.clType === "T"}/>
          <label htmlFor='clType'>T</label>
        </div>
      <button onClick={saveClassificationType}>Save classification</button>
      {
        isEmpty ? <div className='loadingSpinner'></div> : <div className='classificationType'> 
          <p>{message}</p>
          <div className='baskets'>
            {
              baskets.map((basket) => {
                return <BasketSelection baskets={baskets} key={basket} insertedId={insertedId} basketName={basket} />
              })
            }
          </div>
        </div>
      }
    </div>
  )
}

export default ClassificationType
