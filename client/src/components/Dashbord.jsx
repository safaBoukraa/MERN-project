import React from 'react'
import { useEffect, useState } from "react";
import {Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import '../css/card.css'
const Dashbord = () => {
    
  const [products, setProducts] = useState([]);
  const [countProducts,setCountProducts]=useState("");
  const [countusers,setCountusers]=useState("");


    useEffect(() => {
      axios
        .get("http://localhost:8000/api/products")
        .then((res) => {
          return(
            setProducts(res.data.data),
            console.log(res.data.data)
            )
          })
        .catch((err) => console.log(err));
    }, []);
    // =====================Count-All-Products=============
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/products/count")
        .then((res) => {
          return(
            setCountProducts(res.data.data),
            console.log(res.data.data)
            )
          })
        .catch((err) => console.log(err));
    }, []);
    // =====================count-users============
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/users/count")
        .then((res) => {
          return(
            setCountusers(res.data),
            console.log(res.data)
            )
          })
        .catch((err) => console.log(err));
    }, []);
    

    //   =============onclick-create-product===============
const nav=useNavigate()
const addProduct=()=>{

nav(`/product/new`)
}
// =============update=========
const editProduct=(id)=>{

  nav(`/product/edit/${id}`)
  }
  // ================view=========
  const viewProduct=(id)=>{

    nav(`/product/${id}`)
    }
 // ==============Delete============
 const onDeleteProduct= (id) => {
  axios
    .delete(`http://localhost:8000/api/products/${id}`)
    .then((res) => {
      console.log(res);
      const filteredProducts = products.filter((product) => {
        return product._id !== id;
      });
      setProducts(filteredProducts);
    })
    .catch((err) => console.log(err));
};

  return (
    <div className='  p-5 '>
     <div className='d-flex gap-5 justify-content-evenly mt-1'>
    <div className='w-30 h-50 card1 shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
    <h3  style={{color:"#BE9337"}}>Number of Users 👨🏼‍🏭</h3>
      <p className='text-center fw-bold clignotant1'>{countusers}</p>

    </div>
    <div className='w-30 h-50 card2 shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
      <h3 className='text-primary'>Number of Products 🛒</h3>
      <p className='text-center fw-bold clignotant '>{countProducts}</p>

    </div>
    </div>
    <button type="button" className='btn   mt-2 mb-2 text-light ' style={{ backgroundColor: '#be9337' }} onClick={addProduct} >New Product</button>
        
<table className="table table-hover mt-2 table-bordered border-1   ">
  <thead >
    <tr>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Category</th>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Image</th>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Description</th>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Price $</th>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Quantity</th>
      <th   scope="col"  style={{ backgroundColor: '#dfd0a8 ' }}>Actions</th>
      
    </tr>
  </thead>
  <tbody>
  {products && products.map((one)=>{
        return (
      <tr key={one._id} className=" text-center   ">
      
      <td><p>{one.category}</p></td>
      <td><img className='m-auto' src={one.image[0]} width={40} ></img></td>
      <td><p>{one.description}</p></td>
      
      <td><p className='text-center'>{one.price}</p></td>
      <td><p className='text-center'>{one.quantity}</p></td>
      <td><div className='d-flex gap-2 justify-content-center '>
      <button  type="button" className="btn text-light  " style={{ backgroundColor: '#0db87e' }} onClick={()=>{editProduct(one._id)}} >Edit</button>
      <button type="button" className="btn btn-danger" onClick={()=>{onDeleteProduct(one._id)}}>Delete</button>
      <button  type="button" className="btn  text-light  " style={{ backgroundColor: '#be9337 ' }}   onClick={()=>viewProduct(one._id)} >View</button></div>
      </td>
      
    </tr>
     )
      })}
    
  </tbody>
</table>
    </div>
  )
}

export default Dashbord