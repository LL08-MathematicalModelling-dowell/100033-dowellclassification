# Dowell Classification API Documentation
## Calling Dowell Classification API
### For Non Hierarchical Classification
#### 1. Classification Type
#### URL
```py
http://127.0.0.1:8000/type/
```
#### Request
```py
{
    "numberOfLevels": 2, 
    "classificationType": "N"
}
```
#### Response
```json
{
  "inserted_id": "63ac696342800d93168f9bdc"
}
```
#### 2. Basket Selection
#### URL
```py
http://127.0.0.1:8000/basket/
```
#### For First API Call for Basket Selection
#### Request
```json
{
    "selectedBasket":"",
    "baskets":[
  ],
    "inserted_id":"63ac696342800d93168f9bdc"
}
```
#### Response
```json
{
  "baskets": [
    "name",
    "education",
    "city",
    "result",
    "loan"
  ],
  "inserted_id": "63ac696342800d93168f9bdc",
  "message": "Select first basket from the given baskets ['name', 'education', 'city', 'result', 'loan']"
}
```
#### For Second API Call for Basket Selection

#### Request
```json
{
    "selectedBasket":"city",
    "baskets":[
    "name",
    "education",
    "city",
    "result",
    "loan"
  ],
    "inserted_id":"63ac696342800d93168f9bdc"
}
```
#### Response
```json
{
  "message": "Current order of baskets is [city], select the remaining 1 baskets",
  "inserted_id": "63ac696342800d93168f9bdc",
  "baskets": [
    "name",
    "education",
    "result",
    "loan"
  ]
}
```
#### For Next API Calls for Basket Selection

#### Request
```json
{
    "selectedBasket":"name",
    "baskets":[
    "name",
    "education",
    "result",
    "loan"
  ],
    "inserted_id":"63ac696342800d93168f9bdc"
}
```
#### Response
```json
{
  "permutations": [
    [
      "name",
      "city"
    ],
    [
      "city",
      "name"
    ]
  ],
  "inserted_id": "63ac696342800d93168f9bdc",
  "message": "Select from the given permutations : [['name', 'city'], ['city', 'name']] and save it, and select the remaining 0 baskets",
  "baskets": "2 baskets already selected"
}
```
#### 3. Saving Selected Basket Order
#### URL
```py
https://100050.pythonanywhere.com/permutationapi/api/
```
#### Request 
```json
{
  "inserted_id": "63ac696342800d93168f9bdc",
  "selectedPermutation":[
      "city",
      "name"
    ],
  "command": "savePermutation"
}
```
#### Response
```json
{
  "message": "Selected permutation ['city', 'name'] is saved successfully."
}
```
#### 4. Item Selection
#### URL
```py
http://127.0.0.1:8000/item/
```
#### For First API Call for Item Selection
#### Request
```json
{
  "selectedItem":"",
  "basket":"",
  "inserted_id":"63ac696342800d93168f9bdc",
  "status":true
}
```
#### Response
```json
{
  "items": [
    "kolkata",
    "mumbai",
    "chennai",
    "agra",
    "delhi"
  ],
  "basket": "city",
  "message": "Select first item from the basket city ",
  "inserted_id": "63ac696342800d93168f9bdc"
}
```
#### For Second API Call for Item Selection
#### Request
```json
{
  "selectedItem":"agra",
  "basket":"city",
  "inserted_id":"63ac696342800d93168f9bdc",
  "status":true
}
```
#### Response
```json
{
  "message": "Item agra selected successfully, select next item from the same basket city or from the next basket name",
  "currentBasket": "city",
  "nextBasket": "name",
  "currentBasketItems": [
    "kolkata",
    "mumbai",
    "chennai",
    "delhi"
  ],
  "nextBasketItems": [
    "j",
    "i",
    "d",
    "f",
    "b",
    "h",
    "g",
    "e",
    "c",
    "a"
  ]
}
```
#### For Next API Calls for Item Selection
#### Request
```json
{
  "selectedItem":"delhi",
  "basket":"city",
  "inserted_id":"63ac696342800d93168f9bdc",
  "status":true
}
```
#### Response
```py
{
  "permutations": [
    [
      "delhi",
      "agra"
    ],
    [
      "agra",
      "delhi"
    ]
  ],
  "message": "Select and save from the given permuations and select next item from the same basket city or from the next basket name",
  "currentBasket": "city",
  "nextBasket": "name",
  "currentBasketItems": [
    "kolkata",
    "mumbai",
    "chennai"
  ],
  "nextBasketItems": [
    "j",
    "i",
    "d",
    "f",
    "b",
    "h",
    "g",
    "e",
    "c",
    "a"
  ]
}
```
#### 5. Saving Selected Order of Items
```py
https://100050.pythonanywhere.com/permutationapi/api/
```
#### Request
```json
{
  "inserted_id": "63ac696342800d93168f9bdc",
  "selectedPermutation":[
      "agra",
      "delhi"
    ],
  "command": "savePermutation"
}
```
#### Response
```json
{
  "message": "Selected permutation ['agra', 'delhi'] is saved successfully."
}
```
#### 6. Selecting Items from Next Basket
#### URL
```py
http://127.0.0.1:8000/item/
```
#### Request
```json
{
  "selectedItem":"a",
  "basket":"name",
  "inserted_id":"63ac696342800d93168f9bdc",
  "status":true
}
```
#### Response
```json
{
  "message": "Item a selected successfully, select next item from the same basket name",
  "currentBasket": "name",
  "currentBasketItems": [
    "j",
    "i",
    "d",
    "f",
    "b",
    "h",
    "g",
    "e",
    "c"
  ]
}
```
#### 7. Saving all the Selections after Items from all Baskets are Selected
#### Request
```json
{
  "selectedItem":"a",
  "basket":"name",
  "inserted_id":"63ac696342800d93168f9bdc",
  "status":false
}
```
#### Response
```json
{
  "message": "Items from all required baskets are successfully selected."
}
```
#### 5. Calling Classification Function
#### URL
```py
http://127.0.0.1:8000/api/
```
#### Request
```json
{
  "inserted_id":"63ac696342800d93168f9bdc"
}
```
#### Response
```json
{
{
  "_id": "63ac696342800d93168f9bdc",
  "classificationType": "N",
  "numberOfLevels": 2,
  "eventId": "FB1010000000167224354951231081",
  "basketOrder": [
    "city",
    "name"
  ],
  "finalSelection": {
    "city": [
      "agra",
      "delhi"
    ],
    "name": [
      "a"
    ]
  },
  "totalLength": {
    "city": 5,
    "name": 10
  },
  "selectedLength": {
    "city": 2,
    "name": 1
  },
  "classifiedData": [
    {
      "name": "a",
      "education": "12",
      "city": "agra",
      "result": "pass",
      "loan": "yes"
    }
  ],
  "finalOutput": [
    [
      "agra",
      "delhi"
    ],
    [
      "a"
    ]
  ],
  "probability": 0.2
}
```

### For Hierarchical Classification and Tree Structure
#### 1. Classification Type
#### For Hierarchical Classification 
#### Request
```json
"classificationType" : "H"
```
#### For Tree Structure Classification 
#### Request
```json
"classificationType" : "T"
```
#### Response
```json
{
  "inserted_id": "63ac63026f8fc8ff5f8f9a59"
}
```
#### 2. Basket Selection
#### In Hierarchical Classification and Tree Structure Basket Selection will be done by the Frontend Programmer or the Project Owner using the same steps as followed in Non Hierarcical Classification.
#### 3. Item Selection and Calling Classification Function
#### Same Steps as followed in Non Hierarchical Classification for Item Selection and Calling Classification Function needs to be followed in Hierarchical Classification and Tree Structure. 
