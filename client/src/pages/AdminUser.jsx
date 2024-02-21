import React from 'react'

import SideBar from '../components/SideBar'
import '../css/style.css'
import Users from '../components/Users'
const AdminUser = () => {
  return (
    <div className='d-flex'>
     
        <div className=''  style={{ position: "sticky", height: "100%", left: 0, top: 0 }}><SideBar/></div>
     
        <div className='w-100' ><Users/></div>
        
    </div>
  )
}

export default AdminUser