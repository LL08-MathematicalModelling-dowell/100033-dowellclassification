import React from 'react'
import axios from 'axios'
//import './SaveSelectedBasketOrder.css'

function SaveFinalBasketOrder({ FinalBasketName, baskets, insertedId }) {
  const [message, setMessage] = React.useState("")

  const SaveBasketOrder = async () => {
    
    try {
      const resp = await axios.post(
          'http://100061.pythonanywhere.com/basket/', {
          'selectedBasket': FinalBasketName,
          'baskets' : baskets,
          'insertedId': insertedId
      })

      console.log(resp.data)
      setMessage(() => resp.data.message)
    } catch (err) {
      console.log(err.response)
    }
   }

  return (
    <div>
      <button className='SaveFinalBasketOrder' onClick={()=>SaveBasketOrder(FinalBasketName)}>{FinalBasketName && FinalBasketName}</button>
    {message}
    </div>
  )
}

export default SaveFinalBasketOrder;