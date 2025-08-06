import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
export default function Testimonial() {
    let sliderOptions = {
        loop: true,
        modules: [Navigation, Autoplay],
        navigation: true,
        autoplay: {
            delay: 3000
        },
    }

    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
        })()
    }, [TestimonialStateData.length])
    return (
        <>
            <section id="testimonials" className="testimonials section dark-background">

                <img src="assets/img/testimonials-bg.jpg" className="testimonials-bg" alt="" />

                <div className="container" data-aos="fade-up" data-aos-delay="100">

                    <Swiper {...sliderOptions}>
                        {
                            TestimonialStateData.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <div className="testimonial-item">
                                        <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} className="testimonial-img" alt="" />
                                        <h3>{item.name}</h3>
                                        <div className="stars">
                                            <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                        </div>
                                        <p>
                                            <i className="bi bi-quote quote-icon-left"></i>
                                            <span>{item.message}</span>
                                            <i className="bi bi-quote quote-icon-right"></i>
                                        </p>
                                    </div>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
            </section >
        </>
    )
}
