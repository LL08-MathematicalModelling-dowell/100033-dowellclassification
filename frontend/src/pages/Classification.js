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


 const [numberLevelError,setNumberLevelError] = useState(true);
 const [classificationTypeError,setClassificationTypeError] = useState(true);
 const [dbInsertedIdError,setDbInsertedIdError] = useState(true);
 const [errorMsg,setErrorMsg] = useState(false);


 /// Basket Selection Screens
 const [basketScreen1,setBasketScreen1] = useState(false);
 const [basketScreen2,setBasketScreen2] = useState(false);
 const [basketScreen3,setBasketScreen3] = useState(false);
 const [basketScreen4,setBasketScreen4] = useState(false);

 

 


 const handleBasket1 = (e) => {
    e.preventDefault();
    setSelectedBasket(e.target.value);
    setIsSelected(e.target.name);
 }
 const handleBasket2 = (e) => {
    e.preventDefault();
    setSelectedBasket(e.target.value);
    setIsSelected(e.target.name);
 }
 const handleBasket3 = (e) => {
    e.preventDefault();
    setSelectedBasket(e.target.value);
    setIsSelected(e.target.name);
 }
 const handlePermutation1 = (e) => {
  e.preventDefault();
    setSelectedPermutation(e.target.value);
    setIsPermutationSelected(e.target.name);
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
        "selectedPermutation":selectedBasket,
        "baskets": newBaskets
    };

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://100061.pythonanywhere.com/savepermutations/',
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
  e.preventDefault(); 
    
  const newBaskets = [...baskets];
  
   setRemainingBaskets(newBaskets);
  // setLoading(true);
  let data = {
      "selectedBasket":selectedBasket,
      "baskets": newBaskets,
      "insertedId":insertedId
  };

    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://100061.pythonanywhere.com/basket/',
    //   headers: { },
    //   data : JSON.stringify(data)
    // };
    
    // axios.request(config)
    // .then((response) => {
    //  console.log(JSON.stringify(response.data));
    //   setBaskets(response.data.baskets);
    //   setLoading(false);
    //   setInsertedId(response.data.insertedId);
    //   setBasketScreen2(true);
    //   setPermutations(response.data.permutations)
      
    //   /// Permutation API Call
      
    // })
    // .catch((error) => {
    //   console.log(error);
    //   setLoading(false);
    //   setBasketScreen2(false);
    // });
  
    // setSelectedBasket("");
   
    console.log(data);
    
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
        setLoading(false);
        setInsertedId(response.data.insertedId);
        setBasketScreen4(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setBasketScreen4(false);
      });
    
      setSelectedBasket("");
  
    }else{
      alert("Please select Permutation & 3rd Basket");
      setLoading(false);
    }


   
  
}
      
 


  return (
    <>


    {basketScreen3 === true ?
     
     <>
     <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Select second basket</h1>

      <div className='flex items-center justify-center gap-5'>
      
     {permutations.map((item, index) => (
                <button onClick={handlePermutation1} className={parseInt(isPermutationSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
        </div>
     <div className='flex items-center justify-center gap-5'>
      
     {baskets.map((item, index) => (
                <button onClick={handleBasket3} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
        </div> 
        <div className='flex items-center justify-center w-[90%] py-5'>
            <button onClick={submitBasket3} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='submit'>Submit</button>
            

        </div>
            
    </form>
     </>
     
     :
     <>
    {basketScreen2 === true ?
     
      <>
    <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Select second basket</h1>
     <div className='flex items-center justify-center gap-5'>
      
     {baskets.map((item, index) => (
                <button onClick={handleBasket2} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
        </div> 
        <div className='flex items-center justify-center w-[90%] py-5'>
            <button onClick={submitBasket2} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='submit'>Submit</button>
            

        </div>
            
    </form>
    </>

     : 
     <>
    {basketScreen1 === true ?
    <>
    <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Select first basket</h1>
     <div className='flex items-center justify-center gap-5'>
      
     {baskets.map((item, index) => (
                <button onClick={handleBasket1} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
        </div> 
        <div className='flex items-center justify-center w-[90%] py-5'>
            <button onClick={submitBasket1} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='submit'>Submit</button>
            

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



    </>
  )

  }
export default Classification;