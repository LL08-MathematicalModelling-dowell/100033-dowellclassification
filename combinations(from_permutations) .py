# -*- coding: utf-8 -*-
"""
Created on Tue Apr  5 18:04:30 2022

@author: Bradle
"""
# =============================================================================
# 
# #replacing a,b,c with strings
# list1=[["A", "B","C"],["B","C","A"],["C","B","A"]]
# 
# A="Apple"
# B="Banana"
# C="Mango"
# 
# for i in list1:
#     for j,k in enumerate(i):
#         if k=="A":
#             i[j]=A
#         if k=="B":
#             i[j]=B
#         if k=="C":
#             i[j]=C
# 
# print(list1)
# =============================================================================

#--------------------------------------
#--------------------------------------
def unique(list1):
    unique_list = []
    for x in list1:
        if x not in unique_list:
            unique_list.append(x)
    return unique_list

def extractDigits(lst):
    res = []
    for el in lst:
        sub = el.split(', ')
        res.append(sub)
    return(res)

#--------------------------------------
#--------------------------------------

y1=[]
for i in range(1,6):
    b="B1"+str(i).zfill(3)
    y1.append(b)

y2=[]
for i in range(1,6):
    b="B2"+str(i).zfill(3)
    y2.append(b)

y3=[]
for i in range(1,6):
    b="B3"+str(i).zfill(3)
    y3.append(b)

y4=[]
for i in range(1,6):
    b="B4"+str(i).zfill(3)
    y4.append(b)

y5=[]
for i in range(1,6):
    b="B5"+str(i).zfill(3)
    y5.append(b)


basket1=extractDigits(y1)
basket2=extractDigits(y2)
basket3=extractDigits(y3)
basket4=extractDigits(y4)
basket5=extractDigits(y5)

y1.clear()
y2.clear()
y3.clear()
y4.clear()
y5.clear()
# =============================================================================
#
# =============================================================================

def insert(var,string,i):
    output = string[:i] + var + string[i:]
    return output

def split(word):
    return [char for char in word]

                    

doc=[]
doc.append("")
doc1=[i for i in doc]
doc2=[split(i) for i in doc1]

doc3=[]
    
for i in basket1:    
    for j in doc2:
        for k in range(0,len(j)+1):
            x=insert(i,j,k)
            doc3.append(x)
#print(doc3)
doc2.clear()            
doc4=[]        
for i in basket2:
    for j in doc3:
        for k in range(0,len(j)+1):
            x=insert(i,j,k)
            doc4.append(x)
#print(doc4)
doc3.clear()
doc5=[]
for i in basket3:
    for j in doc4:
        for k in range(0,len(j)+1):
            x=insert(i,j,k)
            doc5.append(x)
doc4.clear()
doc6=[]
for i in basket4:
    for j in doc5:
        for k in range(0,len(j)+1):
            x=insert(i,j,k)
            doc6.append(x)
doc5.clear()
doc7=[]
for i in basket5:
    for j in doc6:
        for k in range(0,len(j)+1):
            x=insert(i,j,k)
            doc7.append(x)
doc6.clear()
print(doc7)
print(len(doc7))

       
x=[]
for i in doc7:
    r=sorted(i)
    x.append(r)
e=unique(x)

print(e)
print(len(e))


