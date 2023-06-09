import React from 'react'
import axios from 'axios'
import './BasketSelection.css'
import SaveSelectedBasketOrder from '../SaveSelectedBasketOrder/SaveSelectedBasketOrder'
import SaveFinalBasketOrder from '../SaveFinalBasketOrder/SaveFinalBasketOrder'


function BasketSelection(props) {
  const [message, setMessage] = React.useState("")
  const [permutations, setpermutations] = React.useState([])
  const [inserted_id, setinserted_id] = React.useState("")
  const [baskets, setBaskets] = React.useState([])
  const [insertedId, setinsertedId] = React.useState("")


  const basketSelection = async () => {
    try {
      const resp = await axios.post(
        'http://100061.pythonanywhere.com/basket/', {

        'selectedBasket': props.basketName,
        'baskets': props.baskets,
        'insertedId': props.insertedId
      })

      console.log(resp.data)
      setMessage(() => resp.data.message)
      setpermutations(resp.data.permutations)
      setinserted_id(()=>resp.data.insertedId)
      setBaskets(()=>resp.data.baskets)
      setinsertedId(()=>resp.data.insertedId)
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div>
      <button className = 'basketSelection' onClick={basketSelection}>{props.basketName}
      </button>
      {message}
      
      <div>
            {
              permutations && permutations.map((permutation) => {
                return <SaveSelectedBasketOrder  key={permutation} inserted_id={inserted_id} selectedBasket={permutation}/>
              })
            }
      </div>
      
     <div className='baskets'>
            {
              baskets && baskets.map((basket) => {
                return <SaveFinalBasketOrder baskets={baskets} key={basket} insertedId={insertedId} FinalBasketName={basket} />
              })
            }
      </div>
          
</div>
  )
}

export default BasketSelection;