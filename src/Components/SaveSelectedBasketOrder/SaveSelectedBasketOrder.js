import React from 'react'
import axios from 'axios'

function SaveSelectedBasketOrder({selectedBasket, insertedId}) {
  const [message, setMessage] = React.useState("")

  const SavePermutations = async () => {
    try {
      const resp = await axios.post(
          'http://100061.pythonanywhere.com/savepermutations/', {
        'selectedPermutation': selectedBasket,
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
      <button className = 'SaveSelectedBasketOrder' onClick={SavePermutations}>{selectedBasket}</button>
      {message}
    </div>
  )
}

export default SaveSelectedBasketOrder;
