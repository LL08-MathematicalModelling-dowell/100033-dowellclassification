import pymongo
client=pymongo.MongoClient("mongodb://localhost:27017")
db=client['local_database']
collection=db['test_database']
baskets=[]
# baskets=['name','education','city','result','loan']
# number_of_baskets=int(input("Enter Number of Levels: "))
# if(number_of_baskets<6):
#     for i in range(0,number_of_baskets):
#         basket_name=input("Enter Basket Name: ")
#         baskets.append(basket_name)
#     print(baskets)
# else:
#     print("Number of Levels Cannot Exceed the Limit")    
# def entering_data():
#     query={}
#     for i in baskets:
#         data=input("Enter "+str(i)+" : ")
#         query[i]=data
#     collection.insert_one(query)    
#     print(query)    

# choice=int(input("How many Documents Do You Want to Enter? "))
# for j in range(0,choice):
#     entering_data()



# query=[{'name':'a','education':'12','city':'agra','result':'pass','loan':'yes'},
# {'name':'b','education':'10','city':'delhi','result':'fail','loan':'yes'},
# {'name':'c','education':'graduate','city':'delhi','result':'pass','loan':'no'},
# {'name':'d','education':'graduate','city':'mumbai','result':'pass','loan':'yes'},
# {'name':'e','education':'10','city':'agra','result':'pass','loan':'no'},
# {'name':'f','education':'12','city':'delhi','result':'pass','loan':'yes'},
# {'name':'g','education':'phd','city':'kolkata','result':'fail','loan':'no'},
# {'name':'h','education':'phd','city':'delhi','result':'pass','loan':'yes'},
# {'name':'i','education':'12','city':'chennai','result':'fail','loan':'yes'},
# {'name':'j','education':'10','city':'chennai','result':'pass','loan':'yes'},
# {'name':'j','education':'phd','city':'agra','result':'pass','loan':'no'},
# ]
# collection.insert_many(query)


for i in range (1,1001):
#     print("B1"+"%.4d" % i )
    query={'_id':i,'basket1':("B1"+"%.4d" % i),'basket2':("B2"+"%.4d" % i),'basket3':("B3"+"%.4d" % i),'basket4':("B4"+"%.4d" % i),'basket5':("B5"+"%.4d" % i)}
    collection.insert_one(query)    
    print(query)    
