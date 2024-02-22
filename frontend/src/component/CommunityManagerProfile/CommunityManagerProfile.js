import React from 'react'
import { isAuthenticated } from '../../helper'

export default function CommunityManagerProfile() {
    const user=isAuthenticated().data.community_manager
  return (
    <div className='container-fluid'>

        <b>Name</b>: {user.name}
        <hr />
        <b>Email</b>: {user.email}
        <hr />
        <b>City</b>: {user.city}
        <hr />

    </div>
  )
}
