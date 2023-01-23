from API.functions.dowellConnection import dowellConnection
from API.functions.permutationsFunction import permutationAPI

def dbData(data):
    idType = data['idType']
    dbInsertedId = ''
    if(idType == 'dbInsertedId'):
        dbInsertedId = data['id']
    elif(idType == 'insertedId'):
        dowellConnectionOutput = dowellConnection({
            'command' : 'fetch',
            'update_field' : None,
            'field':{
                '_id':data['id'],
            },
        })
        dbInsertedId = dowellConnectionOutput['data'][0]['dbInsertedId']
    else:
        data['message'] = f"{data['id']} is an invalid idType"
    allBasketsData = dowellConnection({
        'command' : 'fetch',
        'update_field' : None,
        'field':{
            '_id':dbInsertedId,
        },
    })
    data = allBasketsData['data'][0]['allBaskets']
    return data

def selectionOfBaskets(data):
    insertedId = data['insertedId']
    selectedBasket = data['selectedBasket']
    baskets = data['baskets']
    dowellConnectionOutput = dowellConnection({
        'command' : 'fetch',
        'update_field' : None,
        'field':{
            '_id':insertedId,
        },        
    })
    permutationsVariables = dowellConnectionOutput['data'][0]['permutationsVariables']
    numberOfLevels = dowellConnectionOutput['data'][0]['numberOfLevels']
    baskets.remove(selectedBasket)

    if(len(permutationsVariables) == 0):
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
            'message':'Select next basket from the given baskets',
            'baskets':baskets
        }
    elif(len(permutationsVariables) < numberOfLevels):
        output_data = permutationAPI({
            "inserted_id": insertedId,
            "nextVariable": selectedBasket,
            "selectedPermutation" : None,
            "command":"findPermutation",
        })
        permutations = output_data['permutationsVariables']
        return {
            'insertedId': insertedId,
            'permutations': permutations,
            'baskets':baskets,
            'message': 'Select and save from the given permutations of basket order and select next basket from the given baskets' if(numberOfLevels-permutationsVariables>1) else f'Select and save the permutation ,{numberOfLevels} baskets are already selected no need to select more baskets'
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
                'allItems': dataDb
            }
            })
        return {
            'insertedId':insertedId,
            'message': f'{numberOfLevels} baskets are already selected, select item from the given items for the first basket',
            'items': items
        }

def selectionOfItems(data):
    insertedId = data['insertedId']
    selectedItem = data['selectedItem']
    basket = data['basket']
    status = data['status']
    dowellConnectionOutput = dowellConnection({
        'command' : 'fetch',
        'update_field' : None,
        'field':{
            '_id':insertedId,
        },        
    })
    
    permutationsVariables = dowellConnectionOutput['data']['0']['permutationsVariables']
    remainingBaskets = dowellConnectionOutput['data']['0']['remainingBaskets']
    currentBasket = dowellConnectionOutput['data']['0']['currentBasket']
    basketOrder = dowellConnectionOutput['data']['0']['basketOrder']
    dataDb = dowellConnectionOutput['data']['0']['allItems']

    if(len(permutationsVariables) == 0):
        pass
    else:
        if(status == True):
            pass
        else:
            pass
    return

def classification(data):
    pass