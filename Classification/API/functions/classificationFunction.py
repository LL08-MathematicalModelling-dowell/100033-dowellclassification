from API.functions.dowellConnection import dowellConnection
from API.functions.permutationsFunction import permutationAPI

def dbData(data):
    idType = data['idType']
    dbInsertedId = ''
    if(idType == 'dbInsertedId'):
        dbInsertedId = data['id']
    elif(idType == 'insertedId'):
        dowellConnectionOutput = dowellConnection({
            'command' : 'find',
            'update_field' : None,
            'field':{
                '_id':data['id'],
            },
        })
        dbInsertedId = dowellConnectionOutput['data']['dbInsertedId']
    else:
        data['message'] = f"{data['id']} is an invalid idType"
    allBasketsData = dowellConnection({
        'command' : 'find',
        'update_field' : None,
        'field':{
            '_id':dbInsertedId,
        },
    })
    data = allBasketsData['data']['allBaskets']
    return data

def selectionOfBaskets(data):
    insertedId = data['insertedId']
    selectedBasket = data['selectedBasket']
    baskets = data['baskets']
    dowellConnectionOutput = dowellConnection({
        'command' : 'find',
        'update_field' : None,
        'field':{
            '_id':insertedId,
        },
    })
    permutationsVariables = dowellConnectionOutput['data']['permutationsVariables']
    numberOfLevels = dowellConnectionOutput['data']['numberOfLevels']

    if(len(permutationsVariables) == 0):
        baskets.remove(selectedBasket)
        dowellConnection({
            'command':'update',
            'field':{
                '_id':insertedId,
            },
            'update_field':{
                'permutationsVariables': [selectedBasket],
                'n': 1000,
                'r': 1000,
                'numberOfPermutations': 0,
            }
        })
        return {
            'insertedId':insertedId,
            'message':f'{selectedBasket} is selected successfully, select next basket from the given baskets',
            'baskets':baskets
        }
    elif(len(permutationsVariables) < numberOfLevels):
        baskets.remove(selectedBasket)
        outputData = permutationAPI({
            "inserted_id": insertedId,
            "nextVariable": selectedBasket,
            "selectedPermutation" : None,
            "command":"findPermutation",
        })
        permutations = outputData['permutationsVariables']
        return {
            'insertedId': insertedId,
            'permutations': permutations,
            'baskets':baskets,
            'message': 'Select and save from the given permutations of basket order and select next basket from the given baskets' if(numberOfLevels-len(permutationsVariables)>1) else f'Select and save the permutation, {numberOfLevels} baskets are already selected no need to select more baskets'
        }
    else:
        dataDb = dbData({
            'idType':'insertedId',
            'id': insertedId
        })
        items = []
        for i in dataDb[permutationsVariables[0]]:
            items.append(i['item'])

        totalLength = {}
        for i in permutationsVariables:
            totalLength[i] = len(dataDb[i])
        dowellConnection({
            'command':'update',
            'field':{
                '_id':insertedId,
            },
            'update_field':{
                'permutationsVariables': [],
                'basketOrder':permutationsVariables,
                'remainingBaskets':permutationsVariables,
                'finalSelection':{},
                'currentBasket':permutationsVariables[0],
                'totalLength':totalLength,
                'allItems': dataDb,
                'currentBasketItems':items
            }
            })
        dbInsertedId = dowellConnectionOutput['data']['dbInsertedId']
        dowellConnection({
            'command':'update',
            'field':{
                '_id':dbInsertedId,
            },
            'update_field':{
                'basketOrder':permutationsVariables,
            }
            })
        return {
            'insertedId':insertedId,
            'message': f'{numberOfLevels} baskets are already selected, select item from the given items for the first basket',
            'basket': permutationsVariables[0],
            'items': items
        }

def selectionOfItems(data):
    insertedId = data['insertedId']
    selectedItem = data['selectedItem']
    basket = data['basket']
    status = data['status']

    dowellConnectionOutput = dowellConnection({
        'command' : 'find',
        'update_field' : None,
        'field':{
            '_id':insertedId,
        },
    })

    permutationsVariables = dowellConnectionOutput['data']['permutationsVariables']
    remainingBaskets = dowellConnectionOutput['data']['remainingBaskets']
    currentBasket = dowellConnectionOutput['data']['currentBasket']
    basketOrder = dowellConnectionOutput['data']['basketOrder']
    classificationType = dowellConnectionOutput['data']['classificationType']
    currentBasketItems = dowellConnectionOutput['data']['currentBasketItems']
    dataDb = dowellConnectionOutput['data']['allItems']

    def getNextBasketItems(classificationType, nextBasket, itemsSelectedAtPreviousLevel):
        nextBasketItems = []
        if(classificationType == 'H' or classificationType == 'N'):
            nextBasketItems = [i["item"] for i in dataDb[nextBasket]]
        elif(classificationType == 'T'):
            for i in dataDb[nextBasket]:
                if(i['itemLink'] in itemsSelectedAtPreviousLevel):
                    nextBasketItems.append(i['item'])
        else:
            nextBasketItems = []
        return nextBasketItems

    output = {}
    if(status == True):
        if(basket == currentBasket):
            currentBasketItems.remove(selectedItem)
            if(len(permutationsVariables) == 0):
                if(len(remainingBaskets) == 1):
                    output = {
                        'message': f'{selectedItem} is selected successfully, now select next item from the same basket {currentBasket}',
                        'currentBasketItems': currentBasketItems,
                        'currentBasket': basket
                    }
                else:
                    output = {
                        'message':f'{selectedItem} is selected successfully, now select next item from the same basket {currentBasket} or next basket {remainingBaskets[1]}',
                        'currentBasketItems': currentBasketItems,
                        'currentBasket': basket,
                        'nextBasket': remainingBaskets[1],
                        'nextBasketItems': getNextBasketItems(classificationType, remainingBaskets[1], [selectedItem])
                    }
                dowellConnection({
                    'command':'update',
                    'field':{
                        '_id':insertedId,
                    },
                    'update_field':{
                        'permutationsVariables': [selectedItem],
                        'currentBasketItems':currentBasketItems
                    }
                })
                return output
            else:
                outputData = permutationAPI({
                    "inserted_id": insertedId,
                    "nextVariable": selectedItem,
                    "selectedPermutation" : None,
                    "command":"findPermutation",
                })
                if(len(remainingBaskets) == 1):
                    output = {
                        'message': f'Select and save permutation from the given permutations and select next item from the same basket {basket}',
                    }
                else:
                    permutationsVariables.append(selectedItem)
                    output = {
                        'message':f'Select and save permutation from the given permutations and select next item from the same basket {basket} or next basket {remainingBaskets[1]}',
                        'nextBasekt': remainingBaskets[1],
                        'nextBasketItems': getNextBasketItems(classificationType, remainingBaskets[1], permutationsVariables)
                    }
                output['permutations'] = outputData['permutationsVariables']
                output['currentBasketItems']= currentBasketItems
                output['currentBasket']= basket
                dowellConnection({
                    'command':'update',
                    'field':{
                        '_id':insertedId,
                    },
                    'update_field':{
                        'currentBasketItems':currentBasketItems
                    }
                })
                return output
        else:
            finalSelection = dowellConnectionOutput['data']['finalSelection']
            finalSelection[currentBasket] = permutationsVariables
            remainingBaskets.remove(currentBasket)
            if(len(remainingBaskets) == 1):
                remainingBaskets = remainingBaskets
                output = {
                    'message':f'{selectedItem} is selected successfully, select next item from the same basket {basket}',
                }
            else:
                output = {
                    'message':f'{selectedItem} is selected successfully, select next item from the same basket {basket} or the next basket {remainingBaskets[1]}',
                    'nextBasket': remainingBaskets[1],
                    'nextBasketItems':getNextBasketItems(classificationType, remainingBaskets[1], [selectedItem])
                }

            output['currentBasket'] = basket
            currentBasketItems = getNextBasketItems(classificationType, basket, permutationsVariables)
            currentBasketItems.remove(selectedItem)
            output['currentBasketItems'] = currentBasketItems
            dowellConnection({
                'command':'update',
                'field':{
                    '_id':insertedId,
                },
                'update_field':{
                    'finalSelection':finalSelection,
                    'permutationsVariables':[selectedItem],
                    'currentBasket':basket,
                    'remainingBaskets' : remainingBaskets,
                    'currentBasketItems' : currentBasketItems,
                }
            })
            return output
    elif(status == False):
        finalSelection = dowellConnectionOutput['data']['finalSelection']
        finalSelection[currentBasket] = permutationsVariables
        selectedLength = {}
        for i in finalSelection.keys():
            selectedLength[i] = len(finalSelection[i])
        dowellConnection({
            'command':'update',
            'field':{
                '_id':insertedId,
            },
            'update_field':{
                'finalSelection':finalSelection,
                'permutationsVariables':[],
                'selectedLength':selectedLength,
                'currentBasket': '',
                'remainingBaskets':[],
                'allItems':{}
            }
        })
        output = {
            'message': 'Items from all required baskets are successfully selected'
        }
        return output
    else:
        output['message'] = f'{status} is not a valid status'
        return output

def classification(insertedId):
    dowellConnectionOutput = dowellConnection({
    'command' : 'find',
    'update_field' : None,
    'field':{
        '_id':insertedId,
        },
    })

    classification_type=dowellConnectionOutput['data']['classificationType']
    selection_basket=dowellConnectionOutput['data']['finalSelection']
    total_length=dowellConnectionOutput['data']['totalLength']
    selected_length=dowellConnectionOutput['data']['selectedLength']
    final_keys=dowellConnectionOutput['data']['basketOrder']

    finalOutput = []
    for i in selection_basket.keys():
        finalOutput.append(selection_basket[i])

    probability = {}

    if(classification_type=='H'):
        total_dr=1
        total_nr=1
        for i in final_keys:
            total_dr=total_dr*(total_length[i])
        hie_probability= 1
        for i in final_keys:
            total_nr=total_nr*(selected_length[i])
        hie_probability=(total_nr/total_dr)
        float_hie_probability= "%.15f" %hie_probability
        probability = float_hie_probability

    elif(classification_type=='N'):
        total_dr=0
        total_nr=0
        non_hie_probability=0
        for i in final_keys:
            total_dr=total_dr+(total_length[i])
        for i in final_keys:
            total_nr=total_nr+(selected_length[i])
        non_hie_probability=(total_nr/total_dr)
        probability = non_hie_probability

    elif(classification_type=='T'):
        probability = 1
        for i in final_keys:
            probability *= selected_length[i]/total_length[i]

    dowellConnection({
        'command':'update',
        'field':{
            '_id':insertedId,
        },
        'update_field':{
            'finalOutput' : finalOutput,
            'probability':probability
        }
    })

    dowellConnectionOutput['data']['probability'] = probability
    dowellConnectionOutput['data']['finalOutput'] = finalOutput
    dowellConnectionOutput['data'].pop('permutationsVariables')
    dowellConnectionOutput['data'].pop('r')
    dowellConnectionOutput['data'].pop('n')
    dowellConnectionOutput['data'].pop('numberOfPermutations')
    dowellConnectionOutput['data'].pop('remainingBaskets')
    dowellConnectionOutput['data'].pop('currentBasket')
    dowellConnectionOutput['data'].pop('allItems')
    dowellConnectionOutput['data'].pop('currentBasketItems')
    return dowellConnectionOutput['data']