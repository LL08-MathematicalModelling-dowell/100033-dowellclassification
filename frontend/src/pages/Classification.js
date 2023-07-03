import React,{useState} from 'react';
import axios from 'axios';

const Classification = () => {

 const [inputsData,setInputsData] = useState({
    numberOfLevels: "",
    typeOfClassification: "",
    dbInsertedId: ""
 });
 
 const [baskets,setBaskets] = useState([]);
 const [msg,setMsg] = useState("");
 const [loading,setLoading] = useState(false);
 const [selectedBasket,setSelectedBasket] = useState("");
 const [remainingBaskets,setRemainingBaskets] = useState([]);
 const [isSelected,setIsSelected] = useState(-1);
 const [insertedId,setInsertedId] = useState("");
 const [permutations,setPermutations] = useState([]);
 const [selectPermutation,setSelectPermutation] = useState("");


 const handlePermutation = () => {
    console.log(JSON.stringify(permutations));
    
 }


 const handleSelectedBasket = (e) => {
    e.preventDefault();
    setSelectedBasket(e.target.value);
    setIsSelected(e.target.name); 
 }

 const submitSelectedBasket = () => {
    
    
    const newBaskets = [...baskets];
    
    setRemainingBaskets(newBaskets);
    setLoading(true);
    let data = {
        "selectedBasket":selectedBasket,
        "baskets": remainingBaskets
    ,
        "insertedId":insertedId
    };

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://100061.pythonanywhere.com/basket/',
        headers: { },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
       console.log(JSON.stringify(response.data));
        setBaskets(response.data.baskets);
        setMsg(response.data.message);
        setLoading(false);
        setInsertedId(response.data.insertedId);
        if((response.data.permutations) !== undefined) {
            setPermutations(response.data.permutations);
        }
      })
      .catch((error) => {
        
        setMsg("Something went wrong...!");
        setLoading(false);
      });
    
      
    
 }



 const handleInputs = (e) => {

    const {name, value} = e.target;

    setInputsData((prev) => {
        return {...prev, [name]:value};
    });

 }

const handleSubmit = (e) => {
    e.preventDefault();
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
       // console.log(JSON.stringify(response.data));
        setBaskets(response.data.baskets);
        setMsg(response.data.message);
        setInsertedId(response.data.insertedId);
        setLoading(false);
        
      })
      .catch((error) => {
        //console.log(error);
        setMsg("Something went wrong...!");
        setLoading(false);
      });

      
 
}

  return (
    <>
    <form onSubmit={handleSubmit} className='relative py-5 px-10 flex flex-col items-center justify-center'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10' src='loader.gif' alt='loader' />}
    
    {permutations === undefined 
    ?

        <>  <h1 className='text-[24px] font-semibold mb-5'>{msg === "" ? "Classifications" : msg}</h1>
    {msg === "" ? <> <div className='flex flex-col items-center justify-center gap-5'>    
        <select className='w-[220px] h-[26px] outline-none' name='numberOfLevels' required onChange={handleInputs} value={inputsData.numberOfLevels} >
                <option className='text-center' selected hidden>Number of Levels</option>
                <option className='text-center' value="1">1</option>
                <option className='text-center' value="2">2</option>
                <option className='text-center' value="3">3</option>
                <option className='text-center' value="4">4</option>
                <option className='text-center' value="5">5</option>
            </select>
            
            
            <select className='w-[220px] h-[26px] outline-none' name='typeOfClassification' required onChange={handleInputs} value={inputsData.typeOfClassification} >
                <option className='text-center'  selected hidden>Type of Classification</option>
                <option className='text-center' value="N">Non-Hierarchical</option>
                <option className='text-center' value="H">Hierarchical</option>
                <option className='text-center' value="T">Tree Structure</option>
            </select>
            
                
                <input name='dbInsertedId' type='text' className='w-[220px] h-[26px] outline-none text-center' placeholder='Db-Inserted-Id' onChange={handleInputs} required value={inputsData.dbInsertedId} />
            
            
        </div> 
        <div className='flex items-center justify-center w-[90%] py-5'>
            <button className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='submit'>Submit</button>
            

        </div></> : "" }
        
        
       {msg === "" ? "" : <> {msg === "Something went wrong...!" ? "" : <div className='flex items-center justify-center gap-5 w-[90%] py-4'>

            {baskets.map((item, index) => (
                <button onClick={handleSelectedBasket} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
            

        </div>}
        {msg === "Something went wrong...!" ? "" :
        <div className='flex items-center justify-center w-[90%] py-5'>
            <button onClick={submitSelectedBasket} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Submit</button>
            
            
            

            </div>}
            </> } 
            </>

            :

            <>
            <h1 className='text-[24px] font-semibold mb-5'>{msg === "" ? "Permutations" : msg}</h1>
            
            <div className='flex items-center justify-center gap-5 w-[90%] py-4'>
            {permutations.map((item, index) => (
                <button onClick={handleSelectedBasket} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            </div>
            </>
            }
            
    </form>
    </>
  )
}

export default Classification