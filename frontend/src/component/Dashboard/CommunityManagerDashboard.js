import React,{useEffect, useState} from 'react'
import CreateQuest from '../CreateQuest/CreateQuest'
import MyQuests from '../MyQuests/MyQuests'
import CommunityManagerProfile from '../CommunityManagerProfile/CommunityManagerProfile'
import { isAuthenticated } from '../../helper'

export default function CommunityManagerDashboard() {
   const [flag,setFlag]=useState(0)
   console.log(isAuthenticated())

   const renderComponent=()=>{

    if(flag===0){
        return <CreateQuest/>
    }else if(flag===1){
        return <MyQuests/>
    }else{
        return <CommunityManagerProfile/>
    }

   }
  return (
    <div className='container'>
<center className='mt-5 ' style={{font:'initial'}}><h1>Community Manager Dashboard</h1></center>
<div className="row border border-dark p-2">
<div className="col-lg-2 border border-top-0 border-left-0 border-bottom-0 border-right-3 border-black">
<center>
<div class="btn-group-vertical" role="group" aria-label="Vertical button group">
  <button type="button" class="btn btn-success m-1" onClick={e=>setFlag(0)}>Create Quest</button>
  <button type="button" class="btn btn-success m-1" onClick={e=>setFlag(1)}>My Quests</button>
  <button type="button" class="btn btn-success m-1" onClick={e=>setFlag(2)}>My Profile</button>
 
</div></center>
</div>
<div className="col-lg-10 p-2">
 {renderComponent()}
</div>
</div>

    </div>
  )
}
