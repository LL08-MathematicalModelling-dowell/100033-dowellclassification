# classification_input={
#         'classification_type':classification_type,
#         'total_length':total_length,
#         'selected_length':selected_length,
#         'final_selection':final_selection
#     }   
from test_database_1 import database
def classification(classification_input):
    filtered_data=[]
    data=database()
    classification_type=classification_input['classification_type']
    selection_basket=classification_input['final_selection']
    total_length=classification_input['total_length']
    selected_length=classification_input['selected_length']
    classified_data={
        'selection_dic':selection_basket,
        'classification_type':classification_type,
        'total_length':total_length,
        'selected_length':selected_length
        }
    final_keys=[]
    for i in selection_basket.keys():
        final_keys.append(i)

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
        for i in range(1,len(final_keys)):
            for j in filtered_data:
                if j[final_keys[i]] not in selection_basket[final_keys[i]]:
                    filtered_data.remove(j)                      
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
    
    return classified_data