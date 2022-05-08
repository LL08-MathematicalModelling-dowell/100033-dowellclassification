from flask import Flask ,jsonify
app = Flask(__name__)



# Input Type
# classification_input={ 
#   'database':'local_database',
#   'collection':'database',
#   'type':'H',
#   'final_order':['city','education','result','loan'],
#   'final_selection':{'city':['agra','delhi','mumbai','chennai'],'education':['10','12','phd'],'result':['pass','fail'],'loan':['yes','no']},
#   'permutations':'NA'
# } 

# @app.route('/classification/<string:_input>')
# def classification(_input):
@app.route('/classification/')
def classification():

    classification_input={ 
  'database':'local_database',
  'collection':'database',
  'type':'T',
  'final_order':['city','education','result','loan'],
  'final_selection':{'city':['agra','delhi','mumbai','chennai'],'education':['10','12','phd'],'result':['pass','fail'],'loan':['yes','no']},
  'permutations':'NA'
}   
    import pymongo,json
    from bson import json_util, ObjectId
    client=pymongo.MongoClient("mongodb://localhost:27017")    
    db=client[classification_input['database']]
    selected_collection=db[classification_input['collection']]
    classfied_data={}
    selection_basket=classification_input['final_selection']  
    final_keys=classification_input['final_order']
    classification_type=classification_input['type']

    if(classification_type=='H'):
        hierarchical_collection=db['hierarchical_collection']
        hierarchical_output=[]
        if(len(final_keys)==1):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]}})
            for items in filtered_data:
                # hierarchical_collection.insert_one(items)
                hierarchical_output.append(items)
        if(len(final_keys)==2):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]}})
            for items in filtered_data:
                # hierarchical_collection.insert_one(items)
                hierarchical_output.append(items)
        if(len(final_keys)==3):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]}})
            for items in filtered_data:
                # hierarchical_collection.insert_one(items)
                hierarchical_output.append(items)
        if(len(final_keys)==4):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]},str(final_keys[3]):{"$in":selection_basket[final_keys[3]]}})
            for items in filtered_data:
                # hierarchical_collection.insert_one(items)
                hierarchical_output.append(items)
        if(len(final_keys)==5):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]},str(final_keys[3]):{"$in":selection_basket[final_keys[3]]},str(final_keys[4]):{"$in":selection_basket[final_keys[4]]}})
            for items in filtered_data:
                # hierarchical_collection.insert_one(items)
                hierarchical_output.append(items)
        classfied_data['classified_data']=hierarchical_output        
        hie_probability=1
        for i in final_keys:
            hie_probability=hie_probability*(len(selection_basket[i])/1000)   
        float_hie_probability= "%.15f" %hie_probability          
        classfied_data['probability']=float_hie_probability

    if(classification_type=='N'):
        non_hierarchical_collection=db['non_hierarchical_collection']
        non_hierarchical_output=[]
        if(len(final_keys)==1):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]}})
            for items in filtered_data:
                # non_hierarchical_collection.insert_one(items)
                non_hierarchical_output.append(items)
        if(len(final_keys)==2):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]}})
            for items in filtered_data:
                # non_hierarchical_collection.insert_one(items)
                non_hierarchical_output.append(items)
        if(len(final_keys)==3):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]}})
            for items in filtered_data:
                # non_hierarchical_collection.insert_one(items)
                non_hierarchical_output.append(items)
        if(len(final_keys)==4):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]},str(final_keys[3]):{"$in":selection_basket[final_keys[3]]}})
            for items in filtered_data:
                # non_hierarchical_collection.insert_one(items)
                non_hierarchical_output.append(items)
        if(len(final_keys)==5):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]},str(final_keys[3]):{"$in":selection_basket[final_keys[3]]},str(final_keys[4]):{"$in":selection_basket[final_keys[4]]}})
            for items in filtered_data:
                # non_hierarchical_collection.insert_one(items)
                non_hierarchical_output.append(items)
        classfied_data["classified_data"]=non_hierarchical_output        
        non_hie_probability=0
        for i in final_keys:
            non_hie_probability=non_hie_probability+(len(selection_basket[i])/1000)    
        classfied_data['probability']=non_hie_probability   

    if(classification_type=='T'):
        tree_structure_collection=db['tree_structure_collection']
        tree_structure_output=[]
        filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]}})
        for items in filtered_data:
            # tree_structure_collection.insert_one(items)
            tree_structure_output.append(items)
        for i in range(1,len(final_keys)):
            # _filtered_data=tree_structure_collection.find({str(final_keys[i]):{"$nin":selection_basket[final_keys[i]]}}) 
            _filtered_data=selected_collection.find({str(final_keys[i]):{"$nin":selection_basket[final_keys[i]]}}) 
            for _items in _filtered_data:
                tree_structure_output.remove(_items)
                # tree_structure_collection.delete_one(_items) 
        classfied_data['classified_data']=tree_structure_output    
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
            classfied_data['probability']=tree_structure_probability  
    return json.loads(json_util.dumps(classfied_data))

    
if __name__ == "__main__":
    app.run(debug=True)   