import requests
import json
def permutationAPI(data):
    inserted_id = data['inserted_id']
    nextVariable = data['nextVariable']
    command = data['command']
    selectedPermutation = data['selectedPermutation']
    url = 'https://100050.pythonanywhere.com/permutationapi/api/'
    payload = {
        "inserted_id": inserted_id,
        "nextVariable": nextVariable,
        "command":command,
        "selectedPermutation": selectedPermutation,
        'custom_collection':{
            "cluster": "dowellfunctions",
            "database": "dowellfunctions",
            "collection": "classification",
            "document": "classification",
            "team_member_ID": "1196001",
            "function_ID": "ABCDE",
        },
        }
    headers = {
        'content-type': 'application/json'
        }
    response = requests.post(url, json = payload, headers=headers)
    return response.json()  