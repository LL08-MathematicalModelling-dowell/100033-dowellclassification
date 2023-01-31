import requests
import json

def callClassification():
    headers = {'content-type': 'application/json'}
    data = {}
    url = ''
    response = requests.post(url, json =data,headers=headers)
    return

if __name__ == "main":
    print(callClassification()) 