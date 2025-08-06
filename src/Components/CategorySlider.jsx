import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function CategorySlider({ title }) {
    let [data, setData] = useState([])
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    let sliderOptions = {
        loop: true,
        modules: [Autoplay, Pagination],
        autoplay: {
            delay: 1000
        },
        breakpoints: {
            480: {
                slidesPerView: title === "Brand" ? 2 : 1,
                spaceBetween: 20
            },
            720: {
                slidesPerView: title === "Brand" ? 4 : 2,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: title === "Brand" ? 6 : 3,
                spaceBetween: 20
            }
        },
        // centeredSlides: true,
        spaceBetween: 100,
        grabCursor: true,
        pagination: false
    }

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if (title === "Maincategory" && MaincategoryStateData.length) {
                setData(MaincategoryStateData.filter(x => x.active))
            }
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (title === "Subcategory" && SubcategoryStateData.length) {
                setData(SubcategoryStateData.filter(x => x.active))
            }
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (title === "Brand" && BrandStateData.length) {
                setData(BrandStateData.filter(x => x.active))
            }
        })()
    }, [BrandStateData.length])
    return (
        <>
            <section id="clients" className="clients section light-background">
                <div className="container" data-aos="fade-up">
                    <Swiper {...sliderOptions}>
                        <div className="gy-4">
                            {
                                data.map((item, index) => {
                                    return <SwiperSlide key={index}>
                                        <Link className="" to={`/shop?${title === "Maincategory" ? "mc" : title === "Subcategory" ? "sc" : "br"}=${item.name}`}>
                                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} height={title === "Brand" ? 100 : 200} className="w-100" alt="" />
                                            <h5 className='text-center p-2'>{item.name}</h5>
                                        </Link>
                                    </SwiperSlide>
                                })
                            }
                        </div>
                    </Swiper>
                </div>
            </section>
        </>
    )
}
