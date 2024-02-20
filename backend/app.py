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
    existing_user = users.find_one({'username': req['username']})

    if existing_user is None:
        salt=bcrypt.gensalt()
        username= req['username']
        name= req['name']
        city= req['city']
        profession= req['profession']
        password=req['password']
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        data={'username': username, 'hashed_password': hashed_password,'name':name,'city':city,'profession':profession,'salt':salt}
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
    
    username = req.get('username')
    password = req.get('password')

    if not all([username, password]):
        return jsonify({'status': 'error', 'message': 'Missing username or password'}), 400

    users = mongo.db.users
    existing_user = users.find_one({'username': username})

    if not existing_user:
        return jsonify({'status': 'error', 'message': 'User does not exist'}), 404

    hashed_password = existing_user.get('hashed_password')

    if not bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return jsonify({'status': 'error', 'message': 'Incorrect password'}), 401

    # Passwords match, sign-in successful
    token = hashlib.sha256(f"{existing_user['_id']}{username}".encode('utf-8')).hexdigest()
    # Convert ObjectId to string for JSON serialization
    user_id = str(existing_user['_id'])
    resp_data = {
        'status': 'success',
        'message': 'Signin successful',
        'user': {
            '_id': user_id,
            'username': existing_user['username'],
            'city': existing_user['city'],
            'profession': existing_user['profession'],
            'name': existing_user['name']
        }
    }
    resp = make_response(jsonify(resp_data))
    resp.set_cookie('token', token)

    return resp, 200

#signout route    
@app.route('/api/user/signout', methods=['GET'])
def signout():

    resp = make_response(jsonify({'status': 'success', 'message': 'Signout successful'}))
    resp.delete_cookie('token')  # Delete the token cookie

    return resp



if __name__ == '__main__':
    app.run(debug=True)
