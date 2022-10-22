
# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
import json
from flask import Flask,request
from languageConverter import HandleQuery
from flask_cors import CORS
from model_implementation import predict
 
# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
CORS(app)
 
# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route('/vc',methods=['GET','POST'])
# ‘/’ URL is bound with hello_world() function.
def vc():
    if request.method=='POST':
        body=request.json
        result=HandleQuery(body)
        if result:
            return json.dumps({"result":result}),200,{'ContentType':'application/json'}
        else:
            return json.dumps({"result":False}),403,{'ContentType':'application/json'}

@app.route('/accident',methods=['GET','POST'])
def accident():
    if request.method=='POST':
        body=request.json
        if body['airbags']:
            return json.dumps({"message":"authorities have been alerted about the accident"}),200,{"ContentType":"application/json"}
        else:
            return json.dumps({"message":"no major accident occured"}),403,{"ContentType":"application/json"}

@app.route('/reportVitals',methods=['GET','POST'])
def reportVitals():
    if request.method=='POST':
        body=request.json
        score=predict(body['vals'])
        return json.dumps({"score":score[0]}),200,{"ContentType":"application/json"}
 
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()