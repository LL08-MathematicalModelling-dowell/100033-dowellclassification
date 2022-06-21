from flask import *
import requests
import os
from test_database_1 import database
from classification_function import classification


#This function is for converting the data into the usable type for the classification function 

def database_data():
    data=database()
    final_data={}
    for i in data[0].keys():
        final_data[i]=[]
        for j in data:
            if j[i] not in final_data[i]:
                final_data[i].append(j[i])      
    return final_data


app = Flask(__name__)
@app.route('/')
def home():
    return render_template('home.html')

#This Route is for selecting the type of user i.e. Admin or Normal_User
@app.route('/user_type',methods = ['GET','POST'])
def user_type():
    user_type=request.form['type']
    if(user_type=='user'):
        return render_template('levels.html')
    elif(user_type=='admin'):
        return render_template('authentication.html')    

@app.route('/authentication',methods = ['GET','POST'])
def authentication():
    name=request.form['name']
    password=request.form['password']
    if name=='ritik' and password=='123':
        return render_template("admin.html")
    else:
        return ("Credentials are Incorrect")

#This Route is for selecting the type of classification and number of levels
@app.route('/levels',methods=['GET','POST'])
def levels_type():  
    final_data=database_data() 
    level=int(request.form['level']) 
    classification_type=request.form['type']
    session['levels']=level
    session['classification_type']=classification_type
    total_length={}
    for i in final_data.keys():
        total_length[i]=len(final_data[i])
    session['total_length']=total_length
    if(level>0 and level<6):
        if(classification_type=='N'):
            keys=[]
            for i in final_data.keys():
                keys.append(i)         
            return render_template('non_hierarchial_order.html',level=level,keys=keys)
        elif(classification_type=='H' or 'T'):
            keys=['basket1','basket4','basket3','basket2','basket5']
            session['keys']=keys
            return render_template('hierarchial.html',level=level,keys=keys,data=final_data)
    else:
        return ("Number of Levels Cannot Exceed Maximum Limit")

@app.route('/non_hierarchial_order',methods=['GET','POST'])
def non_hierarchial_order():
    keys=request.form.getlist('order')
    session['keys']=keys
    final_data=database_data()
    level=session.get('levels',None)
    return render_template('hierarchial.html',level=level,keys=keys,data=final_data)

@app.route('/final_selection',methods=['GET','POST'])
def final_selection():
    levels=session.get('levels',None)
    keys=session.get('keys',None)
    classification_type=session.get('classification_type',None)
    total_length=session.get('total_length',None)
    final_selection={}
    for i in range(0,levels):
        key=keys[i]
        selected_items=request.form.getlist(key)
        if selected_items!=[]:
            final_selection[key]=selected_items   
    selected_length={}    
    for i in final_selection.keys():
        selected_length[i]=len(final_selection[i])
    
    classification_input={
        'classification_type':classification_type,
        'total_length':total_length,
        'selected_length':selected_length,
        'final_selection':final_selection
    }
    # return jsonify(classification_input)         
    return classification(classification_input)

if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.debug = True
    app.run()