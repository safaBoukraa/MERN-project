import React from 'react'
import Dashbord from "../components/Dashbord"
import SideBar from '../components/SideBar'
import '../css/style.css'



const AdminDashboard = () => {
  return (
    <div className='d-flex'>
     
        <div className=''  style={{ position: "sticky", height: "100%", left: 0, top: 0 }}><SideBar/></div>
     
        <div className='w-100' ><Dashbord/></div>
        
    </div>
  )
}

export default AdminDashboard