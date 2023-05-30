import React from 'react'
import axios from 'axios'
import './BasketSelection.css'
import SaveSelectedBasketOrder from '../SaveSelectedBasketOrder/SaveSelectedBasketOrder'


function BasketSelection({ basketName, baskets}) {
  const [message, setMessage] = React.useState("")
  //const [selectedPermutation, setselectedPermutation] = React.useState([])
  const [permutations, setpermutations] = React.useState([])
  const [insertedId, setinsertedId] = React.useState("")


  const basketSelection = async () => {
    try {
      const resp = await axios.post(
        'http://100061.pythonanywhere.com/basket/', {

        'selectedBasket': basketName,
        'baskets': baskets,
        'insertedId': insertedId
      })

      console.log(resp.data)
      setMessage(() => resp.data.message)
      //setselectedPermutation(() => resp.data.selectedPermutation)
      setpermutations(() => resp.data.permutations)
      setinsertedId(()=>resp.data.insertedId)
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div>
      <button className = 'basketSelection' onClick={basketSelection}>{basketName}
      </button>
      {message}
      <div>
            {
              permutations.map((permutation) => {
                return <SaveSelectedBasketOrder  key={permutation} insertedId={insertedId} selectedBasket={permutation}/>
              })
            }
          </div>
    </div>
  )
}

export default BasketSelection;


