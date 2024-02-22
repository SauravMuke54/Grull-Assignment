import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BAPI } from '../../backend'

export default function AllQuests() {
    const [quests,setQuests]=useState([{}])
    const getData=async()=>{
        await axios.get(`${BAPI}/get-all/quests`).then(response=>{
           
            setQuests(response.data.quests)
        })
    }
    useEffect(()=>{
        getData()
    },[])

  return (
    <div className='container' style={{font:'initial'}}>
    <center><h3>All Quests</h3></center>
   
        <div className="row justify-content-center">
   
       { quests.map((data,index)=>{
            return <div className="col-lg-5 p-1 m-1 border border-dark">
                <center>
                <img className='img-fluid' src={data.activity?.url}/><br /><br />
                <b className='mt-3'>{data.activity?.activityName+" , "+data.leisure_activity?.outdoorName+" , "+data.local_events?.eventName}</b>
           <br /> <span className='mt-2'><p>Start Date: {data.start_date}</p></span>
     <span className='mt-1'><p>End Date: {data.end_date}</p></span>

        <button className='btn btn-outline-primary m-2  '>View Details</button>
        </center>
            </div>
        }) }
    
        </div>
   
    </div>
  )
}
