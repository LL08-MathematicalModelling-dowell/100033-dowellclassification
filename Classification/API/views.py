from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.http import JsonResponse
import json
import requests
from math import factorial
from API.test_database import databaseOne

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

def dbData():
    database = databaseOne()
    data = {}
    for i in database[0].keys():
        tempSet = set()
        for j in database:
            tempSet.add(j[i])
        data[i] = list(tempSet)
    return data

def classification(classification_input):
    filtered_data=[]
    data=database()
    classification_type=classification_input['classification_type']
    selection_basket=classification_input['final_selection']
    total_length=classification_input['total_length']
    selected_length=classification_input['selected_length']
    final_keys=[]
    for i in selection_basket.keys():
        final_keys.append(i)

    classified_data={
        'eventID':get_event_id(),
        'selection_dictionary':selection_basket,
        'classification_type':classification_type,
        'total_length':total_length,
        'selected_length':selected_length,
        'final_keys':final_keys
        }
    def common_output():
        if(len(final_keys)==1):
            filtered_data=[i for i in data if (i[final_keys[0]] in selection_basket[final_keys[0]])]
        if(len(final_keys)==2):
            filtered_data=[i for i in data if ((i[final_keys[0]] in selection_basket[final_keys[0]]) and (i[final_keys[1]] in selection_basket[final_keys[1]]))]            
        if(len(final_keys)==3):
            filtered_data=[i for i in data if ((i[final_keys[0]] in selection_basket[final_keys[0]]) and (i[final_keys[1]] in selection_basket[final_keys[1]]) and (i[final_keys[2]] in selection_basket[final_keys[2]]))]            
        if(len(final_keys)==4):
            filtered_data=[i for i in data if ((i[final_keys[0]] in selection_basket[final_keys[0]]) and (i[final_keys[1]] in selection_basket[final_keys[1]]) and (i[final_keys[2]] in selection_basket[final_keys[2]]) and (i[final_keys[3]] in selection_basket[final_keys[3]]))]            
        if(len(final_keys)==5):
            filtered_data=[i for i in data if ((i[final_keys[0]] in selection_basket[final_keys[0]]) and (i[final_keys[1]] in selection_basket[final_keys[1]]) and (i[final_keys[2]] in selection_basket[final_keys[2]]) and (i[final_keys[3]] in selection_basket[final_keys[3]]) and (i[final_keys[3]] in selection_basket[final_keys[3]]))]            
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
    dowell_connection(classified_data)
    return classified_data

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
        }
        if(classificationType=='N'):
            data = dbData()
            basket = data.keys()
            baskets = []
            for i in basket:
                baskets.append(i)
            output_data['permutationsVariables'] = []
            callDowellConnection = dowellConnection({
                'command':'insert',
                'field':output_data,
                'update_field':None,
                })
            output_data['baskets'] = baskets
            output_data['inserted_id'] = callDowellConnection['inserted_id']
            output_data['message'] = f'Select {numberOfLevels} Baskets'
            return JsonResponse(output_data)
        elif(classificationType=='H' or classificationType=='T'):
            inserted_id = request_data['inserted_id']
            dowellConnectionOutput = dowellConnection({
                'command' : 'fetch',
                'update_field' : None,
                'field':{
                    '_id':inserted_id,
                },
            })
            baskets = []
            if(dowellConnectionOutput['isSuccess'] == True):
                baskets = dowellConnectionOutput['data'][0]['permutationsVariables'][0:numberOfLevels]
            else:
                return JsonResponse({"message":f" inserted_id : {inserted_id} is not present in the databse "})
            output_data['baskets']= baskets
            callDowellConnection = dowellConnection({
                'command':'insert',
                'field':output_data,
                'update_field':None,
                })
            output_data['inserted_id'] = callDowellConnection['inserted_id']
            output_data['message'] = f'Select items from the baskets'
            output_data['baskets'] = baskets
            return JsonResponse(output_data)
        else:
            return JsonResponse({'message':'Select a valid Classification Type'})
    else:
        return HttpResponse("Method Not Allowed")   

@csrf_exempt
def basketSelection(request):
    if(request.method=="POST"):
        request_data=json.loads(request.body)
        selectedBasket = request_data['selectedBasket'] 
        baskets = request_data['baskets']
        inserted_id = request_data['inserted_id']
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
                    'message' : f'Select from the given permutations : {permutations} and save it, and select the remaining {numberOfLevels-(len(permutationsVariables)+1)} baskets' if(numberOfLevels-(len(permutationsVariables)+1) > 0) else 'Select items from the baskets',
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
    else:
        return HttpResponse("Method Not Allowed")   

@csrf_exempt
def classificationAPI(request):
    if (request.method=="POST"):
        request_data=json.loads(request.body)
        output_data = classification(request_data)
        return JsonResponse(output_data)
    else:
        return HttpResponse("Method Not Allowed")   

'''
Classification API
1st Route
Request 
{
    "numberOfLevels": 3, 
    "classificationType": "N",
    "inserted_id" : None,
}
          save both in the database using dowellConnection with eventId
Response -  if classificationType = Hie or Tree-Strucuture
                basket order for item     selection 
            if classificationType = Non-Hie
                baskets for selection
            eventId, inserted_id
2nd Route 
Request 
{
    "selectedBasket":,
    "baskets":,
    "inserted_id":,
}

3rd Route

Step 1  : Call 1st Route
for i in range numberOfLevels
{
Step 2  : Call 2nd Route
Step 3 : Save the selected permutation
}

classification_input
{
        'classification_type':classification_type,
        'total_length':total_length,
        'selected_length':selected_length,
        'final_selection':final_selection,
    }   
'''