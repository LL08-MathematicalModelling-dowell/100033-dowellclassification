import pymongo

def filteration():
    final_keys=[]
    selection_basket={}
    probability={}
    client=pymongo.MongoClient("mongodb://localhost:27017")
    print(client.list_database_names())
    # select_database=input("Select Database : ")
    select_database='local_database'
    db=client[select_database]
    print(db.list_collection_names())
    # select_collection=input("Select Collection : ")
    select_collection='database'
    selected_collection=db[select_collection]
    def input_hierarchical_classification():
        # basket_order=['basket2','basket3','basket1','basket5','basket4']
        # basket_order=['basket2','basket3','basket1']
        # basket_order=['city','result','loan','education','name']
        basket_order=['city','result','loan'] 
        selected_keys=[]
        basket_index=len(basket_order)
        for x in basket_order:
            selected_items=[]
            print("Select Items from : ",x)
            for i in range(0,999):
                selected_item=input("Select Item or 'stop' to STOP selecting items : ")
                if(selected_item!='stop'):
                    selected_items.append(selected_item)
                elif(selected_item=='stop'):
                    break    
            selection_basket[x]=selected_items 
        temp_keys=[]
        for y in selection_basket.keys():
            temp_keys.append(y)
        for i in range(0,(len(temp_keys))):
            if(selection_basket[temp_keys[i]]==[]):
                del selection_basket[temp_keys[i]] 
            else:
                selected_keys.append(temp_keys[i])     
        for j in range(0,len(selected_keys)):
            print(selected_keys)
            user_order=input("Enter Basket for Position "+str(j+1)+": ")
            final_keys.append(user_order)
            selected_keys.remove(user_order)
        print("Default Order: ",basket_order)
        print("Order Selected by User: ",final_keys)
        print(selection_basket) 
        #Probability 
        PV1=1
        for i in selection_basket:
          PV1=PV1*len(selection_basket[i])
        probability['PV1']=PV1  
        print("PV1: ",PV1)  
        PV2=len(selection_basket[final_keys[0]])/PV1
        probability['PV2']=PV2
        print("PV2: ",PV2)
        list_nr=[]
        list_dr=[]
        common_nr=set(selection_basket[final_keys[0]])
        for i in range(1,len(final_keys)):
            print(i,common_nr)
            for j in (0,i):
                set_a=set(common_nr)
                set_b=set(selection_basket[final_keys[j]])
                common_nr=set_a & set_b
                print(common_nr)
            print(common_nr,len(common_nr))
            list_nr.append(len(common_nr))
        common_dr=set(selection_basket[final_keys[0]])
        for i in range(1,len(final_keys)):
            print(i,common_dr)
            for j in (0,i-1):
                set_a=set(common_dr)
                set_b=set(selection_basket[final_keys[j]])
                common_dr=set_a & set_b
                print(common_dr)
            print(common_dr,len(common_dr))  
            list_dr.append(len(common_dr))     
        for i in range(0,len(list_nr)):
            prob=list_nr[i]/list_dr[i]
            probability["PV"+str(i+3)]=prob
        print("Probability: ",probability)             
        return selection_basket,final_keys
    def tree_structure(final_keys,selection_basket):
        tree_structure_collection=db['tree_structure_collection']
        filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]}})
        for items in filtered_data:
            tree_structure_collection.insert_one(items)
        for i in range(1,len(final_keys)):
            _filtered_data=tree_structure_collection.find({str(final_keys[i]):{"$nin":selection_basket[final_keys[i]]}}) 
            for _items in _filtered_data:
                tree_structure_collection.delete_one(_items)        
    def hierarchical_classification(final_keys,selection_basket):
        hierarchical_collection=db['hierarchical_collection']
        if(len(final_keys)==1):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]}})
            for items in filtered_data:
                hierarchical_collection.insert_one(items)
        if(len(final_keys)==2):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]}})
            for items in filtered_data:
                hierarchical_collection.insert_one(items)
        if(len(final_keys)==3):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]}})
            for items in filtered_data:
                hierarchical_collection.insert_one(items)
        if(len(final_keys)==4):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]},str(final_keys[3]):{"$in":selection_basket[final_keys[3]]}})
            for items in filtered_data:
                hierarchical_collection.insert_one(items)
        if(len(final_keys)==5):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]},str(final_keys[3]):{"$in":selection_basket[final_keys[3]]},str(final_keys[4]):{"$in":selection_basket[final_keys[4]]}})
            for items in filtered_data:
                hierarchical_collection.insert_one(items)
    def non_hierarchical_classification():
        basket_list=[]
        list_basket=basket_list
        all_keys=selected_collection.find_one()
        for basket_names in all_keys:
            basket_list.append(basket_names)
        for i in range(0,(len(basket_list)-1)):
            print(list_basket)
            selected_basket=input("Select Basket or 'stop' to STOP Selecting Baskets : ")
            selected_items=[]
            if(selected_basket!='stop'):
                for j in range(0,999):
                    selected_item=input("Select Item or Type 'stop' : ")
                    if(selected_item!='stop'):
                        selected_items.append(selected_item)
                    elif(selected_item=='stop'):
                        break    
                selection_basket[selected_basket]=selected_items   
                list_basket.remove(selected_basket)     
            elif(selected_basket=='stop'):
                break
        for x in selection_basket.keys():
            final_keys.append(x)
        print(final_keys)
        print(selection_basket)
        PV1=1
        for i in selection_basket:
          PV1=PV1*len(selection_basket[i])
        probability['PV1']=PV1  
        print("PV1: ",PV1)  
        for i in range(0,len(final_keys)):
            prob=(len(selection_basket[final_keys[i]]))/PV1
            probability["PV"+str(i+2)]=prob
        print("Probability: ",probability)              
        non_hierarchical_collection=db['non_hierarchical_collection']
        if(len(final_keys)==1):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]}})
            for items in filtered_data:
                non_hierarchical_collection.insert_one(items)
        if(len(final_keys)==2):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]}})
            for items in filtered_data:
                non_hierarchical_collection.insert_one(items)
        if(len(final_keys)==3):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]}})
            for items in filtered_data:
                non_hierarchical_collection.insert_one(items)
        if(len(final_keys)==4):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]},str(final_keys[3]):{"$in":selection_basket[final_keys[3]]}})
            for items in filtered_data:
                non_hierarchical_collection.insert_one(items)
        if(len(final_keys)==5):
            filtered_data=selected_collection.find({str(final_keys[0]):{"$in":selection_basket[final_keys[0]]},str(final_keys[1]):{"$in":selection_basket[final_keys[1]]},str(final_keys[2]):{"$in":selection_basket[final_keys[2]]},str(final_keys[3]):{"$in":selection_basket[final_keys[3]]},str(final_keys[4]):{"$in":selection_basket[final_keys[4]]}})
            for items in filtered_data:
                non_hierarchical_collection.insert_one(items)
    classification_type=input("Type 'H' for Hierarchical or 'N' for Non Hierarchical or 'T' for Tree Structure: " )
    if(classification_type=='H'):
        input_hierarchical_classification()
        hierarchical_classification(final_keys,selection_basket)
    if(classification_type=='N'):
        non_hierarchical_classification()
    if(classification_type=='T'):
        input_hierarchical_classification()
        tree_structure(final_keys,selection_basket)
print(filteration())    
