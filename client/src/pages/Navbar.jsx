import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Logout from '../components/Logout'


const Navbar = ({loggedUser}) => {

    const [card, setCard] = useState([]);

    useEffect(() => {
        const storedCard = JSON.parse(localStorage.getItem("card")) || [];
        setCard(storedCard);
    }, []);

    const getCard = () => {
        let card = localStorage.getItem("card");
        try {
            card = JSON.parse(card) || [];
        } catch (error) {
            console.error('Error parsing card:', error);
            card = [];
        }
        return card;
    };

    const removeFromCard = (id) => {
        let card = getCard();
        const productIndex = card.findIndex((prod) => prod.id === id);
        if (productIndex !== -1) {
            card.splice(productIndex, 1);
            localStorage.removeItem(`product_${id}`);
            localStorage.setItem('card', JSON.stringify(card));
            setCard([...card]); // Update state to trigger a re-render
        }
    };


    const [isCartOpen, setCartOpen] = useState(false);

    // Function to toggle the cart visibility
    const toggleCart = () => {
        setCartOpen(!isCartOpen);
    };
    const closeCart = () => {
        setCartOpen(false);
    };

    const totalUniqueProducts = card.length;

    // Calculate the total price of all items in the cart
    const totalPrice = card.reduce((total, product) => total + product.price, 0);
    console.log(loggedUser)
    return (
        <div className=' '>
            <div className="container py-2 d-flex  align-items-center ">
                <div className="row py-2 pb-0 pb-sm-2 align-items-center ">

                    <div className="col-sm-4 col-lg-3 text-center text-sm-start mx-5">
                        <div className="main-logo">
                            <a href="index.html">
                                <img src="/logo3.png" alt="Logo" className="img-fluid" />
                            </a>
                        </div>
                    </div>

                    <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
                        <div className="search-bar border rounded-2 px-3 border-dark-subtle">
                            <form id="search-form" className="text-center d-flex align-items-center" action="#" method="get">
                                <input
                                    type="text"
                                    className="form-control border-0 bg-transparent"
                                    placeholder="Search for more than 10,000 products"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
                                    />
                                </svg>
                            </form>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <img style={{ height: "100px" }} src="/paw.png" alt="Paw Icon" />
                </div>
            </div>
            <div className="" style={{ borderBottom: '2px solid #000', borderRadius: '2px' }}>
                <nav className="main-menu d-flex  navbar navbar-expand-lg sticky-top m-2">
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header justify-content-center">
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        <div className="offcanvas-body justify-content-around align-items-center ">
                            <p className="filter-categories border-0 mb-0 me-5 text-dark  ">
                                <Link to="/category" className="nav-link text-decoration-none"> Shop by Category </Link>
                            </p>

                            <ul className="navbar-nav menu-list list-unstyled d-flex align-items-center gap-md-3 mb-0">
                                <li className="nav-item">
                                    <Link to='/' className="nav-link ">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/category" className="nav-link">Shop</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link">About us</Link>
                                </li>
                                {loggedUser ?(
                                    <>
                                <li className="text-dark fs-bold ms-5">
                                    {loggedUser.first_name}
                                </li>
                               <Logout/>
                                
                                {loggedUser.role==="admin"?(
                                    <li className="nav-item">
                                    <Link to="/admin" className="nav-link">Admin</Link>
                                </li>
                                ):(<li>
                                    <Link to={'/product/wishlist'} className="mx-3">
                                        <Icon icon="mdi:heart" className="fs-4 ms-5" />
                                    </Link>
                                </li>)
                                
                            }
                                    </>
                                ):<li>
                                <Link to="/login" className="mx-3">
                                    <Icon icon="healthicons:person" className="fs-4" />
                                </Link>
                            </li>
                                }
                                
                            </ul>

                            <div className="d-none d-lg-flex align-items-end">
                                <ul className="d-flex justify-content-end list-unstyled m-0">
                                
                             
                                    <li className="">
                                        <a href="#" className="mx-3" onClick={toggleCart}>
                                            <Icon icon="mdi:cart" className="fs-4 position-relative" />
                                            {totalUniqueProducts > 0 && (
                                                <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                                                    {totalUniqueProducts}
                                                </span>
                                            )}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className={`offcanvas offcanvas-end${isCartOpen ? ' show' : ''}`} data-bs-scroll="true" tabIndex="-1" id="offcanvasCart" aria-labelledby="My Cart">
                <div className="offcanvas-header justify-content-center">
                    <button type="button" className="btn-close" onClick={closeCart} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                            <span className="badge bg-primary rounded-circle pt-2">  {totalUniqueProducts}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {card.map((card) => (
                                <li key={card._id} className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <div className='d-flex'>
                                        <h6 className="my-0">{card.category}  : ----price :   ${card.price} </h6>
                                        
                                        </div>
                                        <small className="text-body-secondary"> {card.description}</small>
                                    </div>
                                    <div>
                                    <button 
                                        onClick={() => removeFromCard(card.id)}
                                        className=""
                                    >
                                        Remove
                                    </button>
                                    </div>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="fw-bold">Total (USD)</span>
                                <strong>${totalPrice.toFixed(2)}</strong>
                            </li>
                        </ul>
                        <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;



