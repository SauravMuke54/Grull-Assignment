import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../helper'
import { BAPI } from '../../backend'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function QuestRequest() {

  
  const [quests,setQuests]=useState([{}])
  const navigate=useNavigate()

  const acceptQuestRequest=async(data)=>{
    await axios.post(`${BAPI}/update-quest-status`,{
      _id:data._id,
      status:"Accepted"
    }).then((
      response
    )=>{
      console.log(response.data)


    }).catch(err=>{
      console.log(err)
    })
  }

  const rejectQuestRequest=async(data)=>{
    await axios.post(`${BAPI}/update-quest-status`,{
      _id:data._id,
      status:"Rejected"
    }).then((
      response
    )=>{
      console.log(response.data)


    }).catch(err=>{
      console.log(err)
    })
  }
  const viewDetails=(data)=>{
    navigate('/quest-details',{state:{data:data.quest_data}})
  }
console.log(isAuthenticated())
  const getData=async()=>{
    await axios.post(`${BAPI}/get-manager-quests`,{
      'manager_id':isAuthenticated().data?.community_manager?._id
    }).then((response)=>{
      setQuests(response.data.manager_quests)
      console.log(quests)
    }).catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getData()
  },[acceptQuestRequest,rejectQuestRequest])


  return (
    <div className='shadow shadow-md p-2' style={{font:'initial'}}>
        <center><h3>Requested Approvals</h3></center>
        {
        quests && quests.map((data,index)=>{
          return (<div className='row p-2 border border-dark m-2 shadow shadow-md'>
            
            <h6><b>Activity:</b> {data?.quest_data?.activity?.activityName}, {data?.quest_data?.leisure_activity?.outdoorName} & {data?.quest_data?.local_events?.eventName} </h6>
            <h6><b>Start Date:</b>{data?.quest_data?.start_date}</h6>
            <h6><b>End Date:</b>{data?.quest_data?.end_date}</h6>
            <h6><b>Booking Status:</b> {data.status==='Pending'?<span className='text-danger'>Pending</span>:<>{data.status==='Accepted'?<span className='text-success'>Accepted</span>:<span className='text-danger'>Rejected</span>}</>}</h6>
           <span className='d-flex justify-content-center'>
          {data.status!=='Accepted' &&  data.status!=='Rejected'      && <span> <button className='btn btn-outline-success m-2' onClick={e=>{acceptQuestRequest(data)}}> Accepet </button>
<button className='btn btn-outline-danger m-2' onClick={e=>{rejectQuestRequest(data)}}> Reject </button>
        </span>} <button className='btn btn-outline-primary m-2' onClick={e=>{viewDetails(data)}}> View Details </button></span> </div>)
            
          
        })
      }
    </div>
  )
}
