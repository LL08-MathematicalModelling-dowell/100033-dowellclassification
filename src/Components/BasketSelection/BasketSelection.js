import React from 'react'
import axios from 'axios'
import './BasketSelection.css'

function BasketSelection({ basketName, baskets, insertedId }) {
  const [message, setMessage] = React.useState("")

  const basketSelection = async () =>{
    try{
      const resp = await axios.post(
        'http://100061.pythonanywhere.com/basket/', {

          'selectedBasket': basketName,
          'baskets': baskets,
          'insertedId': insertedId
  })

      console.log(resp.data)
      setMessage(()=>resp.data.message)
  }catch(err){
    console.log(err.response)
  }
  }
  
  return (
    <div>
      <button className='basketSelection' onClick={basketSelection}>{basketName}
      </button>
      {message}
    </div>
  )
}

export default BasketSelection;
//className='basketSelection' onClick={basketSelection