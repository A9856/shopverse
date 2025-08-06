import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Products({ products, maincategories }) {
    let [data, setData] = useState(products)
    let [selected, setSelected] = useState("")

    useEffect(() => {
        if (selected === "")
            setData(products)
        else
            setData(products.filter(x => x.maincategory === selected))
    }, [selected])
    return (
        <>
            <section id="portfolio" className="portfolio section">

                <div className="container section-title" data-aos="fade-up">
                    <h2>Latest Products</h2>
                    <p>CHECK OUR Products</p>
                </div>

                <div className="container">

                    <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

                        <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
                            <li className={selected === "" ? "filter-active" : ""} onClick={() => setSelected("")}>All</li>
                            {
                                maincategories.map(item => {
                                    return <li className={selected === item.name ? "filter-active" : ""} key={item.id} onClick={() => setSelected(item.name)}>{item.name}</li>
                                })
                            }
                        </ul>

                        <div className="row gy-4 isotope-container">
                            {
                                data?.slice(0, 12)?.map(item => {
                                    return <div key={item.id} className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                                        <div className="portfolio-content h-100">
                                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic[0]}`} style={{ height: 250 }} className="w-100" alt="" />
                                            <div className="portfolio-info">
                                                <h4>{item.brand}</h4>
                                                <p className='text-center'><del className='text-danger'>&#8377;{item.basePrice}</del> <span className='fs-5'>&#8377;{item.finalPrice}</span> <sup>{item.discount}% off</sup></p>
                                                <Link to={`/product/${item.id}`} title="More Details" className="details-link"><i className="fa fa-shopping-cart"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}
