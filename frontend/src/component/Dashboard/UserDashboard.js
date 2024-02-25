import React,{useEffect, useState} from 'react'
import UserProfile from '../UserProfile/UserProfile'
import AppliedQuests from '../AppliedQuests/AppliedQuests'
import AllQuests from '../AllQuests/AllQuests'

export default function UserDashboard() {

    const [flag,setFlag]=useState(0)

   const renderComponent=()=>{

    if(flag===0){
        return <AllQuests/>
    }else if(flag===1){
        return <AppliedQuests/>
    }else{
        return <UserProfile/>
    }
   }
    useEffect(()=>{

    },[])
    return (
        <div className='container shadow shadow-md'>
        <center className='mt-5 ' style={{font:'initial'}}><h1>User Dashboard</h1></center>
        <div className="row border border-dark p-2">
        <div className="col-lg-2 border border-top-0 border-left-0 border-bottom-0 border-right-3 border-black">
        <center>
        <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
          <button type="button" class="btn btn-success m-1" onClick={e=>setFlag(0)}>All Quest</button>
          <button type="button" class="btn btn-success m-1" onClick={e=>setFlag(1)}>Applied Quests</button>
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
