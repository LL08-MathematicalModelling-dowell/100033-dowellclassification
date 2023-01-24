from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.http import JsonResponse

import json
import requests

from API.functions.dowellConnection import dowellConnection
from API.functions.eventCreation import get_event_id
from API.functions.classificationFunction import dbData,selectionOfBaskets, selectionOfItems

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
def classification(request):
    if(request.method=="POST"):
        data = json.loads(request.body)
        return JsonResponse(selectionOfItems(data))
    else:
        return HttpResponse("Method Not Allowed")

'''
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
'''