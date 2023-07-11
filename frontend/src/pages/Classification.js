import React,{useState, useEffect} from 'react';
import axios from 'axios';

const Classification = () => {

 
 
 const [baskets,setBaskets] = useState([]);
 const [loading,setLoading] = useState(false);
 const [selectedBasket,setSelectedBasket] = useState("");
 const [remainingBaskets,setRemainingBaskets] = useState([]);
 const [isSelected,setIsSelected] = useState(-1);
 const [insertedId,setInsertedId] = useState("");
 const [permutations,setPermutations] = useState([]);
 const [selectedPermutation,setSelectedPermutation] = useState("");
 const [isPermutationSelected,setIsPermutationSelected] = useState(-1);
 const [savePermutation,setSavePermutation] = useState([]);
 const [items,setItems] = useState([]);
 const [currentBasket,setCurrentBasket] = useState("");
 const [currentBasketItems,setCurrentBasketItems] = useState([]);
 const [nextBasket,setNextBasket] = useState("");
 const [nextBasketItems,setNextBasketItems] = useState([]);
 const [selectedItem,setSelectedItem] = useState("");
 const [isItemSelected,setIsItemSelected] = useState(-1);
 const [itemSelectedBasket,setItemSelectedBasket] = useState("");

 const [numberLevelError,setNumberLevelError] = useState(true);
 const [classificationTypeError,setClassificationTypeError] = useState(true);
 const [dbInsertedIdError,setDbInsertedIdError] = useState(true);
 const [errorMsg,setErrorMsg] = useState(false);



 /// Basket Selection Screens
 const [basketScreen1,setBasketScreen1] = useState(false);
 const [basketScreen2,setBasketScreen2] = useState(false);
 const [basketScreen3,setBasketScreen3] = useState(false);
 const [basketScreen4,setBasketScreen4] = useState(false);
 const [itemScreen1,setItemScreen1] = useState(false);
 const [itemScreen2,setItemScreen2] = useState(false);
 const [itemScreen3,setItemScreen3] = useState(false);
 

 


 const handleBasket1 = (e) => {
    e.preventDefault();
    setSelectedBasket(e.target.value);
    setIsSelected(e.target.name);
    setSavePermutation([...savePermutation, e.target.value]);
 }
 const handleBasket2 = (e) => {
    e.preventDefault();
    setSelectedBasket(e.target.value);
    setIsSelected(e.target.name);
    setSavePermutation([...savePermutation, e.target.value]);
 }
 const handleBasket3 = (e) => {
    e.preventDefault();
    setSelectedBasket(e.target.value);
    setIsSelected(e.target.name);
    setSavePermutation([...savePermutation, e.target.value]);
 }
 const handleFinalizingBasket = (e) => {
    e.preventDefault();
    setSelectedBasket(e.target.value);
    setIsSelected(e.target.name);
    setSavePermutation([...savePermutation, e.target.value]);
 }
 const handlePermutation1 = (e) => {
  e.preventDefault();
    setSelectedPermutation(e.target.value);
    setIsPermutationSelected(e.target.name);
}
const handleitems = (e) => {
  e.preventDefault();
    setSelectedItem(e.target.value);
    setIsItemSelected(e.target.name);
    handleItemSelectedBasket1();
}

const handleitems1 = (e) => {
  e.preventDefault();
    setSelectedItem(e.target.value);
    setIsItemSelected(e.target.name);
    handleItemSelectedBasket2();
}

const handleItemSelectedBasket1 = () =>{
  setItemSelectedBasket(currentBasket);
}
const handleItemSelectedBasket2 = () =>{
  setItemSelectedBasket(nextBasket);
}

 


 


 const [inputsData,setInputsData] = useState({
  numberOfLevels: "",
  typeOfClassification: "",
  dbInsertedId: ""
});


 const handleInputs = (e) => {

    const {name, value} = e.target;

    setInputsData((prev) => {
        return {...prev, [name]:value};
    });
}

useEffect(() => {
  // Check for number of levels error
  if (inputsData.numberOfLevels === "") {
    setNumberLevelError(true);

  } else {
    setNumberLevelError(false);

  }

  // Check for classification type error
  if (inputsData.typeOfClassification === "") {
    setClassificationTypeError(true);

  } else {
    setClassificationTypeError(false);

  }

  // Check for DB Inserted ID error
  if (inputsData.dbInsertedId === "") {
    setDbInsertedIdError(true);

  } else {
    setDbInsertedIdError(false);

  }
 

}, [inputsData.numberOfLevels, inputsData.typeOfClassification,inputsData.dbInsertedId]);


useEffect(() => {
  const interval = setInterval(() => {
    setErrorMsg(false);
  }, 1500);
  return () => clearInterval(interval);
}, [errorMsg]);



const handleSubmit = (e) => {
    e.preventDefault();
    
    if(inputsData.numberOfLevels === "" || inputsData.typeOfClassification === "" || inputsData.dbInsertedId === ""){
      setErrorMsg(true);
    } else{
      setErrorMsg(false);
      setLoading(true);
       
      let data = JSON.stringify({
        "numberOfLevels": parseInt(inputsData.numberOfLevels),
        "classificationType": inputsData.typeOfClassification,
        "dbInsertedId": inputsData.dbInsertedId
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://100061.pythonanywhere.com/type/',
        headers: { },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setBaskets(response.data.baskets);
        setInsertedId(response.data.insertedId);
        setLoading(false);
        setBasketScreen1(true);
        
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorMsg(true);
        setBasketScreen1(false);
      });


    }  
}
const submitBasket1 = (e) => {
  e.preventDefault(); 

  
    
  const newBaskets = [...baskets];
  
  setRemainingBaskets(newBaskets);
  setLoading(true);
  let data = {
      "selectedBasket":selectedBasket,
      "baskets": newBaskets
  ,
      "insertedId":insertedId
  };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://100061.pythonanywhere.com/basket/',
      headers: { },
      data : JSON.stringify(data)
    };
    

    axios.request(config)
    .then((response) => {
     console.log(JSON.stringify(response.data));
      setBaskets(response.data.baskets);
      setInsertedId(response.data.insertedId);
      
      
      /// Permutation API Call
      
      

      let data = {
        "inserted_id":insertedId,
        "selectedPermutation":savePermutation,
        "baskets": newBaskets
    };

    

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://100061.pythonanywhere.com/savepermutations/',
        headers: { },
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
      setBasketScreen2(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      setBasketScreen2(false);
      });
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setBasketScreen2(false);
    });
  
    setSelectedBasket("");
   
    
}


const submitBasket2 = (e) => {
 if(selectedBasket !== ""){ 
  e.preventDefault(); 

  
    
  const newBaskets = [...baskets];
  
  setRemainingBaskets(newBaskets);
  setLoading(true);
  let data = {
      "selectedBasket":selectedBasket,
      "baskets": newBaskets
  ,
      "insertedId":insertedId
  };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://100061.pythonanywhere.com/basket/',
      headers: { },
      data : JSON.stringify(data)
    };

        
    
    axios.request(config)
    .then((response) => {
     console.log(JSON.stringify(response.data));
      setBaskets(response.data.baskets);
      setInsertedId(response.data.insertedId);
      setPermutations(response.data.permutations);
      

      /// Permutation API Call
      

      let data = {
        "inserted_id":insertedId,
        "selectedPermutation":savePermutation,
        "baskets": newBaskets
    };

      
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://100061.pythonanywhere.com/savepermutations/',
        headers: { },
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
      setBasketScreen3(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      setBasketScreen3(false);
      });
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setBasketScreen3(false);
    });
  
    setSelectedBasket("");
  }else{
    alert("Please select the 2nd basket")
  }
   
    
    
}


const submitBasket3 = (e) => {
  e.preventDefault(); 
    
    

    if(selectedBasket !== "" && selectedPermutation !== ""){
      const newBaskets = [...baskets];
  
     setRemainingBaskets(newBaskets);
      setLoading(true);
      let data = {
      "selectedBasket":selectedBasket,
      "baskets": newBaskets
      ,
      "insertedId":insertedId
       };

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://100061.pythonanywhere.com/basket/',
        headers: { },
        data : JSON.stringify(data)
      };
      
      axios.request(config)
      .then((response) => {
       console.log(JSON.stringify(response.data));
        setBaskets(response.data.baskets);
        setInsertedId(response.data.insertedId);
        setPermutations(response.data.permutations);
        
        /// Permutation API Call
      

      let data = {
        "inserted_id":insertedId,
        "selectedPermutation":savePermutation,
        "baskets": newBaskets
    };

      
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://100061.pythonanywhere.com/savepermutations/',
        headers: { },
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
      setBasketScreen4(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      setBasketScreen4(false);
      });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setBasketScreen4(false);
      });
    
      setSelectedBasket("");
  
    }else{
      if(selectedBasket !== ""){
      alert("Please select Permutation of Basket Order");
      setLoading(false);
      setBasketScreen4(false);
      }else{
        alert("Please Select the 3rd Basket");
      setLoading(false);
      setBasketScreen4(false);
      }
    }
}
     

  const submitFinalizingBasket = (e) => {
    e.preventDefault();
    

    
      const newBaskets = [...baskets];
  
     setRemainingBaskets(newBaskets);
      setLoading(true);
      let data = {
      "selectedBasket":selectedBasket,
      "baskets": newBaskets
      ,
      "insertedId":insertedId
       };

      

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://100061.pythonanywhere.com/basket/',
        headers: { },
        data : JSON.stringify(data)
      };
      
      axios.request(config)
      .then((response) => {
       console.log(JSON.stringify(response.data));
       setInsertedId(response.data.insertedId);
       setCurrentBasket(response.data.basket);
        setItems(response.data.items);
        setLoading(false);
        setItemScreen1(true);
        
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setItemScreen1(false)
      });
    
      setSelectedBasket("");
  
  }

  const submit1stItem = (e) => {
    e.preventDefault();

    if(selectedItem !== ""){
      setLoading(true);
    let data = {
      "selectedItem":selectedItem,
      "basket":currentBasket,
      "insertedId":insertedId,
      "status":true
    };

   

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://100061.pythonanywhere.com/item/',
      headers: { },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setLoading(false);
      setItemScreen2(true);
      setCurrentBasket(response.data.currentBasket);
      setCurrentBasketItems(response.data.currentBasketItems);
      setNextBasket(response.data.nextBasket);
      setNextBasketItems(response.data.nextBasketItems);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setItemScreen2(false);
    });

    }else {
      alert("Please select an item");
      setLoading(false);
      setItemScreen2(false);
    }
    setSelectedItem("");

}


const submit2ndItem = (e) => {
  e.preventDefault();

  if(selectedItem !== ""){
    setLoading(true);
  let data = {
      "selectedItem":selectedItem,
      "basket":itemSelectedBasket,
      "insertedId":insertedId,
      "status":true
  };
  

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://100061.pythonanywhere.com/item/',
    headers: { },
    data : data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    setLoading(false);
    setItemScreen3(true);
    setCurrentBasket(response.data.currentBasket);
    setCurrentBasketItems(response.data.currentBasketItems);
    setNextBasket(response.data.nextBasket);
    setNextBasketItems(response.data.nextBasketItems);
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
    setItemScreen3(false);
  });

  }else {
    alert("Please select an item");
    setLoading(false);
    setItemScreen3(false);
  }
  setSelectedItem("");

}

 


  return (
    <>


    {itemScreen3 === true ?
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
      <h1 className='text-[30px] text-[red] font-semibold mb-5'>Under Construction....!</h1>
      </form>

    :
    <>
    {itemScreen2 === true ?
    
    
      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select 2nd item from 1st Basket {currentBasket} or 2nd Basket {nextBasket}</h1>


        <h1 className='text-[24px] font-semibold mb-5 mt-5'>1st Basket: {currentBasket}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {currentBasketItems.map((item, index) => (
                <button onClick={handleitems} className={parseInt(setIsItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        <h1 className='text-[24px] font-semibold mb-5 mt-5'>2nd Basket: {nextBasket}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>

     {nextBasketItems.map((item, index) => (
                <button onClick={handleitems1} className={parseInt(setIsItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        <div className='flex items-center justify-center w-[90%] py-5'>
            <button onClick={submit2ndItem} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600 mt-5' type='button'>Submit</button>
            

        </div>
            
    </form>
    
    

    :
    
    <>
    {itemScreen1 === true ?
      <>
     <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select 1st item from 1st Basket: {currentBasket}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {items.map((item, index) => (
                <button onClick={handleitems} className={parseInt(setIsItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        <div className='flex items-center justify-center w-[90%] py-5'>
            <button onClick={submit1stItem} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Submit</button>
            

        </div>
            
    </form>
     </>
     
    : 
    
    <>
    {basketScreen4 === true ? 
    
      <>
     <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Finalize the Basket Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {permutations.map((item, index) => (
                <button onClick={handlePermutation1} className={parseInt(isPermutationSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        <div className='flex items-center justify-center w-[90%] py-5'>
            <button onClick={submitFinalizingBasket} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Submit</button>
            

        </div>
            
    </form>
     </>
    
    :
    
    <>
    {basketScreen3 === true ?
     
     <>
     <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Select the 3rd Basket</h1>

      
     <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {baskets.map((item, index) => (
                <button onClick={handleBasket3} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
        </div> 

        <h1 className='text-[24px] font-semibold mb-5 mt-5'>Select the Permutation of Basket Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {permutations.map((item, index) => (
                <button onClick={handlePermutation1} className={parseInt(isPermutationSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        <div className='flex items-center justify-center w-[90%] py-5'>
            <button onClick={submitBasket3} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Submit</button>
            

        </div>
            
    </form>
     </>
     
     :
     <>
    {basketScreen2 === true ?
     
      <>
    <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Select the 2nd Basket</h1>
     <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {baskets.map((item, index) => (
                <button onClick={handleBasket2} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
        </div> 
        <div className='flex items-center justify-center w-[90%] py-5'>
            <button onClick={submitBasket2} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Submit</button>
            

        </div>
            
    </form>
    </>

     : 
     <>
    {basketScreen1 === true ?
    <>
    <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Select the 1st Basket</h1>
     <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {baskets.map((item, index) => (
                <button onClick={handleBasket1} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
        </div> 
        <div className='flex items-center justify-center w-[90%] py-5'>
            <button onClick={submitBasket1} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Submit</button>
            

        </div>
            
    </form>
    </>
    :
    <>
    <form onSubmit={handleSubmit} className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Classifications</h1>
     <div className='flex flex-col items-center justify-center gap-5'>
      <div>    
        <select className='relative w-[220px] h-[26px] outline-none' name='numberOfLevels'  onChange={handleInputs} value={inputsData.numberOfLevels} >
                <option className='text-center' selected hidden>Number of Levels</option>
                <option className='text-center' value="1">1</option>
                <option className='text-center' value="2">2</option>
                <option className='text-center' value="3">3</option>
                <option className='text-center' value="4">4</option>
                <option className='text-center' value="5">5</option>
            </select> 
                {numberLevelError &&<span className='absolute text-[12px] text-[red]  ml-1 mt-[2px] bg-white px-[5px] py-[2px] rounded font-semibold'>*Please select the level</span>}
            </div>
            <div>
            <select className='relative w-[220px] h-[26px] outline-none' name='typeOfClassification'  onChange={handleInputs} value={inputsData.typeOfClassification} >
                <option className='text-center'  selected hidden>Type of Classification</option>
                <option className='text-center' value="N">Non-Hierarchical</option>
                <option className='text-center' value="H">Hierarchical</option>
                <option className='text-center' value="T">Tree Structure</option>
            </select>
            {classificationTypeError &&<span className='absolute text-[12px] text-[red]  ml-1 mt-[2px] bg-white px-[5px] py-[2px] rounded font-semibold'>*Please select the classification</span>}
            </div>
            
                <div>
                <input name='dbInsertedId' type='text' className='w-[220px] h-[26px] outline-none text-center' placeholder='Db-Inserted-Id' onChange={handleInputs} value={inputsData.dbInsertedId} />
                {dbInsertedIdError &&<span className='absolute text-[12px] text-[red]  ml-1 mt-[2px] bg-white px-[5px] py-[2px] rounded font-semibold'>*Please enter the Db Inserted Id</span>}
            </div>
            
            
        </div> 
        <div className='flex items-center justify-center w-[90%] py-5'>
            <button className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='submit'>Submit</button>
            

        </div>
        
        
      
        
            
            
            
            

            
              
            
           
            
           

      {errorMsg && <span className='absolute font-bold text-[red] text-[20px] bg-[rgba(255,255,255,0.80)] w-full text-center bottom-[50%]'>Please fill out all fields</span>}
            
            
            
    </form>
    </>}

    </>}
    </>}
    </>}
    </>}
    </>}
    </>}


    </>
  )

  }
export default Classification;