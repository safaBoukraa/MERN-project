import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cat = () => {
    const [products, setproduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                const allProducts = response.data.data;

                const product = allProducts.filter(product => product.category === 'cat');
                setproduct(product);
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




    return (
        <div className="d-flex" >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 m-3 text-white min-vh-100" style={{ borderRight: '2px solid #000', borderRadius: '2px' }}>
                <div className="dropdown" style={{ borderBottom: '1px solid #0F054C', marginTop: '20px', marginLeft: '30px' }}>
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="d-none d-sm-inline mx-1 fw-bold">
                            <h4 >Yassine  Arfaoui</h4>
                        </span>
                    </a>
                </div>
                <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline" style={{ color: '#0F054C' }}>Categories :</span>
                </div>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item">
                        <Link to="/categorie/cat" className="ex2 nav-link align-middle px-0">
                            <span className="d-none d-sm-inline">Cat</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/categorie/dog" className="ex2 nav-link align-middle px-0">
                            <span className="d-none d-sm-inline">Dog</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/categorie/fish" className="ex2 nav-link align-middle px-0">
                            <span className="d-none d-sm-inline">Fish</span>
                        </Link>
                    </li>
                </ul>
                <hr />
            </div>
            <div className="d-flex flex-wrap justify-content-around rounded">
                {products.map((product) => (
                    <div key={product.id} className="swiper-slide m-3" style={{cardStyle , padding:""}}>
                        <div className="card hover position-relative" style={{ height: "450px", padding: "15px", backgroundColor: "#EEEBE6" }}>
                            <a href={`single-product.html/${product.id}`} className="text-center">
                                <img src={product.image} className="img-fluid rounded-4" style={{ height: '180px' }} alt="Product Image" />
                            </a>
                            <div className="card-body p-0">
                                <a href={`single-product.html/${product.id}`}>
                                    <h6 style={{ width: "390px" }} className="card-title pt-4 m-0">{product.description}</h6>
                                </a>

                                <div className="card-text">
                                    <h3 className="secondary-font text-primary">{`$${product.price}`}</h3>

                                    <div className="d-flex flex-wrap mt-3">
                                        <a href="#" className="btn-cart me-3 px-4 pt-3 pb-3">
                                        <button
                                                onClick={async () => {
                                                    const updatedCard = await addToCard(product);
                                                    console.log(updatedCard);
                                                    return updatedCard;
                                                }}
                                                className="text-uppercase  btn btn-lg  m-0">Add to Cart</button>
                                        </a>
                                        <a href="#" className="btn-wishlist px-4 pt-3">
                                            <FaHeart className="fs-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cat;
