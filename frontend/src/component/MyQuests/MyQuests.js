import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BAPI } from '../../backend'
import { isAuthenticated } from '../../helper'

export default function MyQuests() {

    const [quests,setQuests]=useState([{}])

    const getData=async()=>{
        const response =await axios.post(`${BAPI}/get/quests`,{
            manager_id:isAuthenticated().data?.community_manager?._id
        }).then(response=>{
            setQuests(response.data.quests)
            console.log(quests)
        })
        
           
        
     


    }

    useEffect(()=>{
        getData()
    },[])

  return (
    <div>
       {quests && <div className="container-fluid">
        {
            quests.map((data,index)=>{
             return    <div className="row m-2 border border-dark p-2">
               
                  <div className="col-lg-6">
                  <span><b>Nature Activity:</b> {data.activity?.activityName}<br></br>
                  <p>{data.activity?.activityDescription}</p><hr /></span>
                   <span><b>Leisure Activity:</b> {data.leisure_activity?.outdoorName}<br></br>
                   <p>{data.leisure_activity?.outdoorDescription}</p><hr /></span> 
                   <span><b>Local Events:</b> {data.local_events?.eventName}<br></br>
                   <p>{data.local_events?.eventDescritption}</p><hr /></span>  
                   <span><b>Start Date:</b> {data.start_date}<hr /></span>  
                   <span><b>Local Events:</b> {data.end_date}<hr /></span>
                   <span><b>Location:</b> {data.location}<hr /></span>    
                  </div>
                  <div className="col-lg-6 my-auto">
                    <img src={data.activity?.url} className='img-fluid m-2'/>
                    <img src={data.leisure_activity?.url} className='img-fluid m-2'/>
                  </div>
                </div>
            })
        }
        </div>}
    </div>
  )
}
