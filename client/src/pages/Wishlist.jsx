import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { HeartIcon } from '@heroicons/react/solid';
const Wishlist = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const cardStyle = {
        boxShadow: '5px 5px 8px rgba(1, 0, 0, 0.3)',
    };

    const getCard = () => {
        let card = localStorage.getItem('card');
        console.log("=========", card);

        if (!card) {
            let card = [];
            card = JSON.stringify(card);
            localStorage.setItem('card', card);
            console.log("+++++++++++++++", JSON.parse(localStorage.getItem('card')));
            return JSON.parse(localStorage.getItem('card'));
        }

        return JSON.parse(card);
    };


    const addToCard = async (obj) => {

        let card = await getCard();
        const existingProductIndex = card.findIndex((prod) => prod.id === obj._id);

        if (existingProductIndex === -1) {
            // Product not in the cart, add it with quantity 1
            card.push({ ...obj, quantity: 1, productId: obj._id });
        } else {
            // Product is already in the cart, increment the quantity
            card[existingProductIndex].quantity += 1;
        }

        card = JSON.stringify(card);
        localStorage.setItem('card', card);
        return JSON.parse(card);
    };

    const favorite = (product) => {
        const update = {
          ...product,
          favorite: ! product.favorite
        }
        axios
          .put(`http://localhost:8000/api/products/${product._id}`, update)
          .then((res) => {
            axios
              .get("http://localhost:8000/api/products")
              .then((allProducts) => setProducts(allProducts.data.data))
              .catch((err) => console.log(err));
    
          })
      }
   


    return (
        <div className="">
          
            <div className="d-flex ">
                {products && products.map((product) => (<div className=' ps-5 pe-5 d-flex flex-wrap justify-content-around  rounded mt-5'>{ product.favorite &&
                    <div key={product._id} className=" mb-5 d-flex  shadow  mb-5 bg-body rounded " style={{ cardStyle, padding: "" }}>
                        <div className=" d-flex flex-column" style={{ height: "450px",  backgroundColor: "" }}>
                            <Link to={`single-product.html/${product.id}`} className="text-center p-3 " style={{backgroundColor: "#dfd0a8",height:'100%' }}>
                                <img src={product.image} className=" rounded-4" style={{ height: '180px'}} alt="Product Image" />
                            </Link>
                            <div className="card-body p-3">
                                <a href={`single-product.html/${product.id}`} >
                                    <p style={{ width: "390px" }} className="card-title  pt-4 m-0">{product.description}</p>
                                </a>

                                <div className="card-text p-3">
                                    <h3 className="secondary-font ">{product.price} $</h3>

                                    <div className="d-flex justify-content-between align-items-center  ">
                                        
                                            <button
                                                onClick={async () => {
                                                    const updatedCard = await addToCard(product);
                                                    console.log(updatedCard);
                                                    return updatedCard;
                                                }}
                                                className="btn btn-primary "> Add to Cart
                                                
                                            </button>
                                          
                                        
                                        <div >
                                            {product.favorite?
                                            
                                        <a href='#' onClick={() => favorite(product)} className="">
                                            <FaHeart className="fs-5 h6" style={{ color: "red" }} />
                                        </a>:<a href='#' onClick={() => favorite(product)} className="">
                                            <FaHeart className="fs-5 h6" style={{ color: "black" }} />
                                        </a>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }</div>))}
            </div>
        </div>
    );
};

export default Wishlist;
