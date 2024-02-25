import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BAPI } from '../../backend'
import { useNavigate } from 'react-router-dom'

export default function AllQuests() {
    const [quests,setQuests]=useState([{}])
    const navigate =useNavigate()
    const getData=async()=>{
        await axios.get(`${BAPI}/get-all/quests`).then(response=>{
           
            setQuests(response.data.quests)
        })
    }

    const openPage=async(data)=>{
        navigate('/quest-details',{state:{data}})
    }

    useEffect(()=>{
        getData()
    },[])

  return (
    <div className='container shadow shadow-md p-2 ' style={{font:'initial'}}>
    <center><h3>All Quests</h3></center>
   
        <div className="row justify-content-center">
   
       { quests.map((data,index)=>{
            return <div className="col-lg-5 p-1 m-1 border border-dark shadow shadow-md">
                <center>
                <img className='img-fluid' src={data.activity?.url}/><br /><br />
                <b className='mt-3'>{data.activity?.activityName+" , "+data.leisure_activity?.outdoorName+" , "+data.local_events?.eventName}</b>
           <br /> <span className='mt-2'><p>Start Date: {data.start_date}</p></span>
     <span className='mt-1'><p>End Date: {data.end_date}</p></span>

        <button className='btn btn-outline-primary m-2  ' onClick={e=>openPage(data)}>View Details</button>
        </center>
            </div>
        }) }
    
        </div>
   
    </div>
  )
}
