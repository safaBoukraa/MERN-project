import React from 'react'
import {useNavigate } from "react-router-dom"
import axios from "axios";
import  { useState } from "react";


const Create = () => {

const [formdata,setFormData]=useState({
  category:"",
  image:[],
  description:"",
  price:"",
  quantity:""
 
})

const [errors, setErrors] = useState([]); 
const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: type === "checkbox" ? checked : type === "file" ? Array.from(files) : value,
  }));
};
const handleSubmit = (e) => {
    e.preventDefault();
    const formdata1= new FormData();
    formdata1.append("category",formdata.category)
    formdata1.append("description",formdata.description)
    formdata1.append("price",formdata.price)
    formdata1.append("quantity",formdata.quantity)
    


        for (let i = 0; i < formdata.image.length; i++) {
            // newarr.push(selectedFile[i]);
            formdata1.append('files', formdata.image[i]);
          }
    axios
      .post("http://localhost:8000/api/products", formdata1)
      .then((res) => {
        navigate("/admin");
      })
      .catch(err=>{
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
            errorArr.push(errorResponse[key].message)
        }
        // Set Errors
        setErrors(errorArr);
    })
    setFormData({
      category:"",
      image:[],
      description:"",
      price:"",
      quantity:""
     
    })
// console.log(first)
  };
  return (
    <div className='d-flex gap-5 align-items-center'>
        <form className='shadow-lg p-3 mb-5 mt-5 rounded col-6 m-auto border border-primary ms-5 ' onSubmit={handleSubmit}>
        {/* {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)} */}
  <div className="mb-3 mt-3 ">
    <label  className="form-label fw-bold ">Category:</label>
   
    <input type="text" className="form-control w-75 m-auto" onChange={handleChange} name='category' value={formdata.category}/>
  </div>
  <div className="mb-3 mt-3">
    <label  className="form-label fw-bold">Image Product:</label>
    
    <input   name='image' multiple accept="image/*" type="file"   className="form-control w-75 m-auto"     onChange={handleChange}   />
  </div>
  <div className="mb-3 mt-3">
    <label  className="form-label fw-bold">Description:</label>
    
  
 
    <textarea className="form-control w-75 m-auto" name='description' onChange={handleChange} value={formdata.description} ></textarea>

  </div>
  <div className="mb-3 mt-3">
    <label  className="form-label fw-bold">Price:</label>
    
    <input type="text" className="form-control w-75 m-auto" name='price' onChange={handleChange}  value={formdata.price}/>
  </div>
  <div className="mb-3 mt-3">
    <label  className="form-label fw-bold">Quantity:</label>
    
    <input type="text" className="form-control w-75 m-auto" name='quantity' onChange={handleChange}  value={formdata.quantity}/>
  </div>
  
  

  <div className='d-flex justify-content-center '>
  <button type="submit" className="btn btn-primary ">Create</button>
  </div>
</form>
<div className=' p-4   text-danger  d-flex mt-5 me-4 '>
        {formdata.image.length>0 ? (
          <>
            <img className='w-75' src={URL.createObjectURL(formdata.image[0])} alt="error!" />
            
          </>
        ) : (
          <p className='m-auto'>Product image upload preview will appear here!</p>
        )}
      </div>
    </div>
  )
}

export default Create