import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

import About from '../Components/About'
import Facts from '../Components/Facts'
import Services from '../Components/Services'
import CategorySlider from '../Components/CategorySlider'
import Features from '../Components/Features'
import Testimonial from '../Components/Testimonial'
import Products from '../Components/Products'
import ProductSlider from '../Components/ProductSlider'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
export default function HomePage() {
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    let sliderOptions = {
        loop: true,
        modules: [Navigation, Autoplay],
        navigation: true,
        autoplay: {
            delay: 3000
        },
    }

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])
    return (
        <>
            <Swiper {...sliderOptions}>
                <SwiperSlide>
                    <section id="hero" className="hero section dark-background">
                        <img src="assets/img/banner/banner1.jpg" alt="" data-aos="fade-in" />
                        <div className="container d-flex flex-column align-items-center">
                            <h2 data-aos="fade-up" data-aos-delay="100">Style That Speaks Confidence & Class</h2>
                            <p data-aos="fade-up" data-aos-delay="200">Discover premium men’s fashion from top brands—perfect for everyday style and bold impressions.</p>
                            <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
                                <Link to="/shop?mc=Male" className="btn-get-started">Shop Now</Link>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
                <SwiperSlide>
                    <section id="hero" className="hero section dark-background">
                        <img src="assets/img/banner/banner2.jpg" alt="" data-aos="fade-in" />
                        <div className="container d-flex flex-column align-items-center">
                            <h2 data-aos="fade-up" data-aos-delay="100">Unleash Your Inner Fashion Icon</h2>
                            <p data-aos="fade-up" data-aos-delay="200">Shop trending women’s outfits, curated to blend comfort, style, and elegance in every look.</p>
                            <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
                                <Link to="/shop?mc=Female" className="btn-get-started">Shop Now</Link>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
                <SwiperSlide>
                    <section id="hero" className="hero section dark-background">
                        <img src="assets/img/banner/banner4.jpg" alt="" data-aos="fade-in" />
                        <div className="container d-flex flex-column align-items-center">
                            <h2 data-aos="fade-up" data-aos-delay="100">Fun, Comfy Looks for Little Stars</h2>
                            <p data-aos="fade-up" data-aos-delay="200">Adorable and durable kidswear from trusted brands—perfect for school, play, and family outings.</p>
                            <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
                                <Link to="/shop?mc=Kids" className="btn-get-started">Shop Now</Link>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>

            </Swiper>
            <CategorySlider title="Maincategory" />
            <Products products={ProductStateData.filter(x => x.active)} maincategories={MaincategoryStateData.filter(x => x.active)} />
            <About />
            <Facts />
            <Services />
            <CategorySlider title="Subcategory" />
            <Features />
            <Testimonial />
            <CategorySlider title="Brand" />
            {
                MaincategoryStateData.filter(x => x.active).map((item,index) => {
                    return <ProductSlider key={index} title={item.name} data={ProductStateData.filter(x => x.active).filter(x => x.maincategory === item.name)} />
                })
            }
        </>
    )
}
