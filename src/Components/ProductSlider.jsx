import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function ProductSlider({ title, data }) {
    let sliderOptions = {
        loop: true,
        modules: [Autoplay, Pagination],
        autoplay: {
            delay: 5000
        },
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            720: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        },
        centeredSlides: true,
        spaceBetween: 30,
        grabCursor: true,
        pagination: false
    }
    return (
        <>
            <section id="team" className="team section light-background">

                <div className="container section-title" data-aos="fade-up">
                    <h2>{title}</h2>
                    <p>CHECK OUR Latest {title} Products</p>
                </div>
                <div className="container">

                    <div className="gy-5">
                        <Swiper {...sliderOptions}>
                            {
                                data.map(item => {
                                    return <SwiperSlide key={item.id}>
                                        <div className="" data-aos="fade-up" data-aos-delay="100">
                                            <div className="member">
                                                <div className="pic"><img src={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${item.pic[0]}`} style={{ height: 300 }} className="w-100" alt="" /></div>
                                                <div className="member-info">
                                                    <h4 className='text-center'>{item.name}</h4>
                                                    <div className='d-flex justify-content-between'>
                                                        <p className='d-flex'><del className='text-danger'>&#8377;{item.basePrice}</del> <span className='fs-5'>&#8377;{item.finalPrice}</span> <sup className='text-success'>{item.discount}% off</sup></p>
                                                        <span>{item.stockQuantity ? `${item.stockQuantity} Left In Stock` : "Out Of Stock"}</span>
                                                    </div>
                                                    <Link to={`/product/${item.id}`} className='btn btn-primary w-100 btn-sm'>Add to Cart</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>

                </div>

            </section>
        </>
    )
}
