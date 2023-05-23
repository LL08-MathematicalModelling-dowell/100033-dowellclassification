import requests
import json
def dowellConnection(data):
    url = "http://100002.pythonanywhere.com/"
    command = data['command']
    field = data['field']
    update_field = data['update_field']
    payload = json.dumps({
        "cluster": "dowellfunctions",
        "database": "dowellfunctions",
        "collection": "classification",
        "document": "classification",
        "team_member_ID": "1196001",
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