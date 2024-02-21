import React from 'react'
import axios from 'axios';
import  { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import '../css/card.css'

const ShowOne = () => {
    const {id}=useParams();
  const [product, setProduct] = useState(null);
  useEffect(()=>{
    axios
    .get(`http://localhost:8000/api/products/${id}`)
    .then((OneProduct) => setProduct(OneProduct.data.data))
    .catch((err) => console.log(err));
}, [id])
  return (
    <div>
        
<div className="container mt-5 mb-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card product-card">
            {product &&  <>
                <img src={product.image[0]} class="card-img-top "  alt="Product Image"/>
                <div className="card-body">
                    
                    <h5 className="card-title text-uppercase">{product.category}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                    <a href="/admin" className="btn btn-dark btn-block" style={{ background: '#dfd0a8' }}>All Products</a>
                </div>
                </>}
            </div>
        </div>
    </div>
</div>


    </div>
  )
}

export default ShowOne