from flask import Flask, render_template, request, redirect, url_for, jsonify, make_response
from flask_pymongo import PyMongo
import bcrypt
import hashlib
from flask_cors import CORS,cross_origin

app = Flask(__name__)
CORS(app)
# Configure MongoDB connection
app.config['MONGO_URI'] = 'mongodb+srv://sam:sam@workout.gwijt.mongodb.net/grull'
mongo = PyMongo(app)

@app.route('/')
def index():
    return str("hi this is index page")

#signup user route
@app.route('/api/user/signup', methods=['POST'])
@cross_origin()
def signup():
    
    req=request.get_json()
    print(req)
    users = mongo.db.users
    existing_user = users.find_one({'email': req['email']})

    if existing_user is None:
        salt=bcrypt.gensalt()
        email= req['email']
        name= req['name']
        city= req['city']
        profession= req['profession']
        password=req['password']
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        data={'email': email, 'hashed_password': hashed_password,'name':name,'city':city,'profession':profession,'salt':salt}
        users.insert_one(data)
        response ={'status':'success',"message":"Signup Successfull"}
        return jsonify(response),200
    else:
        response ={'status':'error',"message":"User already exists"}
        return jsonify(response),400

    return jsonify(response)


#signin user routes
@app.route('/api/user/signin', methods=['POST'])
@cross_origin()
def signin():
    req = request.get_json()
    
    if not req:
        return jsonify({'status': 'error', 'message': 'No JSON data received'}), 400
    
    email = req.get('email')
    password = req.get('password')

    if not all([email, password]):
        return jsonify({'status': 'error', 'message': 'Missing email or password'}), 400

    users = mongo.db.users
    existing_user = users.find_one({'email': email})

    if not existing_user:
        return jsonify({'status': 'error', 'message': 'User does not exist'}), 404

    hashed_password = existing_user.get('hashed_password')

    if not bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return jsonify({'status': 'error', 'message': 'Incorrect password'}), 401

    # Passwords match, sign-in successful
    token = hashlib.sha256(f"{existing_user['_id']}{email}".encode('utf-8')).hexdigest()
    # Convert ObjectId to string for JSON serialization
    user_id = str(existing_user['_id'])
    resp_data = {
        'status': 'success',
        'message': 'Signin successful',
        'user': {
            '_id': user_id,
            'email': existing_user['email'],
            'city': existing_user['city'],
            'profession': existing_user['profession'],
            'name': existing_user['name']
        }
    }
    resp = make_response(jsonify(resp_data))
    resp.set_cookie('user', token)

    return resp, 200

#signout route    
@app.route('/api/user/signout', methods=['GET'])
def signout():

    resp = make_response(jsonify({'status': 'success', 'message': 'Signout successful'}))
    resp.delete_cookie('user')  # Delete the token cookie

    return resp

#signup community-manager route
@app.route('/api/community-manager/signup', methods=['POST'])
@cross_origin()
def community_manager_signup():
    
    req=request.get_json()
    print(req)
    users = mongo.db.community_manager
    existing_user = users.find_one({'email': req['email']})

    if existing_user is None:
        salt=bcrypt.gensalt()
        email= req['email']
        name= req['name']
        city= req['city']
        password=req['password']
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        data={'email': email, 'hashed_password': hashed_password,'name':name,'city':city,'salt':salt}
        users.insert_one(data)
        response ={'status':'success',"message":"Signup Successfull"}
        return jsonify(response),200
    else:
        response ={'status':'error',"message":"User already exists"}
        return jsonify(response),400

    return jsonify(response)

#signin community-manager routes
@app.route('/api/community-manager/signin', methods=['POST'])
@cross_origin()
def community_manager_signin():
    req = request.get_json()
    
    if not req:
        return jsonify({'status': 'error', 'message': 'No JSON data received'}), 400
    
    email = req.get('email')
    password = req.get('password')

    if not all([email, password]):
        return jsonify({'status': 'error', 'message': 'Missing email or password'}), 400

    users = mongo.db.community_manager
    existing_user = users.find_one({'email': email})
    

    if not existing_user:
        return jsonify({'status': 'error', 'message': 'User does not exist'}), 404

    hashed_password = existing_user.get('hashed_password')

    if not bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return jsonify({'status': 'error', 'message': 'Incorrect password'}), 401

    # Passwords match, sign-in successful
    token = hashlib.sha256(f"{existing_user['_id']}{email}".encode('utf-8')).hexdigest()
    # Convert ObjectId to string for JSON serialization
    user_id = str(existing_user['_id'])
    resp_data = {
        'status': 'success',
        'message': 'Signin successful',
        'comminty_manager': {
            '_id': user_id,
            'email': existing_user['email'],
            'city': existing_user['city'],
            'name': existing_user['name']
        }
    }
    resp = make_response(jsonify(resp_data))
    resp.set_cookie('community-manager', token)

    return resp, 200

#signout community-manager route    
@app.route('/api/community_manager/signout', methods=['GET'])
def community_manager_signout():

    resp = make_response(jsonify({'status': 'success', 'message': 'Signout successful'}))
    resp.delete_cookie('community-manager')  # Delete the token cookie

    return resp


#create quest
@app.route('/api/create/quest', methods=['POST'])
@cross_origin()
def create_quest():
    
    req=request.get_json()
   
    quest = mongo.db.quests

    activity=req['activity']
    leisure_activity= req['leisure_activity']
    local_events=req['local_events']
    start_date=req['start_date']
    end_date=req['end_date']
    location=req['location']
    manager_id=req['manager_id']

    if not all([activity, leisure_activity,local_events,start_date,end_date,location,manager_id]):
        return jsonify({'status': 'error', 'message': 'Missing some data'}), 400

    quest.insert_one({'activity':activity,'leisure_activity':leisure_activity,'local_events':local_events,'start_date':start_date,'end_date':end_date,'location':location})

    response ={'status':'success',"message":"Queest added succesfully"}
    
    return jsonify(response),200


if __name__ == '__main__':
    app.run(debug=True)
