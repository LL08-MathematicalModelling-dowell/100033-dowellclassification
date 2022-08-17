from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.http import JsonResponse
import json
from api.test_database import database

def segmentation_function(input_data):
    # We will be getting the original data from dowelltargetedpopulation/dowellsampling
    raw_data = database()    # Data from dowelltargetedpopulation/dowellsampling
    segmented_data = []
    for i in raw_data:
        if input_data['selected_city'] in i.values():
            segmented_data.append(i)
    
    selected_types = []
    for i in input_data['segmentation_input'].keys():
        selected_types.append(i)

    for i in selected_types:
        temp_data=[]
        if(int(i) != 0):
            filter_key = []
            for key in input_data['segmentation_input'][i].keys():
                filter_key.append(key)

            for j in segmented_data:
                if input_data['segmentation_input'][i][filter_key[0]] in j.values():
                    temp_data.append(j)
            segmented_data = temp_data
        elif(int(i) == 0):    
            break             
    if len(segmented_data)== 0:
        segmented_data = "No Documents Matching the Selected Options"

    segmentation_output = {
            'cityName':input_data['selected_city'],
            'numberOfLevels':input_data['selected_level'],
            'segmentationSelected':input_data['segmentation_input'],
            'segmentedData':segmented_data
        }            
    return segmentation_output

@csrf_exempt
def home(request):
    data = database()
    temp_data={}
    for i in data[0].keys():
        temp_data[i]=[]
        for j in data:
            if j[i] not in temp_data[i]:
                temp_data[i].append(j[i])       

    frontend_data={
        '1. Geographic Segmentation':{
            'region':temp_data['region'],
            },
        '2. Demographic Segmentation':{
            'income':temp_data['income'], 
            'education':temp_data['education'], 
            'occupation':temp_data['occupation'], 
            'familySize':temp_data['familySize'],
            'age':temp_data['age'],
            'gender':temp_data['gender']
            },

        '3. Pyschographic Segmentation':{
            'lifestyle':temp_data['lifestyle'],
            'attitude':temp_data['attitude'],
            'customerIQ':temp_data['customerIQ'],
            'personality':temp_data['personality'],
            }, 
        '4. Behavioural Segmentation':{
            'benefits':temp_data['benefits'], 
            'occasion':temp_data['occasion'], 
            'roles':temp_data['roles'],
            },
        '5. Usage Segmentation':{
            'usageRate':temp_data['usageRate'], 
            'awarenessRate':temp_data['awarenessRate'], 
            'purpose':temp_data['purpose'], 
            'brandLoyalty':temp_data['brandLoyalty'], 
            },
        }

    data = {}

    levels = [
        1,
        2,
        3,
        4,
        5,
        ]

    segmentation_options= [
        '0. No Segmentation',
        '1. Geographic Segmentation',
        '2. Demographic Segmentation',
        '3. Pyschographic Segmentation', 
        '4. Behavioural Segmentation',
        '5. Usage Segmentation',
        ]
    if request.method == 'GET':
        data = {
            'cities': temp_data['city'],
            'levels': levels,
            'segmentation_options':segmentation_options,
            'selected_level': 0,
            'cityMessage':"Select an Option",
            'levelMessage':"Select an Option",
            'url':'',
        }
    if request.method == 'POST': 
        selected_city = request.POST['city_code']
        selected_level = int(request.POST['number_of_levels'])
        data['selected_city']=selected_city
        data['selected_level']=selected_level  
        request.session['selected_city']=selected_city
        request.session['selected_level']=selected_level
        data = {
            'level':range(1, selected_level+1),
            'action':'disabled',
            'cityMessage':selected_city,
            'levelMessage':selected_level,
            'frontend_data':json.dumps(frontend_data),
            'url':'input/',
        }
    return render(request,'home.html', data)  
 
@csrf_exempt
def segmentation_input(request):
    if (request.method=="POST"):
        segmentation_input_data = {}
        selected_city=request.session['selected_city']
        selected_level=request.session['selected_level']
        for i in range(1, selected_level + 1):
            selected_type=int(request.POST[f'segmentation_type{i}'][0])
            selected_basis=request.POST[f'segmentation_basis{i}']
            selected_choice=request.POST[f'segmentation_choice{i}']
            segmentation_input_data[selected_type]={selected_basis:selected_choice}

        input_data = {
            'segmentation_input':segmentation_input_data,
            'selected_city':selected_city,
            'selected_level':selected_level,
        }
        segmentation_output=segmentation_function(input_data)

        return JsonResponse (segmentation_output, safe=False)
    else:
        return HttpResponse("Method Not Allowed")         

@csrf_exempt
def segmentation_api(request):
    if (request.method=="POST"):
        input_data=json.loads(request.body)
        segmentation_output=segmentation_function(input_data)
        return JsonResponse (segmentation_output, safe=False)
    else:
        return HttpResponse("Method Not Allowed")         