import React from 'react'
import { useEffect, useState } from "react";
import {Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import '../css/card.css'
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((allUsers) => setUsers(allUsers.data))
      .catch((err) => console.log(err));
  }, []);
  const onDeleteUser= (id) => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then((res) => {
        console.log(res);
        const filteredUsers = users.filter((user) => {
          return user._id !== id;
        });
        setUsers(filteredUsers);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='  p-5 '>

        
<table className="table table-hover mt-2 table-bordered border-1   ">
  <thead >
    <tr >
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>First Name</th>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Last Name</th>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Email</th>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Role</th>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Adoption</th>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Actions</th>
      
    </tr>
  </thead>
  <tbody>
  {users && users.map((one)=>{
        return (
      <tr key={one._id} className=" text-center   ">
      
      <td><p>{one.first_name}</p></td>
  
      <td><p>{one.last_name}</p></td>
      
      <td><p className='text-center'>{one.email}</p></td>
      <td><p className='text-center'>{one.role}</p></td>
      <td>{one.adopte ?<span class="badge text-bg-success">Yes</span>:<span class="badge text-bg-danger">No</span>}</td>
      <td><div className='d-flex gap-2 justify-content-center '>
      
      <button type="button" className="btn btn-danger" onClick={()=>{onDeleteUser(one._id)}}>Delete</button>
      </div>
      </td>
      
    </tr>
     )
      })}
    
  </tbody>
</table>
    </div>
  )
}

export default Users