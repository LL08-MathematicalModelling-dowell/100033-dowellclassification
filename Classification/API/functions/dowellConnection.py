import requests
import json
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