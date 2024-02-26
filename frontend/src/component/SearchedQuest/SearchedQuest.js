import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BAPI } from '../../backend';

export default function SearchedQuest() {
   const location = useLocation();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(true);
   const [questData, setQuestData] = useState([]);

   const getRelevantQuests = async () => {
      if (!location.state || !location.state.query) {
         console.error("Query not found in location state.");
         return;
      }
      try {
         const response = await axios.post(`${BAPI}/get-relevant-quests`, {
            query: location.state.query
         });
         setQuestData(response.data.relevant_lists);
      } catch (error) {
         console.error("Error fetching relevant quests:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const openPage = (data) => {
      navigate('/quest-details', { state: { data } });
   };

   useEffect(() => {
      getRelevantQuests();
   }, []);

   return (
      <div className='container-fluid' style={{ font: 'initial' }}>
         <div className="container p-3 border border-dark mt-3 shadow shadow-md">
            <center><h1>Searched Results</h1></center>
            <hr />
            {isLoading ? (
               <p>Loading...</p>
            ) : (
               <center>
                  <div className='row justify-content-center'>
                     {questData.map((data, index) => (
                        <div className="col-lg-5 p-1 m-1 border border-dark shadow shadow-md" key={index}>
                           <center>
                              <img className='img-fluid' src={data.activity?.url} /><br /><br />
                              <b className='mt-3'>{data.activity?.activityName}, {data.leisure_activity?.outdoorName}, {data.local_events?.eventName}</b><br />
                              <span className='mt-2'><p>Start Date: {data.start_date}</p></span>
                              <span className='mt-1'><p>End Date: {data.end_date}</p></span>
                              <button className='btn btn-outline-primary m-2' onClick={() => openPage(data)}>View Details</button>
                           </center>
                        </div>
                     ))}
                  </div>
               </center>
            )}
         </div>
      </div>
   );
}
