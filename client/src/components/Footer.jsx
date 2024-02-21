import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section  text-light py-5 bottom-0 w-100" style={{ background: '#dfd0a8' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="footer-left">
              <div className="footer-logo">
                <a href="#" className="text-dark">Purrfect Pets</a>
              </div>
              <ul className="list-unstyled text-dark">
                <li>Address: 11-11 Road 11 22 22</li>
                <li>Phone: +216 28.384.171</li>
                <li>Email: yassinearf123@gmail.com</li>
              </ul>
              <div className="footer-social">
                <a href="#" className="text-dark"><i className="fa fa-facebook"></i></a>
                <a href="#" className="text-dark"><i className="fa fa-instagram"></i></a>
                <a href="#" className="text-dark"><i className="fa fa-twitter"></i></a>
                <a href="#" className="text-dark"><i className="fa fa-pinterest"></i></a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 offset-lg-1">
            <div className="footer-widget">
              <h5  className="text-dark">Information</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark">About Us</a></li>
                <li><a href="#" className="text-dark">Checkout</a></li>
                <li><a href="#" className="text-dark">Contact</a></li>
                <li><a href="#" className="text-dark">Services</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="footer-widget">
              <h5 className="text-dark">My Account</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark">My Account</a></li>
                <li><a href="#" className="text-dark">Contact</a></li>
                <li><a href="#" className="text-dark">Shopping Cart</a></li>
                <li><a href="#" className="text-dark">Shop</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="newslatter-item">
              <h5 className="text-dark">Join Our Newsletter Now</h5>
              <p>Get E-mail updates about our latest shop and special offers.</p>
              <form action="#" className="subscribe-form">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Enter Your Mail" />
                  <button type="button" className="btn test-dark fw-bold" style={{ background: '#3c9e7d' }}>
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-reserved  text-center py-3"style={{ background: '#dfd0a8' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-text text-dark">
                &copy; {new Date().getFullYear()} Jassa. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
