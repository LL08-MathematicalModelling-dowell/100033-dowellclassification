# classification_input={
#         'classification_type':classification_type,
#         'total_length':total_length,
#         'selected_length':selected_length,
#         'final_selection':final_selection
#     }   
from test_database_1 import database
def classification(classification_input):
    def get_event_id():
        from datetime import datetime
        import requests
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
    def dowell_connection(field):
        import json
        import requests
        url = "http://100002.pythonanywhere.com/" 
        payload = {
        "cluster": "license",
        "database": "license",
        "collection": "licenses",
        "document": "licenses",
        "team_member_ID": "689044433",
        "function_ID": "ABCDE",
        "command":"insert",
        "field":field,
        "update_field": {
            "order_nos": 21
        },
        "platform": "bangalore"
        }
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.post( url, headers=headers, json=payload)
  
            
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
        'selection_dic':selection_basket,
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

    if(classification_type=='N'):
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

    if(classification_type=='T'):
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
