import React, {useState} from 'react'
import axios from 'axios';
import ClassificationType from './ClassificationType';


const Home = () => {

    const [next,setNext] = useState(false);

    const [totalBaskets,setTotalBaskets] = useState();

    const [itemsBasket1,setItemsBasket1] = useState("");
    const [itemsBasket2,setItemsBasket2] = useState("");
    const [itemsBasket3,setItemsBasket3] = useState("");
    const [itemsBasket4,setItemsBasket4] = useState("");
    const [itemsBasket5,setItemsBasket5] = useState("");

    const [itemsError1,setItemsError1] = useState(false);
    const [itemsError2,setItemsError2] = useState(false);
    const [itemsError3,setItemsError3] = useState(false);
    const [itemsError4,setItemsError4] = useState(false);
    const [itemsError5,setItemsError5] = useState(false);


    const [divTags1, setDivTags1] = useState([]);
    const [divTags2, setDivTags2] = useState([]);
    const [divTags3, setDivTags3] = useState([]);
    const [divTags4, setDivTags4] = useState([]);
    const [divTags5, setDivTags5] = useState([]);

    const [basketName1,setBasketName1] = useState("");
    const [basketName2,setBasketName2] = useState("");
    const [basketName3,setBasketName3] = useState("");
    const [basketName4,setBasketName4] = useState("");
    const [basketName5,setBasketName5] = useState("");

    const [loading,setLoading] = useState(false);
    const [dbInsertedId,setDbInsertedId] = useState("");
    const [showDbInsertId,setShowDbInsertId] = useState(false);
    const [copied,setCopied] = useState(false);
    const [showClassification,setShowClassification] = useState(false);

    const handleCopy = () => {
        const copyText = JSON.parse(dbInsertedId);
        navigator.clipboard.writeText(copyText);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        },500);
        setTimeout(() => {
            setShowDbInsertId(false);
        },1000);
      }

      const handleNext = () => {
      setShowClassification(true);  
    }

    const handleTotalBaskets = (e) => {
        setTotalBaskets(e.target.value);
        

    }

    const handleItemsBasket1 = (e) => {
        if(e.target.value > 1000){
            setItemsBasket1("1");
            setItemsError1(true);
        }else if(e.target.value < 1){
            setItemsBasket1("1");
            setItemsError1(true);
        } else {
            setItemsBasket1(e.target.value);
            setItemsError1(false);

            const numberAsString = e.target.value;
            let numberDivTags;
            if (numberAsString.length === 0) {
              numberDivTags = 0;
            } else {
              numberDivTags = parseInt(numberAsString, 10);
            }
            setDivTags1([...Array(numberDivTags)]);
            

        }
    }
    const handleItemsBasket2 = (e) => {
        if(e.target.value > 1000){
            setItemsBasket2("1");
            setItemsError2(true);
        }else if(e.target.value < 1){
            setItemsBasket2("1");
            setItemsError2(true);
        } else {
            setItemsBasket2(e.target.value);
            setItemsError2(false);

            const numberAsString = e.target.value;
            let numberDivTags;
            if (numberAsString.length === 0) {
              numberDivTags = 0;
            } else {
              numberDivTags = parseInt(numberAsString, 10);
            }
            setDivTags2([...Array(numberDivTags)]);
            
        }
    }
    const handleItemsBasket3 = (e) => {
        if(e.target.value > 1000){
            setItemsBasket3("1");
            setItemsError3(true);
        }else if(e.target.value < 1){
            setItemsBasket3("1");
            setItemsError3(true);
        } else {
            setItemsBasket3(e.target.value);
            setItemsError3(false);

            const numberAsString = e.target.value;
            let numberDivTags;
            if (numberAsString.length === 0) {
              numberDivTags = 0;
            } else {
              numberDivTags = parseInt(numberAsString, 10);
            }
            setDivTags3([...Array(numberDivTags)]);
            
        }
    }
    const handleItemsBasket4 = (e) => {
        if(e.target.value > 1000){
            setItemsBasket4("1");
            setItemsError4(true);
        }else if(e.target.value < 1){
            setItemsBasket4("1");
            setItemsError4(true);
        } else {
            setItemsBasket4(e.target.value);
            setItemsError4(false);

            const numberAsString = e.target.value;
            let numberDivTags;
            if (numberAsString.length === 0) {
              numberDivTags = 0;
            } else {
              numberDivTags = parseInt(numberAsString, 10);
            }
            setDivTags4([...Array(numberDivTags)]);
            
        }
    }
    const handleItemsBasket5 = (e) => {
        if(e.target.value > 1000){
            setItemsBasket5("1");
            setItemsError5(true);
        }else if(e.target.value < 1){
            setItemsBasket5("1");
            setItemsError5(true);
        } else {
            setItemsBasket5(e.target.value);
            setItemsError5(false);
            
            const numberAsString = e.target.value;
            let numberDivTags;
            if (numberAsString.length === 0) {
              numberDivTags = 0;
            } else {
              numberDivTags = parseInt(numberAsString, 10);
            }
            setDivTags5([...Array(numberDivTags)]);
            
            

        }
    }

    
    const [inputsBasket1,setInputsBasket1] = useState({});
    const [inputsBasket2,setInputsBasket2] = useState({});
    const [inputsBasket3,setInputsBasket3] = useState({});
    const [inputsBasket4,setInputsBasket4] = useState({});
    const [inputsBasket5,setInputsBasket5] = useState({});
 
    const handleInputsBasket1 = (e) => {
    setInputsBasket1({ ...inputsBasket1, [e.target.name]: e.target.value});
}
    const handleInputsBasket2 = (e) => {
    setInputsBasket2({ ...inputsBasket2, [e.target.name]: e.target.value});
}
    const handleInputsBasket3 = (e) => {
    setInputsBasket3({ ...inputsBasket3, [e.target.name]: e.target.value});
}
    const handleInputsBasket4 = (e) => {
    setInputsBasket4({ ...inputsBasket4, [e.target.name]: e.target.value});
}
    const handleInputsBasket5 = (e) => {
    setInputsBasket5({ ...inputsBasket5, [e.target.name]: e.target.value});
}
    
  
    const handleSubmit = (e) => {
        e.preventDefault();

        if(totalBaskets === undefined){

        }else{

        setLoading(true);
        

        const basket1 = [];
        Object.entries(inputsBasket1).forEach(([key, value]) => {
        const index = key.slice(key.indexOf('-') + 1);
        const prefix = key.slice(0, key.indexOf('-'));

        if (prefix === "item") {
            if (!basket1[index]) {
            basket1[index] = {};
            }
            basket1[index].item = value;
        } else if (prefix === "link") {
            if (!basket1[index]) {
            basket1[index] = {};
            }
            basket1[index].itemLink = value;
        }
        });

        const finalBasket1 = basket1.filter(obj => Object.keys(obj).length > 0);

        const lastBasket1 = JSON.stringify(finalBasket1);


         
        const basket2 = [];
        Object.entries(inputsBasket2).forEach(([key, value]) => {
        const index = key.slice(key.indexOf('-') + 1);
        const prefix = key.slice(0, key.indexOf('-'));

        if (prefix === "item") {
            if (!basket2[index]) {
            basket2[index] = {};
            }
            basket2[index].item = value;
        } else if (prefix === "link") {
            if (!basket2[index]) {
            basket2[index] = {};
            }
            basket2[index].itemLink = value;
        }
        });

        const finalBasket2 = basket2.filter(obj => Object.keys(obj).length > 0);

        const lastBasket2 = JSON.stringify(finalBasket2)

         

        const basket3 = [];
        Object.entries(inputsBasket3).forEach(([key, value]) => {
        const index = key.slice(key.indexOf('-') + 1);
        const prefix = key.slice(0, key.indexOf('-'));

        if (prefix === "item") {
            if (!basket3[index]) {
            basket3[index] = {};
            }
            basket3[index].item = value;
        } else if (prefix === "link") {
            if (!basket3[index]) {
            basket3[index] = {};
            }
            basket3[index].itemLink = value;
        }
        });

        const finalBasket3 = basket3.filter(obj => Object.keys(obj).length > 0);

        const lastBasket3 = JSON.stringify(finalBasket3)

          

        const basket4 = [];
        Object.entries(inputsBasket4).forEach(([key, value]) => {
        const index = key.slice(key.indexOf('-') + 1);
        const prefix = key.slice(0, key.indexOf('-'));

        if (prefix === "item") {
            if (!basket4[index]) {
            basket4[index] = {};
            }
            basket4[index].item = value;
        } else if (prefix === "link") {
            if (!basket4[index]) {
            basket4[index] = {};
            }
            basket4[index].itemLink = value;
        }
        });

        const finalBasket4 = basket4.filter(obj => Object.keys(obj).length > 0);

        const lastBasket4 = JSON.stringify(finalBasket4)

          

        const basket5 = [];
        Object.entries(inputsBasket5).forEach(([key, value]) => {
        const index = key.slice(key.indexOf('-') + 1);
        const prefix = key.slice(0, key.indexOf('-'));

        if (prefix === "item") {
            if (!basket5[index]) {
            basket5[index] = {};
            }
            basket5[index].item = value;
        } else if (prefix === "link") {
            if (!basket5[index]) {
            basket5[index] = {};
            }
            basket5[index].itemLink = value;
        }
        });

        const finalBasket5 = basket5.filter(obj => Object.keys(obj).length > 0);

        const lastBasket5 = JSON.stringify(finalBasket5)

var data;

if(lastBasket5.length > 2){
    data = `{
        ${basketName1}: ${lastBasket1},
        ${basketName2}: ${lastBasket2},
        ${basketName3}: ${lastBasket3},
        ${basketName4}: ${lastBasket4},
        ${basketName5}: ${lastBasket5}
    
    }`;
} else if(lastBasket4.length > 2){
    data = `{
        ${basketName1}: ${lastBasket1},
        ${basketName2}: ${lastBasket2},
        ${basketName3}: ${lastBasket3},
        ${basketName4}: ${lastBasket4}
    
    }`;
} else if(lastBasket3.length > 1){
    data = `{
        ${basketName1}: ${lastBasket1},
        ${basketName2}: ${lastBasket2},
        ${basketName3}: ${lastBasket3}
    
    }`;
} else if(lastBasket2.length > 2){
    data = `{
        ${basketName1}: ${lastBasket1},
        ${basketName2}: ${lastBasket2}
    
    }`;
} else if(lastBasket1.length > 2){
    data = `{
        ${basketName1}: ${lastBasket1}
    
    }`;
}

var myData = JSON.stringify(data);

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://100061.pythonanywhere.com/allbaskets/',
  headers: { },
  data : myData
};

axios(config)
.then(function (response) {
    setLoading(false);
  var myDbInsertedId = JSON.stringify(response.data.dbInsertedId);
  setDbInsertedId(myDbInsertedId);
  setShowDbInsertId(true);
  setNext(true);
  
})
.catch(function (error) {
  console.log(error);
  setShowDbInsertId(false);
  setNext(false);
});

}


    }

    


  return (
    <div className='w-full h-auto'>
    {showClassification ? <ClassificationType /> : <form onSubmit={handleSubmit} className='relative py-5 px-10 flex flex-col items-center justify-center w-full'>
        

        


        {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}
        {showDbInsertId && <div className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px] h-16'>
            <div className='relative bg-slate-800 w-[300px] h-16 rounded flex items-center justify-start '>
                <div className='text-white text-[12px] px-1'>dbInsertedId: <span className='text-orange-400 font-semibold'>{dbInsertedId}</span></div>
                {copied && <p className='text-[12px] font-bold py-1 px-2 absolute z-30 right-[50%] bg-slate-100 rounded '>Copied!</p>}
            </div>
            
            <div onClick={handleCopy} className='absolute right-0 top-0 rounded-r z-10 w-[50px] h-16 bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200'>
                <div className='relative'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 9.5C2 9.77614 2.22386 10 2.5 10H3V11H2.5C1.67157 11 1 10.3284 1 9.5V2.5C1 1.67157 1.67157 1 2.5 1H9.5C10.3284 1 11 1.67157 11 2.5V3H10V2.5C10 2.22386 9.77614 2 9.5 2H2.5C2.22386 2 2 2.22386 2 2.5V9.5Z" fill="#6B6B6B"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.5 5C5.67157 5 5 5.67157 5 6.5V13.5C5 14.3284 5.67157 15 6.5 15H13.5C14.3284 15 15 14.3284 15 13.5V6.5C15 5.67157 14.3284 5 13.5 5H6.5ZM6 6.5C6 6.22386 6.22386 6 6.5 6H13.5C13.7761 6 14 6.22386 14 6.5V13.5C14 13.7761 13.7761 14 13.5 14H6.5C6.22386 14 6 13.7761 6 13.5V6.5Z" fill="#6B6B6B"></path>
                    </svg>
                    
                </div>
                
            </div>
            
        </div>}
        <h1 className='text-[24px] font-semibold mb-5'>All Baskets</h1>
        
        <div className='mb-5 flex flex-col items-center justify-center '>
            <select className='w-[160px] h-8 outline-none' defaultValue="Number of Baskets" onChange={handleTotalBaskets}>
                <option className='text-center' disabled  hidden>Number of Baskets</option>
                <option className='text-center' value="1">1</option>
                <option className='text-center' value="2">2</option>
                <option className='text-center' value="3">3</option>
                <option className='text-center' value="4">4</option>
                <option className='text-center' value="5">5</option>
            </select>
            
        
        </div>

        
        {totalBaskets === "1" ? (

            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2 '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #1</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket1} value={itemsBasket1} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError1 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName1} onChange={(e) => setBasketName1(e.target.value)} className='outline-none' type='text' />
                </div>


        {divTags1.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer '>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket1} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input name={`link-${i+1}`} onChange={handleInputsBasket1} className='outline-none' type='text' />
                </div>
                <div>
                    

                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
                
            </div>

      ) : totalBaskets === "2" ? (
        
            <div  className='w-full space-y-4 flex flex-col justify-center items-center'>
        <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #1</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket1} value={itemsBasket1} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError1 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName1} onChange={(e) => setBasketName1(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags1.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket1} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input name={`link-${i+1}`} onChange={handleInputsBasket1} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>


            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #2</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket2} value={itemsBasket2} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError2 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName2} onChange={(e) => setBasketName2(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags2.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket2} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input  name={`link-${i+1}`} onChange={handleInputsBasket2} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>

            </div>
        
      ) : totalBaskets === "3" ? (
        
<div  className='w-full space-y-4 flex flex-col justify-center items-center'>
        <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #1</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket1} value={itemsBasket1} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError1 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName1} onChange={(e) => setBasketName1(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags1.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket1} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input name={`link-${i+1}`} onChange={handleInputsBasket1} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>

            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #2</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket2} value={itemsBasket2} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError2 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName2} onChange={(e) => setBasketName2(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags2.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket2} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input  name={`link-${i+1}`} onChange={handleInputsBasket2} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>

            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #3</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket3} value={itemsBasket3} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError3 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName3} onChange={(e) => setBasketName3(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags3.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket3} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input  name={`link-${i+1}`} onChange={handleInputsBasket3} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>

</div>
      ) : totalBaskets === "4" ? (
        <div  className='w-full space-y-4 flex flex-col justify-center items-center'>

        <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #1</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket1} value={itemsBasket1} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError1 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName1} onChange={(e) => setBasketName1(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags1.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket1} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input name={`link-${i+1}`} onChange={handleInputsBasket1} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>

            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #2</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket2} value={itemsBasket2} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError2 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName2} onChange={(e) => setBasketName2(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags2.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket2} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input  name={`link-${i+1}`} onChange={handleInputsBasket2} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>


            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #3</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket3} value={itemsBasket3} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError3 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName3} onChange={(e) => setBasketName3(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags3.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket3} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input  name={`link-${i+1}`} onChange={handleInputsBasket3} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>


            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #4</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket4} value={itemsBasket4} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError4 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName4} onChange={(e) => setBasketName4(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags4.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket4} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input  name={`link-${i+1}`} onChange={handleInputsBasket4} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>

        </div>
      ) : totalBaskets === "5" ? (
        <div  className='w-full space-y-4 flex flex-col justify-center items-center'>

        <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #1</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket1} value={itemsBasket1} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError1 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName1} onChange={(e) => setBasketName1(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags1.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket1} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input name={`link-${i+1}`} onChange={handleInputsBasket1} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>

            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #2</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket2} value={itemsBasket2} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError2 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName2} onChange={(e) => setBasketName2(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags2.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket2} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input  name={`link-${i+1}`} onChange={handleInputsBasket2} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>

            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #3</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket3} value={itemsBasket3} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError3 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName3} onChange={(e) => setBasketName3(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags3.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket3} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input  name={`link-${i+1}`} onChange={handleInputsBasket3} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>

            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #4</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket4} value={itemsBasket4} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError4 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName4} onChange={(e) => setBasketName4(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags4.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket4} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input  name={`link-${i+1}`} onChange={handleInputsBasket4} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>


            <div className='relative bg-[#cd97ff] rounded w-[90%] h-fit flex flex-col items-center  py-5 space-y-2'>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border  left-0 top-0 font-semibold'>Basket #5</span>
                <div className='relative flex items-center justify-center  space-x-2'>
                    <h4 className=''>Number of Items: </h4>
                    <input onChange={handleItemsBasket5} value={itemsBasket5} required className='w-10 text-center outline-none appearance-none' type='number' />
                    
                    {itemsError5 && <span className='absolute text-[red] right-[-150px] animate-pulse'>Error [1 - 1000 Max]</span>}
                </div>

                <div className='flex items-center justify-center  space-x-2'>
                <h4 >Basket Name: </h4>
                <input required value={basketName5} onChange={(e) => setBasketName5(e.target.value)} className='outline-none' type='text' />
                </div>



                {divTags5.map((e, i) => {
          return (
          
          <div key={i} className='relative flex items-center justify-center w-full border-[1px] border-slate-500  space-x-2 py-5 bg-[#cd97ff] hover:bg-[#cd84ff] cursor-pointer'>



            <div className='flex items-center justify-center space-x-2 flex-wrap '>
                <span className='absolute bg-slate-500 text-[12px] text-white px-[5px] border font-semibold left-0 top-0'>{i + 1}</span>
                <div className='flex items-center justify-center  space-x-2 max-[634px]:mb-2'>
                    <h4>Item: </h4>
                    <input required name={`item-${i+1}`} onChange={handleInputsBasket5} className='outline-none' type='text'  />
                </div>
                <div className='flex items-center justify-center  space-x-2'>
                    <h4>Item Link: </h4>
                    <input  name={`link-${i+1}`} onChange={handleInputsBasket5} className='outline-none' type='text' />
                </div>
            </div>





</div>
          );
                    
          
        })}
                
                
            </div>

        </div>
      ) : null}

      {next ? 
      <div className='flex items-center justify-around w-[90%] py-4 animate-pulse'>
            <button onClick={handleNext} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-6 rounded hover:bg-purple-600' type='button'>Next</button>
            

        </div>
      : 
        <div className='flex items-center justify-around w-[90%] py-4'>
            <button className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='submit'>Submit</button>
            

        </div>
       }
           


           
            
        
        
            
        
    </form>
    }
    </div>
  )
}

export default Home