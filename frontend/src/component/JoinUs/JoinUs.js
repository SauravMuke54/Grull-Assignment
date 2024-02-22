import React from 'react'

export default function JoinUs() {
  return (
    <div className='container-fluid' style={{font:'initial'}}>
         <center><h1 className='mt-3'>Join Us As? </h1></center>
      <center>
      <div className="row  p-2 justify-content-center mt-2 align-items-center">
        <div className="col-lg-4 m-2 border border-info  rounded-2 p-2 btn-outline-dark">
          <h3>Community Manager</h3>
          
          <img src='https://assets-global.website-files.com/61766c42e8e50c99a04fbd4b/64e69f70a8cfa4f87830027f_qualities-good-manager.jpeg' alt='image' className='img-fluid rounded-5' style={{height:"10rem"}} />
       <br />
       <br />
       <button className='btn btn-primary'> Join Now</button>
        </div>
        <div className="col-lg-4 m-2 border border-info rounded-2 p-2 btn-outline-dark">
        <h3>Tourist</h3>
          
          <img src='https://cdn01.buxtonco.com/news/2661/istock-665028882__large.jpg' alt='image' className='img-fluid rounded-5'  style={{height:"10rem"}}/>
          <br />
       <br />
       <button className='btn btn-primary'> Join Now</button>
        </div>
       
      </div>
      </center>
    </div>
  )
}
