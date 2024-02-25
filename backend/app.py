from flask import Flask, render_template, request, redirect, url_for, jsonify, make_response
from flask_pymongo import PyMongo
import bcrypt
import hashlib
from bson import ObjectId
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
            'name': existing_user['name'],
             'role':0
        }
    }
    resp = make_response(jsonify(resp_data))
    resp.set_cookie('token', token)

    return resp, 200

#signout route    
@app.route('/api/signout', methods=['GET'])
def signout():

    resp = make_response(jsonify({'status': 'success', 'message': 'Signout successful'}))
    resp.delete_cookie('token')  # Delete the token cookie

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
        'community_manager': {
            '_id': user_id,
            'email': existing_user['email'],
            'city': existing_user['city'],
            'name': existing_user['name'],
            'role':1
        }
    }
    resp = make_response(jsonify(resp_data))
    resp.set_cookie('token', token)

    return resp, 200

# #signout community-manager route    
# @app.route('/api/community_manager/signout', methods=['GET'])
# def community_manager_signout():

#     resp = make_response(jsonify({'status': 'success', 'message': 'Signout successful'}))
#     resp.delete_cookie('community-manager')  # Delete the token cookie

#     return resp
@app.route('/api/get/quests', methods=['POST'])
@cross_origin()
def get_quest():
    req = request.get_json()
    manager_id = req.get('manager_id')  # Use .get() to safely access the 'manager_id' key
    quests = mongo.db.quests.find({'manager_id': manager_id})
    
    # Convert ObjectId fields to strings
    quests_list = []
    for quest in quests:
        quest['_id'] = str(quest['_id'])  # Convert ObjectId to string
        quests_list.append(quest)


    quests_list.reverse()

    if not quests_list:
        return jsonify({'status': 'error', 'message': 'No quest found'}), 400

    response = {'status': 'success', 'quests': quests_list}
    return jsonify(response), 200


@app.route('/api/get-all/quests', methods=['GET'])
@cross_origin()
def get_all_quest():
    
    quests = mongo.db.quests.find({})
    
    # Convert ObjectId fields to strings
    quests_list = []
    for quest in quests:
        quest['_id'] = str(quest['_id'])  # Convert ObjectId to string
        quests_list.append(quest)


    quests_list.reverse()

    if not quests_list:
        return jsonify({'status': 'error', 'message': 'No quest found'}), 400

    response = {'status': 'success', 'quests': quests_list}
    return jsonify(response), 200



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

    quest.insert_one({'activity':activity,'leisure_activity':leisure_activity,'local_events':local_events,'start_date':start_date,'end_date':end_date,'location':location,'manager_id':manager_id})

    response ={'status':'success',"message":"Queest added succesfully"}
    
    return jsonify(response),200

@app.route('/api/get-manager-details', methods=['POST'])
@cross_origin()
def get_manager():
    req = request.get_json()
    manager_id = req.get('manager_id')

    if not ObjectId.is_valid(manager_id):
        return jsonify({'status': 'error', 'message': 'Invalid manager ID'}), 400

    manager = mongo.db.community_manager.find_one({'_id': ObjectId(manager_id)})

    if not manager:
        return jsonify({'status': 'error', 'message': 'Manager not found'}), 404

    email = manager['email']
    name = manager['name']
    city = manager['city']
    
    # Construct a dictionary with manager details
    manager_details = {
        'email': email,
        'name': name,
        'city': city
    }

    # Return the manager details in a JSON response
    return jsonify({'status': 'success', 'manager': manager_details}), 200

@app.route('/api/get-user-quests', methods=['POST'])
@cross_origin()
def user_quests():
    req = request.get_json()
    user_id = req.get('user_id')

    if not ObjectId.is_valid(user_id):
        return jsonify({'status': 'error', 'message': 'Invalid user ID'}), 400

    # Find user quests and convert the Cursor to a list of dictionaries
    user_quests_cursor = mongo.db.book_quest.find({'user_id': user_id})
    user_quests = list(user_quests_cursor)
    
    if not user_quests:
        return jsonify({'status': 'error', 'message': 'Quests not found'}), 404

    # Convert ObjectId to string for JSON serialization
    for quest in user_quests:
        quest['_id'] = str(quest['_id'])

    # Return the user quests in a JSON response
    return jsonify({'status': 'success', 'user_quests': user_quests}), 200

@app.route('/api/get-manager-quests', methods=['POST'])
@cross_origin()
def manager_quests():
    req = request.get_json()
    manager_id = req.get('manager_id')

    if not ObjectId.is_valid(manager_id):
        return jsonify({'status': 'error', 'message': 'Invalid user ID'}), 400

    # Find user quests and convert the Cursor to a list of dictionaries
    manager_quests_cursor = mongo.db.book_quest.find({'manager_id': manager_id})
    manager_quests = list(manager_quests_cursor)
    
    if not manager_quests:
        return jsonify({'status': 'error', 'message': 'Quests not found'}), 404

    # Convert ObjectId to string for JSON serialization
    for quest in manager_quests:
        quest['_id'] = str(quest['_id'])

    # Return the user quests in a JSON response
    return jsonify({'status': 'success', 'manager_quests':manager_quests}), 200


@app.route('/api/update-quest-status', methods=['POST'])
@cross_origin()
def quest_status():
    req = request.get_json()
    _id = req.get('_id')
    status = req.get('status')

    if not ObjectId.is_valid(_id):
        return jsonify({'status': 'error', 'message': 'Invalid quest ID'}), 400

    # Update the quest status in the database
    result = mongo.db.book_quest.find_one_and_update(
        {'_id': ObjectId(_id)},
        {'$set': {'status': status}},
        return_document=True  # Return the updated document
    )

    if not result:
        return jsonify({'status': 'error', 'message': 'Quest not found'}), 404

    # Return the updated quest details
    return jsonify({'status': 'success', 'message':'Successfully updates status' }), 200



@app.route('/api/book-quest', methods=['POST'])
@cross_origin()
def book_quest():
    req = request.get_json()
    manager_id = req.get('manager_id')
    quest_id = req.get('quest_id')
    user_id = req.get('user_id')
    quest_data = req.get('quest_data')

    if mongo.db.book_quest.find_one({'quest_id':quest_id,'user_id':user_id,'manager_id':manager_id}):
        return jsonify({'status': 'error', 'message': 'Already Pending Request'}), 400

    mongo.db.book_quest.insert_one({'manager_id':manager_id,'quest_id':quest_id,'user_id':user_id,'status':'Pending','quest_data':quest_data})    
    # Return the manager details in a JSON response
    return jsonify({'status': 'success', 'message': 'Done Sending Request'}), 200


if __name__ == '__main__':
    app.run(debug=True)
