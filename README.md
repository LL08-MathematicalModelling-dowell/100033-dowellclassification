# Dowell Classification API Documentation
## Insert Input Data
### URL
```json
http://100061.pythonanywhere.com/allbaskets/
```
### Request
```json
{
   "country":[
         {
            "item":"India",
            "itemLink":"Asia"
         },
         {
            "item":"USA",
            "itemLink":"North America"
         },
         {
            "item":"Germany",
            "itemLink":"Europe"
         }
   ],
   "state":[
         {
            "item":"Uttar Pradesh",
            "itemLink":"India"
         },
         {
            "item":"Maharashtra",
            "itemLink":"India"
         },
         {
            "item":"Georgia",
            "itemLink":"USA"
         },
         {
            "item":"Nevada",
            "itemLink":"USA"
         },
         {
            "item":"Bavaria",
            "itemLink":"Germany"
         },
         {
            "item":"Brandenburg",
            "itemLink":"Germany"
         }
   ],
   "city":[
         {
            "item":"Agra",
            "itemLink":"Uttar Pradesh"
         },
         {
            "item":"Noida",
            "itemLink":"Uttar Pradesh"
         },
         {
            "item":"Pune",
            "itemLink":"Maharashtra"
         },
         {
            "item":"Mumbai",
            "itemLink":"Maharashtra"
         },
         {
            "item":"Atlanta",
            "itemLink":"Georgia"
         },
         {
            "item":"Carson City",
            "itemLink":"Nevada"
         },
         {
            "item":"Munich",
            "itemLink":"Bavaria"
         },
         {
            "item":"Potsdam",
            "itemLink":"Brandenburg"
         }
   ]
}
```
### Response
```json
{
  "dbInsertedId": "63d8ec5e790d8f03c1318997"
}
```
## ``` For Non-Hierarchical Classification ```
## 1. Classification Type
### URL
```json
http://100061.pythonanywhere.com/type/
```
### Request
```json
{
    "numberOfLevels": 3, 
    "classificationType": "N",
    "dbInsertedId":"63d8ec5e790d8f03c1318997"
}
```
### Response
```json
{
  "insertedId": "63d8ed59790d8f03c13189aa",
  "message": "Select first baskets from the given baskets",
  "baskets": [
    "country",
    "state",
    "city"
  ]
}
```
## 2. Basket Selection
### URL
```json
http://100061.pythonanywhere.com/basket/
```
### Request
```json
{
    "selectedBasket":"state",
    "baskets":[
    "country",
    "state"
  ]
,
    "insertedId":"63d8ed59790d8f03c13189aa"
}
```
### Response
```json
{
  "insertedId": "63d8ed59790d8f03c13189aa",
  "permutations": [
    [
      "state",
      "city"
    ],
    [
      "city",
      "state"
    ]
  ],
  "baskets": [
    "country"
  ],
  "message": "Select and save from the given permutations of basket order and select next basket from the given baskets"
}
```
## 3. Save Selected Basket Order
### URL
```json
https://100050.pythonanywhere.com/permutationapi/api/
```
### Request
```json
{
  "inserted_id": "63d8ed59790d8f03c13189aa",
  "selectedPermutation":[
      "state",
      "city"
    ]
  ,
  "command": "savePermutation"
}
```
### Response
```json
{
  "message": "Selected permutation ['state', 'city'] is saved successfully."
}
```
## 4. Save Final Basket Order
### URL
```json
http://100061.pythonanywhere.com/basket/
```
### Request
```json
{
    "selectedBasket":"BasketOrder",
    "baskets":[
    "BasketOrder"
  ]
,
    "insertedId":"63d8ed59790d8f03c13189aa"
}
```
### Response
```json
{
  "insertedId": "63d8ed59790d8f03c13189aa",
  "message": "3 baskets are already selected, select item from the given items for the first basket",
  "basket": "country",
  "items": [
    "India",
    "USA",
    "Germany"
  ]
}
```
## 5. Item Selection
### URL
```json
http://100061.pythonanywhere.com/item/
```
### Request
```json
{
  "selectedItem":"India",
  "basket":"country",
  "insertedId":"63d8ed59790d8f03c13189aa",
  "status":true
}
```
### Response
```json
{
  "message": "Select and save permutation from the given permutations and select next item from the same basket country or next basket state",
  "nextBasekt": "state",
  "nextBasketItems": [
    "Uttar Pradesh",
    "Maharashtra",
    "Georgia",
    "Nevada",
    "Bavaria",
    "Brandenburg"
  ],
  "permutations": [
    [
      "Germany",
      "India"
    ],
    [
      "India",
      "Germany"
    ]
  ],
  "currentBasketItems": [
    "USA"
  ],
  "currentBasket": "country"
}
```
## 6. Save Selected Order of Items
### URL
```json
https://100050.pythonanywhere.com/permutationapi/api/
```
### Request
```json
{
  "inserted_id": "63d8ed59790d8f03c13189aa",
  "selectedPermutation":[
      "India",
      "Germany"
    ]
  ,
  "command": "savePermutation"
}
```
### Response
```json
{
  "message": "Selected permutation ['India', 'Germany'] is saved successfully."
}
```
## 7. Finalize Item Selection after selections from all baskets are done
### URL 
```json
http://100061.pythonanywhere.com/item/
```
### Request
```json
{
  "selectedItem":"",
  "basket":"",
  "insertedId":"63d8ed59790d8f03c13189aa",
  "status":false
}
```
### Response
```json
{
  "message": "Items from all required baskets are successfully selected"
}
```
## 8. Call Classification Function 
### URL
```json
http://100061.pythonanywhere.com/function/
```
### Request
```json
{
  "insertedId":"63d8ed59790d8f03c13189aa"
}
```
### Response
```json
{
  "_id": "63d8ed59790d8f03c13189aa",
  "classificationType": "N",
  "numberOfLevels": 3,
  "eventId": "FB1010000000167516091556471636",
  "dbInsertedId": "63d8ec5e790d8f03c1318997",
  "baskets": [
    "country",
    "state",
    "city"
  ],
  "basketOrder": [
    "country",
    "state",
    "city"
  ],
  "finalSelection": {
    "country": [
      "India",
      "Germany"
    ],
    "state": [
      "Uttar Pradesh",
      "Georgia"
    ],
    "city": [
      "Pune",
      "Munich"
    ]
  },
  "totalLength": {
    "country": 3,
    "state": 6,
    "city": 8
  },
  "selectedLength": {
    "country": 2,
    "state": 2,
    "city": 2
  },
  "probability": 0.35294117647058826,
  "finalOutput": [
    [
      "India",
      "Germany"
    ],
    [
      "Uttar Pradesh",
      "Georgia"
    ],
    [
      "Pune",
      "Munich"
    ]
  ]
}
```