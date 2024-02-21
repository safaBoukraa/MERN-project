import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { HeartIcon } from '@heroicons/react/solid';
const Categories = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("all")

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
            favorite: !product.favorite
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
    //    =================================================select==================
    // const handelselect = (e) => {
    //     setCategory(e.target.value)

    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8000/api/products');
    //             const allProducts = response.data.data;

    //             const products = allProducts.filter(product => {
    //                 console.log("Product Category = ", product.category, "Ctgr", category);
    //                 product.category === category
    //             });
    //             setProducts(products);
    //             console.log(category)
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();


    // }

    return (
        <div>
            <div className='mt-3'>
                <select onChange={(e) => setCategory(e.target.value)} className="form-select w-25 ms-3 border border-primary" aria-label="Default select example">
                    <option selected value="all">Shop By Category</option>
                    <option value="dog">dog</option>
                    <option value="cat">cat</option>
                    <option value="fish">Fish</option>
                </select>
            </div>

            <div className="d-flex">
                {/* <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 m-3 text-white min-vh-100" style={{ borderRight: '2px solid #000', borderRadius: '2px' }}>
                <div className="dropdown" style={{ borderBottom: '1px solid #0F054C', marginTop: '20px', marginLeft: '30px' }}>
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="d-none d-sm-inline mx-1 fw-bold">
                            <h4>Purrfect Pets</h4>
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
            </div> */}

                <div className=" ps-5 pe-5 d-flex flex-wrap justify-content-around  rounded mt-5">
                    {products && products.filter(product => {
                        if(category != "all"){
                           return product.category == category
                        }
                        return product
                    }).map((product) => (
                        <div key={product._id} className=" mb-5 d-flex  shadow  mb-5 bg-body rounded " style={{ cardStyle, padding: "" }}>
                            <div className=" d-flex flex-column" style={{ height: "450px", backgroundColor: "" }}>
                                <Link to={`single-product.html/${product.id}`} className="text-center p-3 " style={{ backgroundColor: "#dfd0a8", height: '100%' }}>
                                    <img src={product.image} className=" rounded-4" style={{ height: '200px', width: '100%' }} alt="Product Image" />
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
                                                {product.favorite ?

                                                    <a onClick={() => favorite(product)} className="">
                                                        <FaHeart className="fs-5 h6" style={{ color: "red" }} />
                                                    </a> : <a onClick={() => favorite(product)} className="">
                                                        <FaHeart className="fs-5 h6" style={{ color: "black" }} />
                                                    </a>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div></div>
    );
};

export default Categories;
