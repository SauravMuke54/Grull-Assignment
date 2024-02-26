﻿# Grull-Assignment
<h1>Steps to run:</h1>
<br>
<h3>Frontend</h3><br>
>> cd frontend <br>
>> npm start <br>
<br>
<h3>Backend</h3><br>
>> cd backend <br>
>> flask run <br>
<br>

<h1>Database Schemas</h1>
<br>
<h6>book_quest</h6>
<br>
{
  "_id": {
    "$oid": ""
  },
  "manager_id": "",
  "quest_id": "",
  "user_id": "",
  "status": "",
  "quest_data": {
    "_id": "",
    "activity": {
      "activityDescription": "",
      "activityName": "",
      "url": ""
    },
    "end_date": "",
    "leisure_activity": {
      "outdoorDescription": "",
      "outdoorName": "",
      "url": ""
    },
    "local_events": {
      "eventDescritption": "",
      "eventName": ""
    },
    "location": "",
    "manager_id": "",
    "start_date": ""
  }
}

<br>
<h6>community_manager</h6>
<br>
{
  "_id": {
    "$oid": ""
  },
  "email": "",
  "hashed_password": {
    "$binary": {
      "base64": "",
      "subType": "00"
    }
  },
  "name": "",
  "city": "",
  "salt": {
    "$binary": {
      "base64": "",
      "subType": "00"
    }
  }
}

<br>
<h6>quests</h6>
<br>
{
  "_id": {
    "$oid": ""
  },
  "activity": {
    "activityName": "",
    "activityDescription": "",
    "url1": ""
  },
  "leisure_activity": {
    "outdoorName": "",
    "outdoorDescription": "",
    "url2": ""
  },
  "local_events": {
    "eventName": "",
    "eventDescritption": ""
  },
  "start_date": "",
  "end_date": "",
  "location": ""
}

<br>
<h6>users</h6>
<br>
{
  "_id": {
    "$oid": ""
  },
  "username": "",
  "hashed_password": {
    "$binary": {
      "base64": "",
      "subType": "00"
    }
  },
  "name": "",
  "city": "",
  "profession": "",
  "salt": {
    "$binary": {
      "base64": "",
      "subType": "00"
    }
  }
}




<br>
<h1>Screeshots</h1>
<br>
# 1. Home Screen
<br>
<img src="https://github.com/SauravMuke54/Grull-Assignment/assets/98262822/0644b62e-059d-477e-a40f-77f1356075de">
<br>
# 2. Login Screen
<br>
<img src="https://github.com/SauravMuke54/Grull-Assignment/assets/98262822/dce10783-dd54-40d8-87e2-8cab7bda6905">
<br>
# 3. Create Quest (Community Manager)
<br>
<img src="https://github.com/SauravMuke54/Grull-Assignment/assets/98262822/36f816cc-ba06-40e2-8ab1-2c3478554840">
<br>
# 4. My Quests (Community Manager)
<br>
<img src="https://github.com/SauravMuke54/Grull-Assignment/assets/98262822/142ab123-6157-498e-8c43-4ea31582f645">
<br>
# 5. Quest Request (Community Manager)
<br>
<img src="https://github.com/SauravMuke54/Grull-Assignment/assets/98262822/e8a1f92a-baca-4f98-a511-6e691794107b">
<br>
# 6. All Quests (User)
<br>
<img src="https://github.com/SauravMuke54/Grull-Assignment/assets/98262822/3a6752e4-335c-418f-9477-d69f09da4759">
<br>
# 7. Applied Quests (User)
<br>
<img src="https://github.com/SauravMuke54/Grull-Assignment/assets/98262822/d72c278d-99fd-4737-9979-e948c32f4bb4">
<br>
# 8. View Quest Details (User)
<br>
<img src="https://github.com/SauravMuke54/Grull-Assignment/assets/98262822/df6de133-512e-4f2b-831c-2b88920410c4">
<br>
