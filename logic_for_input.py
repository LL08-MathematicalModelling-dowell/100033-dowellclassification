import pymongo
client=pymongo.MongoClient("mongodb://localhost:27017")
db=client['local_database']
collection=db['test_database']
baskets=[]
baskets=['name','education','city','result','loan']
number_of_baskets=int(input("Enter Number of Levels: "))
if(number_of_baskets<6):
    for i in range(0,number_of_baskets):
        basket_name=input("Enter Basket Name: ")
        baskets.append(basket_name)
    print(baskets)
else:
    print("Number of Levels Cannot Exceed the Limit")    
def entering_data():
    query={}
    for i in baskets:
        data=input("Enter "+str(i)+" : ")
        query[i]=data
    collection.insert_one(query)    
    print(query)    

choice=int(input("How many Documents Do You Want to Enter? "))
for j in range(0,choice):
    entering_data()
