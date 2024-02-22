import React, { useState } from 'react'
import { isAuthenticated } from '../../helper'

export default function UserProfile() {
    const user=isAuthenticated().data.user
    return (
      <div className='container-fluid'>
  
          <b>Name</b>: {user.name}
          <hr />
          <b>Email</b>: {user.email}
          <hr />
          <b>City</b>: {user.city}
          <hr />
          <b>Profession</b>: {user.profession}
          <hr />
      </div>)
}
