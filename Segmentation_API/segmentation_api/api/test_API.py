import json

import requests

url = 'http://127.0.0.1:8000/api/'

input_data = {
    "selected_city": "city1",
    "selected_level": 1,
    "segmentation_input": {
        '1': {"region": "region1"},
        '2': {"income": "income43"},
        }
}
headers = {'content-type': 'application/json'}

response = requests.post(url, json = input_data,headers=headers)

output_data=json.loads(response.text)

print(output_data)