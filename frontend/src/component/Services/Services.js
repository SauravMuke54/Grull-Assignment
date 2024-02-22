import React from 'react';

export default function Services() {
  return (
    <div className='container-fluid' style={{ font: "initial" }}>
      <center><h1 className='mt-3'>What You Will Get?</h1></center>
      <center>
      <div className="row  p-2 justify-content-center mt-2 align-items-center">
        <div className="col-lg-3 m-2 border border-info  rounded-2 p-2 btn-outline-dark">
          <h3>Farming Activity</h3>
          
          <img src='https://images.theconversation.com/files/374827/original/file-20201214-23-fn7zkk.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop' alt='image' className='img-fluid rounded-5' style={{height:"10rem"}} />
        <br />  <span className='mt-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat sint ipsam soluta tempore ad. Unde voluptates repudiandae et ad sed inventore odit officia, fugiat facere architecto illo perspiciatis rem in!</span>
          <button className='btn btn-primary mt-2'> Know More</button>
          
        </div>
        <div className="col-lg-3 m-2 border border-info rounded-2 p-2 btn-outline-dark">
        <h3>Leisure Activity</h3>
          
          <img src='https://www.tomorrowsworldtoday.com/wp-content/uploads/2022/02/Nature-Enthusiast-Travel-Tips-Outdoors.jpg' alt='image' className='img-fluid rounded-5'  style={{height:"10rem"}}/>
         <br /> <span className='mt-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat sint ipsam soluta tempore ad. Unde voluptates repudiandae et ad sed inventore odit officia, fugiat facere architecto illo perspiciatis rem in!</span>

            <button className='btn btn-primary mt-2'> Know More</button>
        </div>
        <div className="col-lg-3 m-2 border border-info rounded-2 p-2 btn-outline-dark">
        <h3>Local Envents</h3>
          
          <img src='https://cdn.hswstatic.com/gif/community-events-ideas.jpg' alt='image' className='img-fluid rounded-5'  style={{height:"10rem"}}/>
          <br /><span className='mt-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat sint ipsam soluta tempore ad. Unde voluptates repudiandae et ad sed inventore odit officia, fugiat facere architecto illo perspiciatis rem in!</span>

          <button className='btn btn-primary mt-2'> Know More</button>
        </div>
      </div>
      </center>
    </div>
  );
}
