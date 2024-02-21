import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';

const Dashboard = () => {
    useEffect(() => {
        const initializeSwiper = () => {
            new Swiper('.main-swiper', {
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        };

        initializeSwiper();
    }, []); // Empty dependency array to run the effect only once on mount

    return (
        <div>
            <section id="banner" style={{ background: '#F9F3EC' }}>
                <div className="container">
                    <div className="swiper main-swiper">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide py-5">
                                <div className="row banner-content align-items-center">
                                    <div className="img-wrapper col-md-5">
                                        <img src="/banner-img.png" className="img-fluid" alt="Banner Image 1" />
                                    </div>
                                    <div className="content-wrapper col-md-7 p-5 mb-5">
                                        <h2 className="banner-title display-1 fw-normal">Best destination for <span className="text-primary">your pets</span></h2>
                                        <Link to="/category" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">
                                            shop now
                                            <svg width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                                                <use xlinkHref="#arrow-right"></use>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-pagination "></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
