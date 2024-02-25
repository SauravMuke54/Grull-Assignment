import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../helper'
import { BAPI } from '../../backend'
import { useNavigate } from 'react-router-dom'

export default function AppliedQuests() {


  const [quests,setQuests]=useState([{}])
  const navigate=useNavigate()

  const viewDetails=(data)=>{
    navigate('/quest-details',{state:{data:data.quest_data}})
  }

  const getData=async()=>{
    await axios.post(`${BAPI}/get-user-quests`,{
      'user_id':isAuthenticated().data?.user?._id
    }).then((response)=>{
      setQuests(response.data.user_quests)
    }).catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className='shadow shadow-md p-2' style={{font:'initial'}}>
      <center><h3>Applied Quests</h3></center>
      {
        quests && quests.map((data,index)=>{
          return (<div className='row p-2 border border-dark m-2 shadow shadow-md'>
            
            <h6><b>Activity:</b> {data?.quest_data?.activity?.activityName}, {data?.quest_data?.leisure_activity?.outdoorName} & {data?.quest_data?.local_events?.eventName} </h6>
            <h6><b>Start Date:</b>{data?.quest_data?.start_date}</h6>
            <h6><b>End Date:</b>{data?.quest_data?.end_date}</h6>
            <h6><b>Booking Status:</b> {data.status==='Pending'?<span className='text-danger'>Pending</span>:<>{data.status==='Accepted'?<span className='text-success'>Accepted</span>:<span className='text-danger'>Rejected</span>}</>}</h6>
            <button className='btn btn-outline-primary' onClick={e=>{viewDetails(data)}}> View Details </button>
          </div>)
            
          
        })
      }
    </div>
  )
}
