import axios from 'axios'
import React, { useState } from 'react'
import { BAPI } from '../../backend'
import { isAuthenticated } from '../../helper'

export default function CreateQuest() {

    const [activityName,setActivityName]=useState("")
    const [activityDescription,setActivityDescription]=useState("")
    const [activityImage,setActivityImage]=useState("")
    const [eventName,setEventName]=useState("")
    const [eventDescritption,setEventDescription]=useState("")
    const [outdoorName,setOutdoorName]=useState("")
    const [outdoorDescription,setOutdoorDescription]=useState("")
    const [outdoorImage,setOutdoorImage]=useState("")
    const [url1,setUrl1]=useState("")
    const [url2,setUrl2]=useState("")
    const [success,setSuccess]=useState("")
    const [error,setError]=useState("")
    const [start_date,setStartDate]=useState("")
    const [end_date,setEndDate]=useState("")
    const [location,setLocation]=useState("")

    const sendData=async()=>{

        if(activityImage){
        const data= new FormData()
        data.append('file',activityImage)
        data.append('upload_preset',"er103mfg")
        data.append('cloud_name','dlpcihcmz')

        
        await axios.post('https://api.cloudinary.com/v1_1/dlpcihcmz/image/upload',data).then(response=>{
            
            setUrl1(response.data.url)
        })
        }


        if(outdoorImage){
            const data= new FormData()
            data.append('file',outdoorImage)
            data.append('upload_preset',"er103mfg")
            data.append('cloud_name','dlpcihcmz')
    
            
            await axios.post('https://api.cloudinary.com/v1_1/dlpcihcmz/image/upload',data).then(response=>{
                
                setUrl2(response.data.url)
            })
            }

    
          await  axios.post(`${BAPI}/create/quest`,{
                activity:{
                    activityName,activityDescription,url1
                },leisure_activity:{
                    outdoorName,outdoorDescription,url2
                },local_events:{
                    eventName,eventDescritption
                },start_date,end_date,location,manager_id:isAuthenticated().data?.community_manager?._id
            }).then((response)=>{
                // console.log(response.data)
                setSuccess("Quest created successfully")
                setError("")
                
            }).catch(err=>{
                setSuccess("")
                setError("Error in adding quest")
            })


    }

  return (
    <div style={{font:'initial'}}>
      { success &&  <div class="alert alert-success" role="alert">
{success}
</div>}
{ error &&  <div class="alert alert-danger" role="alert">
{error}
</div>}

       <h3 className='border border-top-0 border-left-0 border-right-0'>
        Farm Activity
       </h3>
      
 <br/>
       <div class="mb-3">
        <label for="" class="form-label">Name of Activity</label>
        <input
            type="text"
            class="form-control"
            name=""
            id=""
            value={activityName}
            onChange={e=>setActivityName(e.target.value)}
            aria-describedby="helpId"
            placeholder=""
        />
       
       </div>

       <div class="mb-3">
        <label for="" class="form-label">Description</label>
        <textarea class="form-control" name="" id="" rows="3" value={activityDescription}
            onChange={e=>setActivityDescription(e.target.value)}></textarea>
       </div>

       <div class="mb-3">
        <label for="" class="form-label">Upload Image</label>
        <input
            type="file"
            class="form-control"
            name=""
            id=""
           
            onChange={e=>setActivityImage(e.target.files[0])}
            placeholder=""
            aria-describedby="fileHelpId"
        />

       </div>
       
<br />
       <h3 className='border border-top-0 border-left-0 border-right-0'>
        Leisure / Outdoor Activity
       </h3>
      
 <br/>
       <div class="mb-3">
        <label for="" class="form-label">Name of Activity</label>
        <input
            type="text"
            class="form-control"
            name=""
            id=""
            value={outdoorName}
            onChange={e=>setOutdoorName(e.target.value)}
            aria-describedby="helpId"
            placeholder=""
        />
       
       </div>

       <div class="mb-3">
        <label for="" class="form-label">Description</label>
        <textarea class="form-control" name="" id="" rows="3" value={outdoorDescription}
            onChange={e=>setOutdoorDescription(e.target.value)}></textarea>
       </div>

       <div class="mb-3">
        <label for="" class="form-label">Upload Image</label>
        <input
            type="file"
            class="form-control"
            name=""
            id=""
          
            onChange={e=>setOutdoorImage(e.target.files[0])}
            placeholder=""
            aria-describedby="fileHelpId"
        />

       </div>
       
       <br />

       <h3 className='border border-top-0 border-left-0 border-right-0'>
     Local Events
       </h3>
      
 <br/>
       <div class="mb-3">
        <label for="" class="form-label">Name of Activity</label>
        <input
            type="text"
            class="form-control"
            name=""
            id=""
            value={eventName}
            onChange={e=>setEventName(e.target.value)}
            aria-describedby="helpId"
            placeholder=""
        />
       
       </div>

       <div class="mb-3">
        <label for="" class="form-label">Description</label>
        <textarea class="form-control" name="" id="" rows="3" value={eventDescritption}
            onChange={e=>setEventDescription(e.target.value)}></textarea>
       </div>

      
    <div >
    <br />

<h3 className='border border-top-0 border-left-0 border-right-0'>
Other Information
</h3>

        <br />
<div class="mb-3">
    <label for="" class="form-label">Start Date</label>
    <input
        type="date"
        class="form-control"
        name=""
        id=""
        value={start_date}
        onChange={e=>setStartDate(e.target.value)}
        aria-describedby="helpId"
        placeholder=""
    />
   
</div>

<div class="mb-3">
    <label for="" class="form-label">End Date</label>
    <input
        type="date"
        class="form-control"
        name=""
        id=""
        value={end_date}
        onChange={e=>setEndDate(e.target.value)}
        aria-describedby="helpId"
        placeholder=""
    />
   
</div>

<div class="mb-3">
    <label for="" class="form-label">Location</label>
    <input
        type="text"
        class="form-control"
        name=""
        id=""
        value={location}
        onChange={e=>setLocation(e.target.value)}
        aria-describedby="helpId"
        placeholder="give full location details"
    />
   
</div>


<center>
    <button className='btn btn-success mt-2 mb-2' onClick={e=>{
        sendData()
    }}> Register Quest</button>
</center>
    </div>
       

       
       
    </div>
  )
}
