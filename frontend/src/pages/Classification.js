import React,{useState, useEffect} from 'react';
import NonHierarchical from './Non-Hierarchical'
import Hierarchical from './Hierarchical'
import TreeStructure from './TreeStructure'
import axios from 'axios';

const Classification = (props) => {


  const [showH,setShowH] = useState(false);


  const [showType,setShowType] = useState("");

  const [baskets,setBaskets] = useState([]);
  const [items,setItems] = useState([]);
  const [insertedId,setInsertedId] = useState("");
  const [loading,setLoading] = useState(false);
  const [currentBasket,setCurrentBasket] = useState("");
  
 
 

 const [numberLevelError,setNumberLevelError] = useState(true);
 const [classificationTypeError,setClassificationTypeError] = useState(true);
 const [dbInsertedIdError,setDbInsertedIdError] = useState(true);
 const [errorMsg,setErrorMsg] = useState(false);



 const [inputsData,setInputsData] = useState({
  numberOfLevels: "Number of Levels",
  typeOfClassification: "Type of Classification",
  dbInsertedId: "649bc917da081daa9f9523a0"
});


 const handleInputs = (e) => {

    const {name, value} = e.target;

    setInputsData((prev) => {
        return {...prev, [name]:value};
    });
}

useEffect(() => {
  // Check for number of levels error
  if (inputsData.numberOfLevels === "Number of Levels") {
    setNumberLevelError(true);

  } else {
    setNumberLevelError(false);

  }

  // Check for classification type error
  if (inputsData.typeOfClassification === "Type of Classification") {
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
      
        if(response.data.baskets !== undefined){
        setBaskets(response.data.baskets);
      }
        if(response.data.insertedId !== undefined){
          setInsertedId(response.data.insertedId);
          setShowH(true);
        }
        
        setShowType(inputsData.typeOfClassification);
        
        
        if(response.data.items !== undefined){
          setItems(response.data.items);
        }

        if(response.data.basket !== undefined){
          setCurrentBasket(response.data.basket);
        }

        
        setLoading(false);
        
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorMsg(true);
        
      });

      

    }  
} 


  return (
    <div className=''>


    {showType === "T" ? <div className='flex flex-col items-center justify-center gap-20'><TreeStructure data={inputsData} data1={baskets} data2={insertedId} data3={items} data4={currentBasket} data5={showH} /></div> : ""}


    {showType === "H" ? <div className='flex flex-col items-center justify-center gap-20'><Hierarchical data={inputsData} data1={baskets} data2={insertedId} data3={items} data4={currentBasket} data5={showH} /></div> : ""}

    {showType === "N" ? <div className='flex flex-col items-center justify-center gap-20'> <NonHierarchical data={inputsData} data1={baskets} data2={insertedId} /></div> : ""}

    
    {showType === "" ? <form onSubmit={handleSubmit} className='relative py-5 px-10 flex flex-col items-center justify-center'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Classifications</h1>
     <div className='flex flex-col items-center justify-center gap-5'>
      <div>    
        <select className='relative w-[220px] h-[26px] outline-none'  name='numberOfLevels'  onChange={handleInputs} value={inputsData.numberOfLevels} >
                <option className='text-center' hidden>Number of Levels</option>
                <option className='text-center' value="1">1</option>
                <option className='text-center' value="2">2</option>
                <option className='text-center' value="3">3</option>
                <option className='text-center' value="4">4</option>
                <option className='text-center' value="5">5</option>
            </select> 
                {numberLevelError &&<span className='absolute text-[12px] text-[red]  ml-1 mt-[2px] bg-white px-[5px] py-[2px] rounded font-semibold'>*Please select the level</span>}
            </div>
            <div>
            <select className='relative w-[220px] h-[26px] outline-none' name='typeOfClassification'  onChange={handleInputs}  value={inputsData.typeOfClassification} >
                <option className='text-center'  hidden>Type of Classification</option>
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
            
            
            
    </form> : ""}
    
    </div>
    
    
    
    

    
  )

  }
export default Classification;