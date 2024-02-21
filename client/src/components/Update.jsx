import React from 'react'
import {useNavigate,useParams } from "react-router-dom"
import axios from "axios";
import  { useState ,useEffect} from "react";

const Update = () => {
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [errors, setErrors] = useState([]);

    const naviagte = useNavigate();
    const { id } = useParams();
     // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const createdProduct= {
      category,
      image,
      description,
      price,
      quantity,
      
    };
    axios
      .put(`http://localhost:8000/api/products/${id}`, createdProduct)
      .then((res) => {
        naviagte("/admin");
      })
      .catch(err=>{
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
            errorArr.push(errorResponse[key].message)
        }
        // Set Errors
        setErrors(errorArr);
    });
    setCategory("");
    setImage("");
    setDescription("");
    setPrice("");
    setQuantity("");
   
  };
// ====================upload-image sous form fichier================
const handleImageUpload = (e) => {
  const file = e.target.files[0];

  TransformFileData(file);
};

const TransformFileData = (file) => {
  const reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  } else {
    setImage("");
  }
};
// =========================
useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        setCategory(res.data.data.category);
        setImage(res.data.data.image);
        setDescription(res.data.data.description);
        setPrice(res.data.data.price);
        setQuantity(res.data.data.quantity);
      
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className='d-flex gap-5 align-items-center'>
    <form className='shadow-lg p-3 mb-5 mt-5 rounded col-6  m-auto border border-primary ms-5 ' onSubmit={submitHandler}>
    {errors.map((err, index) => <p className='text-danger' key={index}>{err}</p>)}
<div className="mb-3 mt-3 ">
<label  className="form-label fw-bold ">Category:</label>

<input type="text" className="form-control w-75 m-auto" onChange={(e)=>{setCategory(e.target.value)}}  value={category}/>
</div>
<div className="mb-3 mt-3">
<label  className="form-label fw-bold">Image Product:</label>

<input type="file" accept="image/*"  className="form-control w-75 m-auto" onChange={handleImageUpload} />
</div>
<div className="mb-3 mt-3">
<label  className="form-label fw-bold">Description:</label>



<textarea className="form-control w-75 m-auto" onChange={(e)=>{setDescription(e.target.value)}} value={description} ></textarea>

</div>
<div className="mb-3 mt-3">
<label  className="form-label fw-bold">Price:</label>

<input type="text" className="form-control w-75 m-auto" onChange={(e)=>{setPrice(e.target.value)}}  value={price}/>
</div>
<div className="mb-3 mt-3">
<label  className="form-label fw-bold">Quantity:</label>

<input type="text" className="form-control w-75 m-auto" onChange={(e)=>{setQuantity(e.target.value)}}  value={quantity}/>
</div>



<div className='d-flex justify-content-center '>
<button type="submit" class="btn btn-success ">Edit Product</button>
</div>
</form>
<div className=' p-4   text-danger  d-flex mt-5 me-4 '>
    {image ? (
      <>
        <img className='w-75' src={image} alt="error!" />
      </>
    ) : (
      <p className='m-auto'>Product image upload preview will appear here!</p>
    )}
  </div>
</div>
  )
}

export default Update