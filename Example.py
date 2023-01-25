import requests
import json

def callClassification():
    headers = {'content-type': 'application/json'}
    typeOfUser = int(input("Choose\n'1' if you are frontend programmer\n'2' if you are a user\n"))
    if(typeOfUser == 1):
        pass
    elif(typeOfUser == 2):
        numberOfLevels = int(input("Enter the number of levels you want from 1 to 5: "))
        classificationType = input("Choose the type of classification you want to use?\n'H':Hierarchical\n'N':Non-Hierarchical\n'T':Tree-Structure\n")
        if(classificationType == 'N'):
            url = 'http://127.0.0.1:8000/type/'
            data = {
                "numberOfLevels": numberOfLevels, 
                "classificationType": classificationType,
                "dbInsertedId":"63d00950dcc2a171957b4a64"
            }
            response = requests.post(url, json =data,headers=headers).json()
            print()
        elif(classificationType == 'T' or classificationType == 'H'):
            pass
        else:
            print(f"{classificationType} is not a valid classification type")
    else:
        print (f"{typeOfUser} is not a valid user type")
    return 0

if __name__ == "__main__":
    callClassification()