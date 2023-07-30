import React,{useState, useEffect} from 'react';
import axios from 'axios';

const NonHierarchical = (props) => {

  
  const { data, data1, data2 } = props;
  
  const [inputsData,setInputsData] = useState({
    numberOfLevels: 3,
    typeOfClassification: "",
    dbInsertedId: "649bc917da081daa9f9523a0"
  });
  const [baskets,setBaskets] = useState([]);
  const [insertedId,setInsertedId] = useState("");

  useEffect(() => {
    setInputsData(data);
    setBaskets(data1);
    setInsertedId(data2);
  }, []);
  
 
 const [loading,setLoading] = useState(false);
 const [selectedBasket,setSelectedBasket] = useState("");
 const [isSelected,setIsSelected] = useState(-1);
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
 const [showItemsPermutation,setShowItemsPermutation] = useState(false);


 const [numberLevelError,setNumberLevelError] = useState(true);
 const [classificationTypeError,setClassificationTypeError] = useState(true);
 const [dbInsertedIdError,setDbInsertedIdError] = useState(true);
 const [errorMsg,setErrorMsg] = useState(false);


 /// Basket Selection Screens
 
 const [basketScreen2,setBasketScreen2] = useState(false);
 const [basketScreen3A,setBasketScreen3A] = useState(false);
 const [basketScreen3B,setBasketScreen3B] = useState(false);
 const [basketScreen4,setBasketScreen4] = useState(false);
 const [itemScreen1,setItemScreen1] = useState(false);
 const [itemScreen2,setItemScreen2] = useState(false);
 const [itemScreen3,setItemScreen3] = useState(false);
 const [itemScreen4,setItemScreen4] = useState(false);
 const [itemScreen5,setItemScreen5] = useState(false);
 const [itemScreen6,setItemScreen6] = useState(false);
 const [functionScreen1,setFunctionScreen1] = useState(false);


 /// Permutations
 const [permutationBasket2,setPermutationBasket2] = useState([]);
 const [permutationItemsBasket1,setPermutationItemsBasket1] = useState([]);
 const [permutationItemsBasket2,setPermutationItemsBasket2] = useState([]);
 const [permutationItemsBasket3,setPermutationItemsBasket3] = useState([]);
 const [dotBaskets,setDotBaskets] = useState([]);
 



 /// Baskets to Show
 const [myBasket1, setMyBasket1] = useState("")
 const [myBasket2, setMyBasket2] = useState("")
 const [myBasket3, setMyBasket3] = useState("")
 /// Items to Show
 const [myBasket1Items, setMyBasket1Items] = useState([])
 const [myBasket2Items, setMyBasket2Items] = useState([])
 const [myBasket3Items, setMyBasket3Items] = useState([])

 // Classification Function States

 const [cfState, setCfState] = useState({
  _id: "",
  classificationType: "",
  numberOfLevels: "",
  eventId: "",
  dbInsertedId: "",
  baskets: "",
  basketOrder: "",
  finalSelection: {
  country: "",
  state: "",
  city: "",
  },
  totalLength: {
  country: "",
  state: "",
  city: "",
  },
  selectedLength: {
  country: "",
  state: "",
  city: "",
  },
  probability: "",
  finalOutput: "",
  });
  
  

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
  const value = e.target.value;
    setSelectedPermutation(e.target.value);
    setIsPermutationSelected(e.target.name);
    setPermutationBasket2(value); 
}
 const handlePermutation2 = (e) => {
  const value = e.target.value;
    setSelectedPermutation(e.target.value);
    setIsPermutationSelected(e.target.name);
    setPermutationItemsBasket1(value);
}
const handlePermutation3 = (e) => {
  const value = e.target.value;
    setSelectedPermutation(e.target.value);
    setIsPermutationSelected(e.target.name);
    setPermutationItemsBasket2(value);
}
const handlePermutation4 = (e) => {
  const value = e.target.value;
    setSelectedPermutation(e.target.value);
    setIsPermutationSelected(e.target.name);
    setPermutationItemsBasket3(value);
}

const handleitems = (e) => {
  e.preventDefault();
    setSelectedItem(e.target.value);
    setIsItemSelected(e.target.name);
    setSavePermutation([...savePermutation, e.target.value]);
    
}



const handleitems1 = (e) => {
  e.preventDefault();
    setSelectedItem(e.target.value);
    setIsItemSelected1(e.target.name);
    setSavePermutation1([...savePermutation1, e.target.value]);
  }

  const handleitems2 = (e) => {
    e.preventDefault();
      setSelectedItem(e.target.value);
      setIsItemSelected1(e.target.name);
      setSavePermutation2([...savePermutation2, e.target.value]);
    }











const submitBasket1 = (e) => {
  e.preventDefault(); 
  setSelectedBasket(e.target.value);
  
    
  const newBaskets = [...baskets];
  
  
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
      setLoading(false);
      setBasketScreen3A(true);
      setDotBaskets(response.data.baskets);

      setPermutationBasket2(permutations);
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



const basket2Permutation = () => {
  
  setLoading(true);
  /// Permutation API Call
    

  let data = {
    "inserted_id":insertedId,
    "selectedPermutation":permutationBasket2.split(","),
    "baskets": dotBaskets
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
  setBasketScreen3B(true);
  setBasketScreen3A(false);

  const firstValue = permutationBasket2.split(",")[0];
  const secondValue = permutationBasket2.split(",")[1];
  setMyBasket1(firstValue);
  setMyBasket2(secondValue);
  
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
  setBasketScreen3B(false);
  setBasketScreen3A(true);
  });

}


const submitBasket3 = (e) => {
  e.preventDefault();
  
  setPermutationBasket2([]);

    if(selectedBasket !== ""){
      const newBaskets = [...baskets];
  
     
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
        setDotBaskets(response.data.baskets);
        setPermutationBasket2(permutations);
        setLoading(false);
        setBasketScreen4(true);

        
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

 const basket3Permutation = () => {
  setLoading(true);
  /// Permutation API Call
      

  let data = {
    "inserted_id":insertedId,
    "selectedPermutation":permutationBasket2.split(","),
    "baskets": dotBaskets
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

  const firstValue = permutationBasket2.split(",")[0];
  const secondValue = permutationBasket2.split(",")[1];
  const thirdValue = permutationBasket2.split(",")[2];
  setMyBasket1(firstValue);
  setMyBasket2(secondValue);
  setMyBasket3(thirdValue);

  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
  setBasketScreen4(false);
  });

 }
     

  const submitFinalizingBasket = (e) => {
    e.preventDefault();
    setLoading(true);

    
      const newBaskets = [...baskets];
  
     
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

    setMyBasket1Items([...myBasket1Items,selectedItem]);

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

      if(response.data.permutations !== undefined){
        setPermutations(response.data.permutations);
        setShowItemsPermutation(true);
      }else{
        setPermutations([]);
        setShowItemsPermutation(false);
      }
      setLoading(false);
      setItemScreen2(true);
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

const basket1ItemsPermutation = () => {
  setLoading(true);

  //// Permutation API Call
  let data = {
    "inserted_id": insertedId,
    "selectedPermutation": permutationItemsBasket1.split(",")
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
    setMyBasket1Items(permutationItemsBasket1.split(","));
    setLoading(false);
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
    setItemScreen2(false);
  });

}


const submit2ndItem = (e) => {
  e.preventDefault();

  if(selectedItem !== ""){
    setLoading(true);
  let data = {
    "selectedItem":selectedItem,
    "basket":myBasket2,
    "insertedId":insertedId,
    "status":true
  };
  setMyBasket2Items([...myBasket2Items,selectedItem]);
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

    if(response.data.permutations !== undefined){
      setPermutations(response.data.permutations);
      setShowItemsPermutation(true);
    }else{
      setPermutations([]);
      setShowItemsPermutation(false);
    }
    

    
    
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

  }else {
    alert("Please select an item");
    setLoading(false);
     setItemScreen4(false);
  }
  setSelectedItem("");
  setIsItemSelected(-1);

}

const submit3rdItem = (e) => {
  e.preventDefault();

  if(selectedItem !== ""){
    setLoading(true);
  let data = {
    "selectedItem":selectedItem,
    "basket":myBasket2,
    "insertedId":insertedId,
    "status":true
  };

  setMyBasket2Items([...myBasket2Items,selectedItem]);

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

    if(response.data.permutations !== undefined){
      setPermutations(response.data.permutations);
      setShowItemsPermutation(true);
    }else{
      setPermutations([]);
      setShowItemsPermutation(false);
    }

    setLoading(false);
    setItemScreen4(true);
    
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
     setItemScreen4(false);
  });

  }else {
    alert("Please select an item");
    setLoading(false);
     setItemScreen4(false);
  }
  setSelectedItem("");
  setIsItemSelected(-1);

}

const basket2ItemsPermutation = () => {
  setLoading(true)

  //// Permutation API Call
  let data = {
    "inserted_id": insertedId,
    "selectedPermutation": permutationItemsBasket2.split(",")
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
    setMyBasket2Items(permutationItemsBasket2.split(","));
    setLoading(false);
     setItemScreen4(true);
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
     setItemScreen4(false);
  });


}


const submit4thItem = (e) => {
  e.preventDefault();

  if(selectedItem !== ""){
    setLoading(true);
  let data = {
    "selectedItem":selectedItem,
    "basket":myBasket3,
    "insertedId":insertedId,
    "status":true
  };
  setMyBasket3Items([...myBasket3Items,selectedItem]);
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
    

    if(response.data.permutations !== undefined){
      setPermutations(response.data.permutations);
      setShowItemsPermutation(true);
    }else{
      setPermutations([]);
      setShowItemsPermutation(false);
    }
    

    
    
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

  setMyBasket3Items([...myBasket3Items,selectedItem]);

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
    

    if(response.data.permutations !== undefined){
      setPermutations(response.data.permutations);
      setShowItemsPermutation(true);
    }else{
      setPermutations([]);
      setShowItemsPermutation(false);
    }
    setLoading(false);

    
    
    
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

}

const basket3ItemsPermutation = () => {

  setLoading(true);

  //// Permutation API Call
  let data = {
    "inserted_id": insertedId,
    "selectedPermutation": permutationItemsBasket3.split(",")
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
    setMyBasket3Items(permutationItemsBasket3.split(","));
     setItemScreen6(true);
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
     setItemScreen6(false);
  });

}



const finalizeItems = () => {
  
  setLoading(true);
  let data = {
    "selectedItem":"item",
    "basket":"basket",
    "insertedId":insertedId,
    "status":false
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

          /// Classification Function Call

          let data = {
            "insertedId": insertedId
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

          ///// Set CF States

          setCfState((prevCfState) => ({
            ...prevCfState,
            _id: response.data._id,
            classificationType: response.data.classificationType,
            numberOfLevels: response.data.numberOfLevels,
            eventId: response.data.eventId,
            dbInsertedId: response.data.dbInsertedId,
            baskets: response.data.baskets,
            basketOrder: response.data.basketOrder,
            finalSelection: {
              ...prevCfState.finalSelection,
              country: response.data.finalSelection.country,
              state: response.data.finalSelection.state,
              city: response.data.finalSelection.city,
            },
            totalLength: {
              ...prevCfState.totalLength,
              country: response.data.totalLength.country,
              state: response.data.totalLength.state,
              city: response.data.totalLength.city,
            },
            selectedLength: {
              ...prevCfState.selectedLength,
              country: response.data.selectedLength.country,
              state: response.data.selectedLength.state,
              city: response.data.selectedLength.city,
            },
            probability: response.data.probability,
            finalOutput: response.data.finalOutput,
          }));

          setItemScreen6(false);
          setFunctionScreen1(true);

        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });

}



 


  return (
    <>

      <div className='relative flex justify-center items-center w-full'>
        <div className='absolute flex items-start justify-center -top-5 pr-16'>
          <h1 className='font-bold text-2xl'>Non-Hierarchical</h1>
        </div>
        <div className='absolute flex justify-center items-start right-1 -top-10 gap-1 flex-wrap z-50'>
            

        {myBasket1 !== "" ? 

          <div className='flex flex-col items-center justify-center'>

          <div className='flex flex-col relative items-center justify-center border border-black w-24 h-11 cursor-pointer bg-white/80 hover:bg-white'>
          <div className='w-full h-full text-center mt-4 font-semibold '>{myBasket1}</div>
          <div className='bg-slate-600 absolute top-0 text-[10px] h-4 w-full text-center font-semibold text-white'>Basket #1</div>
          </div>
          {myBasket1Items.map((item, index) => (

            <div key={index} className='flex flex-col relative items-center justify-center border border-black w-24 h-9 cursor-pointer bg-white/80 border-t-0 hover:bg-white'>
          <div className='w-full h-full text-center mt-4 text-[12px] font-medium'>{item}</div>
          <div className='bg-slate-500 absolute top-0 text-[10px] h-4 w-full text-center font-semibold text-white'>item #{index+1}</div>
          </div>
            ))}
            </div>
         : null}

         {myBasket2 !== "" ? 

          <div className='flex flex-col items-center justify-center'>

          <div className='flex flex-col relative items-center justify-center border border-black w-24 h-11 cursor-pointer bg-white/80 hover:bg-white'>
          <div className='w-full h-full text-center mt-4 font-semibold'>{myBasket2}</div>
          <div className='bg-slate-600 absolute top-0 text-[10px] h-4 w-full text-center font-semibold text-white'>Basket #2</div>
          </div>
          {myBasket2Items.map((item, index) => (

            <div key={index} className='flex flex-col relative items-center justify-center border border-black w-24 h-9 cursor-pointer bg-white/80 border-t-0 hover:bg-white'>
          <div className='w-full h-full text-center mt-4 text-[12px] font-medium '>{item}</div>
          <div className='bg-slate-500 absolute top-0 text-[10px] h-4 w-full text-center font-semibold text-white'>item #{index+1}</div>
          </div>
            ))}
            </div>
         : null}

        

         {myBasket3 !== "" ? 

<div className='flex flex-col items-center justify-center'>

<div className='flex flex-col relative items-center justify-center border border-black w-24 h-11 cursor-pointer bg-white/80 hover:bg-white'>
<div className='w-full h-full text-center mt-4 font-semibold'>{myBasket3}</div>
<div className='bg-slate-600 absolute top-0 text-[10px] h-4 w-full text-center font-semibold text-white'>Basket #3</div>
</div>
{myBasket3Items.map((item, index) => (

  <div key={index} className='flex flex-col relative items-center justify-center border border-black w-24 h-9 cursor-pointer bg-white/80 border-t-0 hover:bg-white'>
<div className='w-full h-full text-center mt-4 text-[12px] font-medium'>{item}</div>
<div className='bg-slate-500 absolute top-0 text-[10px] h-4 w-full text-center font-semibold text-white'>item #{index+1}</div>
</div>
  ))}
  </div>
: null}
            
          </div>
      </div>


      <div className='pr-16'>
    {functionScreen1  ?
      
      <div className='flex flex-col items-center justify-center -mt-16'>
      <div className='flex items-center justify-center'>
      <h1 className='text-[24px] font-semibold'>Classification Function Output</h1>
      </div>
      <div>
      <table className="table-auto border-2 border-separate border-black text-center bg-white/60">
        <thead className='border-2 border-black'>
          <tr className='hover:bg-white/90 cursor-pointer'>
            <th className='border-2  border-black'>Keys</th>
            <th className='border-2  border-black'>Values</th>
          </tr>
        </thead>
        <tbody>
          
          <tr className='hover:bg-white/90 cursor-pointer'>
            <td className='border-2  border-black'>classificationType:</td>
            <td className='border-2  border-black'>{cfState.classificationType}</td>
          </tr>
          <tr className='hover:bg-white/90 cursor-pointer'>
            <td className='border-2  border-black'>numberOfLevels:</td>
            <td className='border-2  border-black'>{cfState.numberOfLevels}</td>
          </tr>
          
          
          
          <tr className='hover:bg-white/90 cursor-pointer'>
            <td className='border-2  border-black'>basketOrder:</td>
            <td className='border-2  border-black'>{JSON.stringify(cfState.basketOrder)}</td>
          </tr>
          
          <tr className='hover:bg-white/90 cursor-pointer'>
            <td className='border-2  border-black'>probability:</td>
            <td className='border-2  border-black'>{cfState.probability}</td>
          </tr>
          <tr className='hover:bg-white/90 cursor-pointer'>
            <td className='border-2  border-black'>finalOutput:</td>
            <td className='border-2  border-black'>{JSON.stringify(cfState.finalOutput)}</td>
          </tr>
        </tbody>
      </table>
      </div>
      </div>

    

     :
      <div className='-mt-16'>
    {itemScreen6  ?
      <>
     {showItemsPermutation ?
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select the Permutation of Items Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {permutations.map((item, index) => (
                <button onMouseUp={handlePermutation4} onClick={(e)=>{basket3ItemsPermutation(e);setShowItemsPermutation(false);setItemScreen6(true)}} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        
        
            
    </form>
      
       :
       
        <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}
      

        <h1 className='text-[24px] font-semibold mb-5'>Select items from 3rd Basket: {myBasket3}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {currentBasketItems.map((item, index) => (
                <button onMouseUp={handleitems2} onClick={submit5thItem} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        <div className='flex items-center justify-center mt-5'>
        <button onClick={finalizeItems} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Finalize</button>
        </div>
        
            
    </form>}
     </>
     
    : 
    


          
      <>
    {itemScreen5  ?
      <>
     
       
        <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select items from 3rd Basket: {myBasket3}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {nextBasketItems.map((item, index) => (
                <button onMouseUp={handleitems2} onClick={submit4thItem} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        
        
            
    </form>
     </>
     
    : 
    
      <>
    {itemScreen4  ?
      <>
     {showItemsPermutation ?
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select the Permutation of Items Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {permutations.map((item, index) => (
                <button onMouseUp={handlePermutation3} onClick={(e)=>{basket2ItemsPermutation(e);setShowItemsPermutation(false);setItemScreen4(true)}} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        
        
            
    </form>
      
       :
       
        <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select items from 2nd Basket: {myBasket2}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {currentBasketItems.map((item, index) => (
                <button onMouseUp={handleitems1} onClick={submit3rdItem} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        <div className='flex items-center justify-center mt-5'>
        <button onClick={()=>{setItemScreen5(true);setItemScreen4(false)}} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Next Basket</button>
        </div>
        
            
    </form>}
     </>
     
    : 
    


          
      <>
    {itemScreen3  ?
      <>
     {showItemsPermutation ?
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select the Permutation of Items Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {permutations.map((item, index) => (
                <button onMouseUp={handlePermutation2} onClick={()=>{setShowItemsPermutation(false);setItemScreen3(true)}} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

       
        
            
    </form>
      
       :
       
        <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select items from 2nd Basket: {myBasket2}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {nextBasketItems.map((item, index) => (
                <button onMouseUp={handleitems1} onClick={submit2ndItem} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        
        
            
    </form>}
     </>
     
    : 
    
    

    
      <>
    {itemScreen2  ?
      <>
     {showItemsPermutation ?
      
      <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select the Permutation of Items Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {permutations.map((item, index) => (
                <button onMouseUp={handlePermutation2} onClick={(e)=>{basket1ItemsPermutation(e);setShowItemsPermutation(false);setItemScreen2(true)}} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        
        
            
    </form>
      
       :
       
        <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select items from 1st Basket: {currentBasket}</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {currentBasketItems.map((item, index) => (
                <button onMouseUp={handleitems} onClick={submit1stItem} className={parseInt(isItemSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>

        <div className='flex items-center justify-center mt-5'>
        <button onClick={()=>{setItemScreen3(true);setItemScreen2(false)}} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Next Basket</button>
        </div>
        
            
    </form>}
     </>
     
    : 
    
    <>
    {itemScreen1  ?
      <>
     <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Select items from 1st Basket: {currentBasket}</h1>

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
     <form className='relative py-5 px-10 flex flex-col items-center justify-center  w-full'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      

      

        <h1 className='text-[24px] font-semibold mb-5'>Finalize the Basket Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {permutations.map((item, index) => (
                <button onMouseUp={(e) => handlePermutation1(e)}
                  onClick={(e)=>{basket3Permutation(e);submitFinalizingBasket(e)}}
                 className={parseInt(isPermutationSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{JSON.stringify(item)}</button>
            ))}
            
        </div>
            
    </form>
     </>
    
    :
    
    <>
    {basketScreen3B  ?

      <>
     <form className='relative py-5 px-10 flex flex-col items-center justify-center '>
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
     <form className='relative py-5 px-10 flex flex-col items-center justify-center '>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

  

        <h1 className='text-[24px] font-semibold mb-5'>Select the Permutation of Basket Order</h1>

        <div className='flex items-center justify-center gap-5 flex-wrap'>
      
        {permutations.map((item, index) => (
  <button
    onMouseUp={(e) => handlePermutation1(e)}
    onClick={basket2Permutation}
    className={parseInt(isPermutationSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'}
    name={index}
    value={item}
    type='button'
    key={index}
  >
    {JSON.stringify(item)}
  </button>
))}
            
        </div>

       
            
    </form>
     </>
     
     :
     <>
    {basketScreen2  ?
     
      <>
    <form className='relative py-5 px-10 flex flex-col items-center justify-center '>
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
    
    <>
    <form className='relative py-5 px-10 flex flex-col items-center justify-center'>
    {loading && <img className='absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]' src='loader1.gif' alt='loader' />}

    

      <h1 className='text-[24px] font-semibold mb-5'>Select the 1st Basket</h1>
     <div className='flex items-center justify-center gap-5 flex-wrap'>
      
     {baskets.map((item, index) => (
                <button onMouseUp={handleBasket1} onClick={submitBasket1} className={parseInt(isSelected) === index ? 'bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-500' : 'bg-purple-500 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-700'} name={index} value={item} type='button' key={index}>{item}</button>
            ))}
            
        </div> 
        
            
    </form>
    </>
    

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
    </div>}
    </div>
    </>
    
    
    

    
  )

  }
export default NonHierarchical;