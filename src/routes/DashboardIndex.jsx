import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import { Post } from './Post'

export default function DashboardIndex() {
  return (
    <div className='dashboardIndex'>
        <h2>All Posts (10)</h2>
        <Post/>
        <div className="postDetailsOutlet">
            <Outlet/>
        </div>
        
    </div>
  )
}
