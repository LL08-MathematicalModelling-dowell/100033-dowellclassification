import pymongo

def filteration():
    selected_keys=[]
    selection_basket={}
    client=pymongo.MongoClient("mongodb://localhost:27017")
    print(client.list_database_names())
    select_database=input("Select Database : ")
#     select_database='local_database'
    db=client[select_database]
    print(db.list_collection_names())
    select_collection=input("Select Collection : ")
#     select_collection='database'
    selected_collection=db[select_collection]
    def input_hierarchical_classification():
        # basket_order=['city','result','loan','education','name']
        basket_order=['city','result','loan']
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
        print(selection_basket)   
        print(temp_keys)
        print(selected_keys) 
        return selection_basket,selected_keys
    def tree_structure():
        input_hierarchical_classification()
        tree_structure_collection=db['tree_structure_collection']
        filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]}})
        for items in filtered_data:
            tree_structure_collection.insert_one(items)
            # print(items)
        for i in range(1,len(selected_keys)):
            print(i)
            _filtered_data=tree_structure_collection.find({str(selected_keys[i]):{"$nin":selection_basket[selected_keys[i]]}}) 
            for _items in _filtered_data:
                tree_structure_collection.delete_one(_items)        
                print(_items)
    def hierarchical_classification():
        input_hierarchical_classification()
        hierarchical_collection=db['hierarchical_collection']
        if(len(selected_keys)==1):
            filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]}})
            for items in filtered_data:
                hierarchical_collection.insert_one(items)
                print(items)
        if(len(selected_keys)==2):
            filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]},str(selected_keys[1]):{"$in":selection_basket[selected_keys[1]]}})
            for items in filtered_data:
                hierarchical_collection.insert_one(items)
                print(items)
        if(len(selected_keys)==3):
            filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]},str(selected_keys[1]):{"$in":selection_basket[selected_keys[1]]},str(selected_keys[2]):{"$in":selection_basket[selected_keys[2]]}})
            for items in filtered_data:
                hierarchical_collection.insert_one(items)
                print(items)
        if(len(selected_keys)==4):
            filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]},str(selected_keys[1]):{"$in":selection_basket[selected_keys[1]]},str(selected_keys[2]):{"$in":selection_basket[selected_keys[2]]},str(selected_keys[3]):{"$in":selection_basket[selected_keys[3]]}})
            for items in filtered_data:
                hierarchical_collection.insert_one(items)
                print(items)
        if(len(selected_keys)==5):
            filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]},str(selected_keys[1]):{"$in":selection_basket[selected_keys[1]]},str(selected_keys[2]):{"$in":selection_basket[selected_keys[2]]},str(selected_keys[3]):{"$in":selection_basket[selected_keys[3]]},str(selected_keys[4]):{"$in":selection_basket[selected_keys[4]]}})
            for items in filtered_data:
                hierarchical_collection.insert_one(items)
                print(items)                
    def non_hierarchical_classification():
        selected_keys=[]
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
            selected_keys.append(x)
        print(selected_keys)
        print(selection_basket)
        non_hierarchical_collection=db['non_hierarchical_collection']
        if(len(selected_keys)==1):
            filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]}})
            for items in filtered_data:
                non_hierarchical_collection.insert_one(items)
                print(items)
        if(len(selected_keys)==2):
            filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]},str(selected_keys[1]):{"$in":selection_basket[selected_keys[1]]}})
            for items in filtered_data:
                non_hierarchical_collection.insert_one(items)
                print(items)
        if(len(selected_keys)==3):
            filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]},str(selected_keys[1]):{"$in":selection_basket[selected_keys[1]]},str(selected_keys[2]):{"$in":selection_basket[selected_keys[2]]}})
            for items in filtered_data:
                non_hierarchical_collection.insert_one(items)
                print(items)
        if(len(selected_keys)==4):
            filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]},str(selected_keys[1]):{"$in":selection_basket[selected_keys[1]]},str(selected_keys[2]):{"$in":selection_basket[selected_keys[2]]},str(selected_keys[3]):{"$in":selection_basket[selected_keys[3]]}})
            for items in filtered_data:
                non_hierarchical_collection.insert_one(items)
                print(items)
        if(len(selected_keys)==5):
            filtered_data=selected_collection.find({str(selected_keys[0]):{"$in":selection_basket[selected_keys[0]]},str(selected_keys[1]):{"$in":selection_basket[selected_keys[1]]},str(selected_keys[2]):{"$in":selection_basket[selected_keys[2]]},str(selected_keys[3]):{"$in":selection_basket[selected_keys[3]]},str(selected_keys[4]):{"$in":selection_basket[selected_keys[4]]}})
            for items in filtered_data:
                non_hierarchical_collection.insert_one(items)
                print(items)                
    classification_type=input("Type 'H' for Hierarchical or 'N' for Non Hierarchical or 'T' for Tree Structure: " )
    if(classification_type=='H'):
        hierarchical_classification()
    if(classification_type=='N'):
        non_hierarchical_classification()
    if(classification_type=='T'):
        tree_structure()


print(filteration())    
