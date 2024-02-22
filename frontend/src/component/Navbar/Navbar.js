import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../helper'
import { signout } from '../../helper/signout'

export default function Navbar() {

    const navigate=useNavigate()

    useEffect(()=>{

    },[isAuthenticated])

  return (
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><b>Nature Tour</b></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to='/'>Home</Link>
          </li>

        {!isAuthenticated() &&  <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to='/user/signup'>Register</Link>
          </li>}

          {isAuthenticated().data?.user?.role===0 &&  <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to='/user/dashboard'>User Dashboard</Link>
          </li>}

          {isAuthenticated().data?.community_manager?.role===1 &&  <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to='/community/dashboard'>Admin Dashboard</Link>
          </li>}


          {isAuthenticated() &&  <li class="nav-item">
            <Link class="nav-link active" aria-current="page" onClick={e=>{signout().then(()=>{
                navigate('/')
            })}}>Signout</Link>
          </li>}

          

         
        
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
          {/* <button class="btn btn-outline-danger" type="submit">Join Now</button> */}
        </form>
      </div>
    </div>
  </nav>
  
  )
}
