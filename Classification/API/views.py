from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.http import JsonResponse

import json
import requests

from API.functions.dowellConnection import dowellConnection
from API.functions.eventCreation import get_event_id
from API.functions.classificationFunction import dbData,selectionOfBaskets, selectionOfItems, classification

@csrf_exempt
def allBaskets(request):
    if (request.method=="POST"):
        request_data=json.loads(request.body)
        callDowellConnection = dowellConnection({
                'command':'insert',
                'field':{
                    "allBaskets" : request_data,
                },
                'update_field':None,
                })
        return JsonResponse({ 'dbInsertedId' : callDowellConnection['inserted_id']})
    else:
        return HttpResponse("Method Not Allowed")   

@csrf_exempt
def classificationType(request):
    if(request.method=="POST"):
        request_data=json.loads(request.body)
        numberOfLevels=request_data['numberOfLevels']
        classificationType = request_data['classificationType']
        dbInsertedId = request_data['dbInsertedId']
        if(numberOfLevels <= 5):
            data = dbData({
                'idType': 'dbInsertedId',
                'id':dbInsertedId})
            baskets = [i for i in data.keys()]
            
            callDowellConnection = dowellConnection({
                    'command':'insert',
                    'field':{
                        'classificationType':classificationType,
                        'numberOfLevels':numberOfLevels,
                        'eventId':get_event_id(),
                        'permutationsVariables':[],
                        'dbInsertedId':dbInsertedId,
                        'baskets':baskets
                        },
                    'update_field':None,
                    })
            return JsonResponse({ 
                'insertedId' : callDowellConnection['inserted_id'],
                'message':'Select first baskets from the given baskets',
                'baskets': baskets
                })
        else:
            return JsonResponse({
                'message': f"Number of levels cannot be greater than 5"
            })
    else:
        return HttpResponse("Method Not Allowed")

@csrf_exempt
def basketSelection(request):
    if(request.method=="POST"):
        data = json.loads(request.body)
        return JsonResponse(selectionOfBaskets(data))
    else:
        return HttpResponse("Method Not Allowed")

@csrf_exempt
def itemSelection(request):
    if(request.method=="POST"):
        data = json.loads(request.body)
        return JsonResponse(selectionOfItems(data))
    else:
        return HttpResponse("Method Not Allowed")

@csrf_exempt
def classificationAPI(request):
    if(request.method=="POST"):
        data = json.loads(request.body)
        insertedId = data['insertedId']
        return JsonResponse(classification(insertedId))
    else:
        return HttpResponse("Method Not Allowed")