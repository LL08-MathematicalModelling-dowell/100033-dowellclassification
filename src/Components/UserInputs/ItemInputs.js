import React from 'react'
import Baskets from './Baskets'
import './ItemInputs.css'

function ItemInputs({basketName}) {

  const [itemName, setItemName] = React.useState("")
  const [itemLink, setItemLink] = React.useState("")

  const addNewItem = () => {
    if(itemName === "" || itemLink === ""){
      alert("Fill in the items")
    }else{
      if(!Baskets[basketName]){
        Baskets[basketName] = []
      }
  
    const newItem =  {
      item: itemName,
      itemLink: itemLink
    }
  
    Baskets[basketName].push(newItem)
    alert("Items added sucessfully")
    }

    console.log(Baskets)
  }
  
  return (
    <div className='inputItems'>
      <div className='inputsName'>
        <h3>Item</h3>
        <h3>Item Link</h3>
      </div>
      <div className='inputs'>
        <input type='text'
               value={itemName}
               onChange={(e) =>setItemName(e.target.value)}/>
        <input type='text'
               value={itemLink}
               onChange={(e) =>setItemLink(e.target.value)}/>
      </div>
      <button onClick={addNewItem}>Add</button>
    </div>
  )
}

export default ItemInputs
