from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.http import JsonResponse
import json
import requests
from math import factorial
from API.test_database import databaseOne, databaseTwo

def get_event_id():
    from datetime import datetime
    dd=datetime.now()
    time=dd.strftime("%d:%m:%Y,%H:%M:%S")
    url="https://100003.pythonanywhere.com/event_creation"
    data={
        "platformcode":"FB" ,
        "citycode":"101",
        "daycode":"0",
        "dbcode":"pfm" ,
        "ip_address":"192.168.0.41",
        "login_id":"lav",
        "session_id":"new",
        "processcode":"1",
        "regional_time":time,
        "dowell_time":time,
        "location":"22446576",
        "objectcode":"1",
        "instancecode":"100051",
        "context":"afdafa ",
        "document_id":"3004",
        "rules":"some rules",
        "status":"work",
        "data_type": "learn",
        "purpose_of_usage": "add",
        "colour":"color value",
        "hashtags":"hash tag alue",
        "mentions":"mentions value",
        "emojis":"emojis",
    }
    r=requests.post(url,json=data)
    return r.text
    
def dowellConnection(data):
    url = "http://100002.pythonanywhere.com/"
    command = data['command']
    field = data['field']
    update_field = data['update_field']
    payload = json.dumps({
        "cluster": "Documents",
        "database": "Documentation",
        "collection": "permutation",
        "document": "permutation",
        "team_member_ID": "100084007",
        "function_ID": "ABCDE",
        "command": command,
        "field": field,
        "update_field": update_field,
        "platform": "bangalore"
        })
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.json()

def permutationAPI(data):
    inserted_id = data['inserted_id']
    nextVariable = data['nextVariable']
    command = data['command']
    selectedPermutation = data['selectedPermutation']
    url = 'https://100050.pythonanywhere.com/permutationapi/api/'
    payload = {
        "inserted_id": inserted_id,
        "nextVariable": nextVariable,
        "n": None,
        "r": None,
        "command":command,
        "selectedPermutation": selectedPermutation,
        }
    headers = {
        'content-type': 'application/json'
        }
    response = requests.post(url, json =data,headers=headers)
    return response.json()  

def databaseDb():
    data = databaseOne()
    return data

def dbData():
    database = databaseDb()
    data = {}
    for i in database[0].keys():
        tempSet = set()
        for j in database:
            tempSet.add(j[i])
        data[i] = list(tempSet)
    return data

def classification(inserted_id):
    dowellConnectionOutput = dowellConnection({
    'command' : 'fetch',
    'update_field' : None,
    'field':{
        '_id':inserted_id,
        },
    })
    classified_data = {}
    classification_type=dowellConnectionOutput['data'][0]['classificationType']
    selection_basket=dowellConnectionOutput['data'][0]['finalSelection']
    total_length=dowellConnectionOutput['data'][0]['totalLength']
    selected_length=dowellConnectionOutput['data'][0]['selectedLength']
    final_keys=dowellConnectionOutput['data'][0]['basketOrder']
    filtered_data=[]
    data = databaseDb()
    def common_output():
        if(len(final_keys)==1):
            filtered_data=[i for i in data if (i[final_keys[0]] in selection_basket[final_keys[0]])]
        elif(len(final_keys)==2):
            filtered_data=[i for i in data if ((i[final_keys[0]] in selection_basket[final_keys[0]]) and (i[final_keys[1]] in selection_basket[final_keys[1]]))]            
        elif(len(final_keys)==3):
            filtered_data=[i for i in data if ((i[final_keys[0]] in selection_basket[final_keys[0]]) and (i[final_keys[1]] in selection_basket[final_keys[1]]) and (i[final_keys[2]] in selection_basket[final_keys[2]]))]            
        elif(len(final_keys)==4):
            filtered_data=[i for i in data if ((i[final_keys[0]] in selection_basket[final_keys[0]]) and (i[final_keys[1]] in selection_basket[final_keys[1]]) and (i[final_keys[2]] in selection_basket[final_keys[2]]) and (i[final_keys[3]] in selection_basket[final_keys[3]]))]            
        elif(len(final_keys)==5):
            filtered_data=[i for i in data if ((i[final_keys[0]] in selection_basket[final_keys[0]]) and (i[final_keys[1]] in selection_basket[final_keys[1]]) and (i[final_keys[2]] in selection_basket[final_keys[2]]) and (i[final_keys[3]] in selection_basket[final_keys[3]]) and (i[final_keys[3]] in selection_basket[final_keys[3]]))]            
        else:
            filtered_data = []
        return filtered_data
                    
    if(classification_type=='H'):
        filtered_data=common_output()
        classified_data['classified_data']=filtered_data
        total_dr=1
        total_nr=1
        for i in final_keys:
            total_dr=total_dr*(total_length[i])
        hie_probability= 1   
        for i in final_keys:
            total_nr=total_nr*(selected_length[i])
        hie_probability=(total_nr/total_dr)    
        float_hie_probability= "%.15f" %hie_probability          
        classified_data['probability']=float_hie_probability

    elif(classification_type=='N'):
        filtered_data=common_output()
        classified_data['classified_data']=filtered_data  
        total_dr=0
        total_nr=0
        non_hie_probability=0
        for i in final_keys:
            total_dr=total_dr+(total_length[i])
        for i in final_keys:
            total_nr=total_nr+(selected_length[i])
        non_hie_probability=(total_nr/total_dr)               
        classified_data['probability']=non_hie_probability   

    elif(classification_type=='T'):
        filtered_data=[i for i in data if i[final_keys[0]] in selection_basket[final_keys[0]]] 
        for j in range(1,len(final_keys)):
            items=[x for x in filtered_data if x[final_keys[j]] not in selection_basket[final_keys[j]]]
            for k in items:
                filtered_data.remove(k)   
        classified_data['classified_data']=filtered_data

        tree_structure_probability={}  
        PV1=1
        for i in selection_basket:
          PV1=PV1*len(selection_basket[i])
        tree_structure_probability['PV1']=PV1  
        PV2=len(selection_basket[final_keys[0]])/PV1
        tree_structure_probability['PV2']=PV2
        list_nr=[]
        list_dr=[]
        common_nr=set(selection_basket[final_keys[0]])
        for i in range(1,len(final_keys)):
            for j in (0,i):
                set_a=set(common_nr)
                set_b=set(selection_basket[final_keys[j]])
                common_nr=set_a & set_b
            list_nr.append(len(common_nr))
        common_dr=set(selection_basket[final_keys[0]])
        for i in range(1,len(final_keys)):
            for j in (0,i-1):
                set_a=set(common_dr)
                set_b=set(selection_basket[final_keys[j]])
                common_dr=set_a & set_b
            list_dr.append(len(common_dr))   
        for i in range(0,len(list_nr)):
            if list_nr[i]!=0 and list_dr[i]!=0:
                prob=list_nr[i]/list_dr[i]
            else:
                prob=0
            tree_structure_probability["PV"+str(i+3)]=prob
            classified_data['probability']=tree_structure_probability  
    finalOutput = []
    for i in selection_basket.keys():
        finalOutput.append(selection_basket[i])

    dowellConnection({
        'command':'update',
        'field':{       
            '_id':inserted_id,
        },
        'update_field':{
            'classifiedData' : classified_data['classified_data'],
            'probability' : classified_data['probability'],
            'finalOutput' : finalOutput
        }
    })
    dowellConnectionOutput['data'][0]['probability'] = classified_data['probability'] 
    dowellConnectionOutput['data'][0]['finalOutput'] = finalOutput
    dowellConnectionOutput['data'][0].pop('permutationsVariables')
    dowellConnectionOutput['data'][0].pop('r')
    dowellConnectionOutput['data'][0].pop('n')
    dowellConnectionOutput['data'][0].pop('numberOfPermutations')
    dowellConnectionOutput['data'][0].pop('items')
    dowellConnectionOutput['data'][0].pop('remainingBaskets')
    dowellConnectionOutput['data'][0].pop('currentBasket')
    return dowellConnectionOutput['data'][0]

@csrf_exempt
def classificationType(request):
    if(request.method=="POST"):
        request_data=json.loads(request.body)
        numberOfLevels=request_data['numberOfLevels']
        classificationType = request_data['classificationType']
        output_data={
            'classificationType':classificationType,
            'numberOfLevels':numberOfLevels,
            'eventId':get_event_id(),
            'permutationsVariables':[],
        }
        callDowellConnection = dowellConnection({
                'command':'insert',
                'field':output_data,
                'update_field':None,
                })
        return JsonResponse({ 'inserted_id' : callDowellConnection['inserted_id']})
    else:
        return HttpResponse("Method Not Allowed")   

@csrf_exempt
def basketSelection(request):
    if(request.method=="POST"):
        request_data=json.loads(request.body)
        selectedBasket = request_data['selectedBasket'] 
        baskets = request_data['baskets']
        inserted_id = request_data['inserted_id']
        if(len(baskets) == 0):
            data = dbData()
            basket = data.keys()
            baskets = []
            for i in basket:
                baskets.append(i)
            return JsonResponse({
                'baskets':baskets,
                'inserted_id':inserted_id,
                'message':f'Select first basket from the given baskets {baskets}',
            })
        else:
            dowellConnectionOutput = dowellConnection({
                'command' : 'fetch',
                'update_field' : None,
                'field':{
                    '_id':inserted_id,
                },
            })
            permutationsVariables = dowellConnectionOutput['data'][0]['permutationsVariables']
            numberOfLevels = dowellConnectionOutput['data'][0]['numberOfLevels']
            baskets.remove(selectedBasket)
            if(len(permutationsVariables) < numberOfLevels):
                if(len(permutationsVariables) == 0):
                    dowellConnection({
                        'command':'update',
                        'field':{       
                            '_id':inserted_id,
                        },
                        'update_field':{
                            'permutationsVariables': [selectedBasket],
                            'n': len(baskets),
                            'r': numberOfLevels,
                            'numberOfPermutations': int(factorial(len(baskets))/factorial(len(baskets)-numberOfLevels)),
                        }
                    })
                    return JsonResponse({
                        'message':f'Current order of baskets is [{selectedBasket}], select the remaining {numberOfLevels-(len(permutationsVariables)+1)} baskets',
                        'inserted_id':inserted_id,
                        'baskets':baskets,
                    })
                else:
                    output_data = permutationAPI({
                        "inserted_id": inserted_id,
                        "nextVariable": selectedBasket,
                        "selectedPermutation" : None,
                        "command":"findPermutation",
                    })
                    permutations = output_data['permutationsVariables']
                    return JsonResponse({
                        'permutations' : permutations,
                        'inserted_id' : inserted_id,
                        'message' : f'Select from the given permutations : {permutations} and save it, and select the remaining {numberOfLevels-(len(permutationsVariables)+1)} baskets',
                        'baskets' : baskets if(numberOfLevels-(len(permutationsVariables)+1) > 0) else f'{numberOfLevels} baskets already selected' ,
                    })
            else:
                return JsonResponse({'message':f'{numberOfLevels} baskets are already selected'})
    else:
        return HttpResponse("Method Not Allowed")   

@csrf_exempt
def itemSelection(request):
    if(request.method=="POST"):
        request_data=json.loads(request.body)
        inserted_id = request_data['inserted_id']
        selectedItem = request_data['selectedItem']
        status = request_data['status']
        basket = request_data['basket']
        if(basket == ""):
            dowellConnectionOutput = dowellConnection({
                'command' : 'fetch',
                'update_field' : None,
                'field':{
                    '_id':inserted_id,
                },
            })
            basketOrder = dowellConnectionOutput['data'][0]['permutationsVariables']
            items = {}
            totalLength = {}
            data = dbData()
            for i in basketOrder:
                items[i] = data[i]
                totalLength[i] = len(data[i])
            dowellConnection({
                'command':'update',
                'field':{       
                    '_id':inserted_id,
                },
                'update_field':{ 
                    'basketOrder': basketOrder,
                    'remainingBaskets':basketOrder,
                    'totalLength': totalLength,
                    'finalSelection':{},
                    'currentBasket': basketOrder[0],
                    'permutationsVariables':[],
                    'items': items,
                    'r' : 1000,
                    'n' : 1000,
                }
            })
            return JsonResponse({
                'items':items[basketOrder[0]],
                'basket': basketOrder[0],
                'message': f"Select first item from the basket {basketOrder[0]} ",
                'inserted_id': inserted_id
            })
        else:
            dowellConnectionOutput = dowellConnection({
                'command' : 'fetch',
                'update_field' : None,
                'field':{
                    '_id':inserted_id,
                },
            })
            remainingBaskets = dowellConnectionOutput['data'][0]['remainingBaskets']
            currentBasket = dowellConnectionOutput['data'][0]['currentBasket']
            items = dowellConnectionOutput['data'][0]['items']
            if(status == True):
                if (currentBasket == basket):
                    permutationsVariables = dowellConnectionOutput['data'][0]['permutationsVariables']
                    if(len(permutationsVariables) == 0):
                        currentBasketItems = items[basket]
                        currentBasketItems.remove(selectedItem)
                        items[basket] = currentBasketItems
                        dowellConnection({
                            'command':'update',
                            'field':{       
                                '_id':inserted_id,
                            },
                            'update_field':{
                                'permutationsVariables' : [selectedItem],
                                'items' : items
                            }
                        })
                        outputData = {}
                        if(len(remainingBaskets) == 1):
                            outputData = {
                                'message':f'Item {selectedItem} selected successfully, select next item from the same basket {basket}',
                                'currentBasket': basket,
                                'currentBasketItems':currentBasketItems,
                            }
                        else:
                            outputData = {
                                'message':f'Item {selectedItem} selected successfully, select next item from the same basket {basket} or from the next basket {remainingBaskets[1]}',
                                'currentBasket': basket,
                                'nextBasket':remainingBaskets[1],
                                'currentBasketItems':currentBasketItems,
                                'nextBasketItems': items[remainingBaskets[1]]
                            }
                        return JsonResponse(outputData)
                    else:
                        output_data = permutationAPI({
                            "inserted_id": inserted_id,
                            "nextVariable": selectedItem,
                            "selectedPermutation" : None,
                            "command":"findPermutation",
                        })
                        permutations = output_data['permutationsVariables']
                        currentBasketItems = items[basket]
                        currentBasketItems.remove(selectedItem)
                        items[basket] = currentBasketItems
                        dowellConnection({
                            'command':'update',
                            'field':{       
                                '_id':inserted_id,
                            },
                            'update_field':{
                                'items' : items
                            }
                        })
                        if(len(remainingBaskets) == 1):
                            outputData = {
                                'permutations':permutations,
                                'message': f'Select and save from the given permuations and select next item from the same basket {basket}',
                                'currentBasket': basket,
                                'currentBasketItems':currentBasketItems,
                            }
                        else:
                            outputData = {
                                'permutations':permutations,
                                'message': f'Select and save from the given permuations and select next item from the same basket {basket} or from the next basket {remainingBaskets[1]}',
                                'currentBasket': basket,
                                'nextBasket':remainingBaskets[1],
                                'currentBasketItems':currentBasketItems,
                                'nextBasketItems': items[remainingBaskets[1]]
                            }
                        return JsonResponse(outputData)

                else:
                    if(len(remainingBaskets) == 1):
                        remainingBaskets = remainingBaskets
                    else:
                        remainingBaskets.remove(currentBasket)
                    finalSelection = dowellConnectionOutput['data'][0]['finalSelection']
                    permutationsVariables = dowellConnectionOutput['data'][0]['permutationsVariables']
                    finalSelection[currentBasket] = permutationsVariables
                    currentBasketItems = items[basket]
                    currentBasketItems.remove(selectedItem)
                    items[basket] = currentBasketItems
                    dowellConnection({
                        'command':'update',
                        'field':{       
                            '_id':inserted_id,
                        },
                        'update_field':{
                            'finalSelection':finalSelection,
                            'permutationsVariables':[selectedItem],
                            'currentBasket':basket,
                            'remainingBaskets' : remainingBaskets,
                            'items' : items,
                        }
                    })
                    outputData = {}
                    if(len(remainingBaskets) == 1):
                        outputData = {
                            'message':f'Item {selectedItem} selected successfully, select next item from the same basket {basket}',
                            'currentBasket': basket,
                            'currentBasketItems':currentBasketItems,
                        }
                    else:
                        outputData = {
                            'message':f'Item {selectedItem} selected successfully, select next item from the same basket {basket} or from the next basket {remainingBaskets[0]}',
                            'currentBasket': basket,
                            'nextBasket':remainingBaskets[0],
                            'currentBasketItems':currentBasketItems,
                            'nextBasketItems': items[remainingBaskets[0]]
                        }
                    return JsonResponse(outputData)
            else:
                finalSelection = dowellConnectionOutput['data'][0]['finalSelection']
                permutationsVariables = dowellConnectionOutput['data'][0]['permutationsVariables']
                finalSelection[currentBasket] = permutationsVariables
                selectedLength = {}
                for i in finalSelection.keys():
                    selectedLength[i] = len(finalSelection[i])
                dowellConnection({
                    'command':'update',
                    'field':{       
                        '_id':inserted_id,
                    },
                    'update_field':{
                        'finalSelection':finalSelection,
                        'permutationsVariables':[],
                        'selectedLength':selectedLength,
                        'currentBasket': '',
                        'remainingBaskets':[]
                    }
                })
                return JsonResponse({'message': 'Items from all required baskets are successfully selected.'})
    else:
        return HttpResponse("Method Not Allowed")   

@csrf_exempt
def classificationAPI(request):
    if (request.method=="POST"):
        request_data=json.loads(request.body)
        output_data = classification(request_data['inserted_id'])
        return JsonResponse(output_data)
    else:
        return HttpResponse("Method Not Allowed")   
