import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BAPI } from "../../backend";
import { isAuthenticated } from "../../helper";

export default function QuestDetails() {
  const location = useLocation();
  const [manager,setManager]=useState({})
  const [success,setSuccess]=useState()
  const [error,setError]=useState()

  const bookQuest=async()=>{
    await axios.post(`${BAPI}/book-quest`,{
        manager_id:location?.state?.data?.manager_id,
        quest_id:location?.state?.data?._id,
        user_id:isAuthenticated().data?.user?._id,
        quest_data:location.state.data       
    }).then((response)=>{
      setSuccess("Requested for quest booking...")
      setError("")
    }).catch(err=>{
      setError("Already requested for booking and booking in pending.....")
      setSuccess("")
    })
  }

  const getManagerDetails=async()=>{
    await axios.post(`${BAPI}/get-manager-details`,{manager_id:location?.state?.data?.manager_id}).then((response)=>{
        setManager(response.data.manager)
        console.log(response)

    }).catch(err=>{
        console.log(err)
    })
  }

  useEffect(()=>{
    location && getManagerDetails() 
  },[])

  return (
    <div className="container-fluid p-3  " style={{font:'initial'}}>

      <div className="container p-2">
        <div className="row shadow shadow-lg rounded-5">
          <div className="col d-flex align-items-center  p-2  ">
            <img
              src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
              alt=""
              style={{maxWidth:"50px",maxHeight:"50px"}}
              className=" rounded-circle"
            />
             {manager&& <span>  
                <h6 className="m-1">Organized By: </h6> 
            <h5 className="m-1"><b>{manager.name}</b></h5>
           
            </span>

          }
           
          </div>
         
         
          
        </div>
        <div className="row mt-3 shadow shadow-lg rounded-5">
          <div className="col  p-4 ">
            
          <h2 className="border border-top-0 border-left-0 border-right-0">{location?.state?.data?.activity?.activityName}</h2>
          <br />
          <center className="p-3">
          <img src={location?.state?.data?.activity?.url} alt="" className="img-fluid border border-dark p-2 rounded-2" />
          </center>
          <p>{location?.state?.data?.activity?.activityDescription}</p>
          <br />
<br />
<h2 className="border border-top-0 border-left-0 border-right-0">{location?.state?.data?.leisure_activity?.outdoorName}</h2>
          <br />
          <center className="p-3">
          <img src={location?.state?.data?.leisure_activity?.url} alt="" className="img-fluid border border-dark p-2 rounded-2" />
          </center>
          <p>{location?.state?.data?.leisure_activity?.outdoorDescription}</p>
          <br />
          <br />

          <h2 className="border border-top-0 border-left-0 border-right-0">{location?.state?.data?.local_events?.eventName}</h2>
          <br />
        
          <p>{location?.state?.data?.local_events?.eventDescritption}</p>
          <br />
          <br />

          
          <h2 className="border border-top-0 border-left-0 border-right-0">Other Details</h2>
          <br />
        
          <h6>Start Date: {location?.state?.data?.start_date}</h6>
          <h6>End Date: {location?.state?.data?.end_date}</h6>
          <h6>Location: {location?.state?.data?.location}</h6>
          <br />
          <br />

          { success &&  <div class="alert alert-success" role="alert">
{success}
</div>}
{ error &&  <div class="alert alert-danger" role="alert">
{error}
</div>}
          <center>
            <button className="btn btn-success" onClick={e=>{bookQuest()}}>Book Quest</button>
          </center>

          

          
           
          </div>

          
        </div>
        <hr />
      </div>
    </div>
  );
}
