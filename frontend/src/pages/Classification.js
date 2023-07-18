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
 const [savePermutation1,setSavePermutation1] = useState([]);
 const [savePermutation2,setSavePermutation2] = useState([]);
 const [items,setItems] = useState([]);
 const [currentBasket,setCurrentBasket] = useState("");
 const [currentBasketItems,setCurrentBasketItems] = useState([]);
 const [nextBasket,setNextBasket] = useState("");
 const [nextBasketItems,setNextBasketItems] = useState([]);
 const [selectedItem,setSelectedItem] = useState("");
 const [isItemSelected,setIsItemSelected] = useState(-1);
 const [isItemSelected1,setIsItemSelected1] = useState(-1);
 const [itemSelectedBasket,setItemSelectedBasket] = useState("");
 const [finalOutput,setFinalOutput] = useState([]);



 const [numberLevelError,setNumberLevelError] = useState(true);
 const [classificationTypeError,setClassificationTypeError] = useState(true);
 const [dbInsertedIdError,setDbInsertedIdError] = useState(true);
 const [errorMsg,setErrorMsg] = useState(false);



 /// Basket Selection Screens
 const [basketScreen1,setBasketScreen1] = useState(false);
 const [basketScreen2,setBasketScreen2] = useState(false);
 const [basketScreen3A,setBasketScreen3A] = useState(false);
 const [basketScreen3B,setBasketScreen3B] = useState(false);
 const [basketScreen4,setBasketScreen4] = useState(false);
 const [itemScreen1,setItemScreen1] = useState(false);
 const [itemScreen2,setItemScreen2] = useState(false);
 const [itemScreen3A,setItemScreen3A] = useState(false);
 const [itemScreen3B,setItemScreen3B] = useState(false);
 const [itemScreen4,setItemScreen4] = useState(false);
 const [itemScreen5A,setItemScreen5A] = useState(false);
 const [itemScreen5B,setItemScreen5B] = useState(false);
 const [itemScreen6,setItemScreen6] = useState(false);
 const [itemScreen7,setItemScreen7] = useState(false);
 const [functionScreen1,setFunctionScreen1] = useState(false);

 /// Baskets to Show
 const [myBasket1, setMyBasket1] = useState("")
 const [myBasket2, setMyBasket2] = useState("")
 const [myBasket3, setMyBasket3] = useState("")
 /// Items to Show
 const [myBasket1Item1, setMyBasket1Item1] = useState("")
 const [myBasket1Item2, setMyBasket1Item2] = useState("")
 const [myBasket2Item1, setMyBasket2Item1] = useState("")
 const [myBasket2Item2, setMyBasket2Item2] = useState("")
 const [myBasket3Item1, setMyBasket3Item1] = useState("")
 const [myBasket3Item2, setMyBasket3Item2] = useState("")
 

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

 const handlePermutation1 = (e) => {
  e.preventDefault();
    setSelectedPermutation(e.target.value);
    setIsPermutationSelected(e.target.name);
    
}
 const handlePermutation2 = (e) => {
  e.preventDefault();
    setSelectedPermutation(e.target.value);
    setIsPermutationSelected(e.target.name);
    setSavePermutation([...savePermutation, e.target.value]);
}

const handlePermutation3 = (e) => {
  e.preventDefault();
    setSelectedPermutation(e.target.value);
    setIsPermutationSelected(e.target.name);
    
}


const handleitems = (e) => {
  e.preventDefault();
    setSelectedItem(e.target.value);
    setIsItemSelected(e.target.name);
    setItemSelectedBasket(currentBasket);
    setSavePermutation([...savePermutation, e.target.value]);
    
}



const handleitems1 = (e) => {
  e.preventDefault();
    setSelectedItem(e.target.value);
    setIsItemSelected1(e.target.name);
    setItemSelectedBasket(nextBasket);
    setSavePermutation1([...savePermutation1, e.target.value]);
  }

  const handleitems2 = (e) => {
    e.preventDefault();
      setSelectedItem(e.target.value);
      setIsItemSelected1(e.target.name);
      setItemSelectedBasket(nextBasket);
      setSavePermutation2([...savePermutation2, e.target.value]);
    }


 const [inputsData,setInputsData] = useState({
  numberOfLevels: 3,
  typeOfClassification: "N",
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
  setSelectedBasket(e.target.value);
  
    
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
      setMyBasket1(selectedBasket);
      
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
    setIsSelected(-1);
    
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
      setMyBasket2(selectedBasket);

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
      setBasketScreen3A(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      setBasketScreen3A(false);
      });
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setBasketScreen3A(false);
    });
  
    setSelectedBasket("");
    setIsSelected(-1);
  }else{
    alert("Please select the 2nd basket")
  }
   
    
    
}


const submitBasket3 = (e) => {
  e.preventDefault();
  
    

    if(selectedBasket !== ""){
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
        setMyBasket3(selectedBasket);


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
    setIsPermutationSelected(-1);
    setIsSelected(-1);
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
      setIsItemSelected(-1);
      setSavePermutation([]);
      setPermutations([""]);
      setIsPermutationSelected(-1)
  }


 

  const submit1stItem = (e) => {
    e.preventDefault();

    if(selectedItem !== ""){
      setLoading(true);
    let data = {
      "selectedItem":selectedItem,
      "basket":myBasket1,
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
      setCurrentBasket(response.data.currentBasket);
      setCurrentBasketItems(response.data.currentBasketItems);
      setNextBasket(response.data.nextBasket);
      setNextBasketItems(response.data.nextBasketItems);
      setMyBasket1Item1(selectedItem);

      
      
      //// Permutation API Call
      let data = {
        "inserted_id": insertedId,
        "selectedPermutation": savePermutation
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
        setItemScreen2(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setItemScreen2(false);
      });
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
    setIsItemSelected(-1);

}


const submit2ndItem = (e) => {
  e.preventDefault();

  if(selectedItem !== ""){
    setLoading(true);
  let data = {
      "selectedItem":selectedItem,
      "basket":myBasket1,
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
    setItemScreen3A(true);
    setCurrentBasket(response.data.currentBasket);
    setCurrentBasketItems(response.data.currentBasketItems);
    setNextBasket(response.data.nextBasket);
    setNextBasketItems(response.data.nextBasketItems);
    setPermutations(response.data.permutations);
    setMyBasket1Item2(selectedItem);

     //// Permutation API Call
  let data = {
    "inserted_id": insertedId,
    "selectedPermutation": savePermutation
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
    setItemScreen3A(true);
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
    setItemScreen3A(false);
  });

  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
    setItemScreen3A(false);
  });

  }else {
    alert("Please select an item");
    setLoading(false);
    setItemScreen3A(false);
  }
  setSelectedItem("");
  setIsItemSelected(-1);
  setIsItemSelected1(-1);
  setIsPermutationSelected(-1);
  setSavePermutation([]);
}







const submit3rdItem = (e) => {
  e.preventDefault();

  
    setLoading(true);
  let data = {
    "selectedItem":selectedItem,
    "basket":myBasket2,
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
    setCurrentBasket(response.data.currentBasket);
    setCurrentBasketItems(response.data.currentBasketItems);
    setNextBasket(response.data.nextBasket);
    setNextBasketItems(response.data.nextBasketItems);
    setMyBasket2Item1(selectedItem);

    
    
    //// Permutation API Call
    let data = {
      "inserted_id": insertedId,
      "selectedPermutation": savePermutation1
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
      setItemScreen4(true);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setItemScreen4(false);
    });
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
    setItemScreen4(false);
  });

  
  setSelectedItem("");
  setIsItemSelected(-1);
 
}

const submit4thItem = (e) => {
  e.preventDefault();

  if(selectedItem !== ""){
    setLoading(true);
  let data = {
      "selectedItem":selectedItem,
      "basket":myBasket2,
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
    setItemScreen5A(true);
    setCurrentBasket(response.data.currentBasket);
    setCurrentBasketItems(response.data.currentBasketItems);
    setNextBasket(response.data.nextBasket);
    setNextBasketItems(response.data.nextBasketItems);
    setPermutations(response.data.permutations);
    setMyBasket2Item2(selectedItem);

    

    //// Permutation API Call
    let data = {
      "inserted_id": insertedId,
      "selectedPermutation":savePermutation1
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
      setItemScreen5A(true);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setItemScreen5A(false);
    });

  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
    setItemScreen5A(false);
  });

  }else {
    alert("Please select an item");
    setLoading(false);
    setItemScreen5A(false);
  }
  setSelectedItem("");
  setIsItemSelected(-1);
  setIsItemSelected1(-1);
  setIsPermutationSelected(-1);
  setPermutations([]);
}


const submit5thItem = (e) => {
  e.preventDefault();

  if(selectedItem !== ""){
    setLoading(true);
  let data = {
    "selectedItem":selectedItem,
    "basket":myBasket3,
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
    setCurrentBasket(response.data.currentBasket);
    setCurrentBasketItems(response.data.currentBasketItems);
    setMyBasket3Item1(selectedItem);

    
    
    //// Permutation API Call
    let data = {
      "inserted_id": insertedId,
      "selectedPermutation": savePermutation2
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
      setItemScreen6(true);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setItemScreen6(false);
    });
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
    setItemScreen6(false);
  });

  }else {
    alert("Please select an item");
    setLoading(false);
    setItemScreen6(false);
  }
  setSelectedItem("");
  setIsItemSelected(-1);
  setPermutations([]);
  
}

const submit6thItem = (e) => {
  e.preventDefault();

  if(selectedItem !== ""){
    setLoading(true);
  let data = {
      "selectedItem":selectedItem,
      "basket":myBasket3,
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
    setItemScreen7(true);
    setCurrentBasket(response.data.currentBasket);
    setCurrentBasketItems(response.data.currentBasketItems);
    setPermutations(response.data.permutations);
    setMyBasket3Item2(selectedItem);
    //// Permutation API Call
    let data = {
      "inserted_id": insertedId,
      "selectedPermutation":savePermutation2
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
      setItemScreen7(true);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      setItemScreen7(false);
    });

  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
    setItemScreen7(false);
  });

  }else {
    alert("Please select an item");
    setLoading(false);
    setItemScreen7(false);
  }
  setSelectedItem("");
  setIsItemSelected(-1);
  setIsItemSelected1(-1);
  setIsPermutationSelected(-1);
  
}

const finalizeItemSelection = () => {
  setLoading(true)
  let data = {
    "selectedItem":"item",
    "basket":"basket",
    "insertedId":insertedId,
    "status":false
  }

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
  
})
.catch((error) => {
  console.log(error);
  setLoading(false)
});

setFunctionScreen1(true);
resultFunction();
setLoading(false);

}

const resultFunction = () => {
  setLoading(true);
  let data = {
    "insertedId":insertedId
  };

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://100061.pythonanywhere.com/function/',
    headers: { },
    data : data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    setLoading(false);
    setFinalOutput(response.data.finalOutput);
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
  });


}
 


  return (
    <>

      <div className='relative flex justify-center items-center w-full'>
        <div className='absolute flex items-start justify-center -top-8'>
          <h1 className='font-bold text-2xl'>Non-Hierarchical</h1>
        </div>
        <div className='absolute flex justify-center items-start right-1 -top-10 gap-1 flex-wrap z-50'>
            

        {myBasket1 !== "" ? <table className="border-2 bg-white/60 cursor-pointer">
          <thead className='border text-center'>
            <tr>
              <th className='font-semibold'>Basket #1</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td>{myBasket1}</td>
            </tr>
          </tbody>
          {myBasket1Item1 !== "" ?
          <>
          <thead className='border text-center mt-1'>
            <tr>
              <th className='font-semibold'>Item #1</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td>{myBasket1Item1}</td>
            </tr>
          </tbody>
          </>
          : ""}
          {myBasket1Item2 !== "" ?
          <>
          <thead className='border text-center'>
            <tr>
              <th className='font-semibold'>Item #2</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td>{myBasket1Item2}</td>
            </tr>
          </tbody>
          </>
          : ""}
          
        </table>
        :
        ""
        }

        {myBasket2 !== "" ? <table className="border-2 bg-white/60 cursor-pointer">
          <thead className='border text-center'>
            <tr>
              <th className='font-semibold'>Basket #2</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td>{myBasket2}</td>
            </tr>
          </tbody>
          {myBasket2Item1 !== "" ?
          <>
          <thead className='border text-center'>
            <tr>
              <th className='font-semibold'>Item #1</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td>{myBasket2Item1}</td>
            </tr>
          </tbody>
          </>
          : ""}
          {myBasket2Item2 !== "" ?
          <>
          <thead className='border text-center'>
            <tr>
              <th className='font-semibold'>Item #2</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td>{myBasket2Item2}</td>
            </tr>
          </tbody>
          </>
          : ""}
        </table>
        :
        ""
        }

        {myBasket3 !== "" ? <table className="border-2 bg-white/60 cursor-pointer">
          <thead className='border text-center'>
            <tr>
              <th className='font-semibold'>Basket #3</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td>{myBasket3}</td>
            </tr>
          </tbody>
          {myBasket3Item1 !== "" ?
          <>
          <thead className='border text-center'>
            <tr>
              <th className='font-semibold'>Item #1</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td>{myBasket3Item1}</td>
            </tr>
          </tbody>
          </>
          : ""}
          {myBasket3Item2 !== "" ?
          <>
          <thead className='border text-center'>
            <tr>
              <th className='font-semibold'>Item #2</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td>{myBasket3Item2}</td>
            </tr>
          </tbody>
          </>
          : ""}
        </table>
        :
        ""
        }
            
          </div>
      </div>

      <>
    {functionScreen1  ? 
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    
        <h1 className='text-[24px] font-semibold mb-5'>Result Function</h1>


        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {finalOutput.map((item, index) => (
                <button onMouseUp={handleitems2}className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        
            
    </form>
    
    

    :    
     


      <>
    {itemScreen7  ? 
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    
        <h1 className='text-[24px] font-semibold mb-5'>Finalize the Items Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>

     {permutations.map((item, index) => (
                <button onMouseUp={finalizeItemSelection} onClick={(e)=>{handlePermutation3(e);setItemScreen5A(false);setItemScreen5B(true)}} className={parseInt(isPermutationSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>
            
    </form>
    
    

    :    
      
  <>
    {itemScreen6  ? 
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    
        <h1 className='text-[24px] font-semibold mb-5'>Select 2nd item from 3rd Basket: {currentBasket}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {currentBasketItems.map((item, index) => (
                <button onMouseUp={handleitems2} onClick={submit6thItem} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>
            
    </form>
    
    :
    <>
    {itemScreen5B  ? 
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

        <h1 className='text-[24px] font-semibold mb-5'>Select 1st item from 3rd Basket: {myBasket3}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>

          {nextBasketItems.map((item, index) => (
                <button onMouseUp={handleitems2} onClick={submit5thItem} className={parseInt(isItemSelected1) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

            
    </form>

    :
    <>
    {itemScreen5A  ?
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

        <h1 className='text-[24px] font-semibold mb-5'>Select the Permutation of Item Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>

     {permutations.map((item, index) => (
                <button onClick={(e)=>{handlePermutation3(e);setItemScreen5A(false);setItemScreen5B(true)}} className={parseInt(isPermutationSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>
            
    </form>

    :

      <>
    {itemScreen4  ? 

      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    
        <h1 className='text-[24px] font-semibold mb-5'>Select 2nd item from 2nd Basket: {currentBasket}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {currentBasketItems.map((item, index) => (
                <button onMouseUp={handleitems1} onClick={submit4thItem} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>
            
    </form>
    
    

    :
    <>
    {itemScreen3B  ? 
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

        <h1 className='text-[24px] font-semibold mb-5'>Select 1st item from 2nd Basket: {myBasket2}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>

     {nextBasketItems.map((item, index) => (
                <button onMouseUp={handleitems1} onClick={submit3rdItem} className={parseInt(isItemSelected1) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

            
    </form>

    :
    <>
    {itemScreen3A  ?
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

        <h1 className='text-[24px] font-semibold mb-5'>Select the Permutation of Item Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>

     {permutations.map((item, index) => (
                <button onClick={(e)=>{handlePermutation2(e);setItemScreen3A(false);setItemScreen3B(true)}} className={parseInt(isPermutationSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>
            
    </form>

    :
    
    <>
    {itemScreen2  ?
    
    
      <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    
        <h1 className='text-[24px] font-semibold mb-5'>Select 2nd item from 1st Basket: {currentBasket}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {currentBasketItems.map((item, index) => (
                <button onMouseUp={handleitems} onClick={submit2ndItem} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>
            
    </form>
    
    

    :
    
    <>
    {itemScreen1  ?
      <>
     <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select 1st item from 1st Basket: {currentBasket}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {items.map((item, index) => (
                <button onMouseUp={handleitems} onClick={submit1stItem} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        
            
    </form>
     </>
     
    : 
    
    <>
    {basketScreen4  ? 
    
      <>
     <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Finalize the Basket Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {permutations.map((item, index) => (
                <button onMouseUp={handlePermutation1} onClick={submitFinalizingBasket} className={parseInt(isPermutationSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>
            
    </form>
     </>
    
    :
    
    <>
    {basketScreen3B  ?

      <>
     <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Select the 3rd Basket</h1>

      
     <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {baskets.map((item, index) => (
                <button onMouseUp={handleBasket3} onClick={submitBasket3} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
        </div> 

        
            
    </form>
     </>

     :

    <>
    {basketScreen3A  ?
     
     <>
     <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

  

        <h1 className='text-[24px] font-semibold mb-5'>Select the Permutation of Basket Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {permutations.map((item, index) => (
                <button onClick={(e)=>{handlePermutation1(e);setBasketScreen3A(false);setBasketScreen3B(true)}} className={parseInt(isPermutationSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

       
            
    </form>
     </>
     
     :
     <>
    {basketScreen2  ?
     
      <>
    <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Select the 2nd Basket</h1>
     <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {baskets.map((item, index) => (
                <button onMouseUp={handleBasket2} onClick={submitBasket2} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
        </div> 
        
            
    </form>
    </>

     : 
     <>
    {basketScreen1  ?
    <>
    <form className='relative py-5 px-10 flex flex-col items-center justify-center h-screen'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Select the 1st Basket</h1>
     <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {baskets.map((item, index) => (
                <button onMouseUp={handleBasket1} onClick={submitBasket1} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
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
    </>}
    </>}
    </>}
    </>}
    </>}
    </>}
    </>}
    </>}
    </>

    </>
  )

  }
export default Classification;