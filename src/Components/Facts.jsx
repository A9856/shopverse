import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';

import { getFact } from "../Redux/ActionCreators/FactActionCreators"
import { useEffect, useState } from 'react';
export default function Facts() {
    let [data, setData] = useState({
        customers: 1000,
        products: 100,
        discount: 90,
        brands: 20
    })
    let FactStateData = useSelector(state => state.FactStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getFact())
            if (FactStateData.length) {
                setData({
                    customers: FactStateData[0].customers,
                    products: FactStateData[0].products,
                    discount: FactStateData[0].discount,
                    brands: FactStateData[0].brands
                })
            }
        })()
    }, [FactStateData.length])
    return (
        <>
            <section id="stats" className="stats section light-background">

                <div className="container" data-aos="fade-up" data-aos-delay="100">

                    <div className="row gy-4">

                        <div className="col-lg-3 col-md-6">
                            <div className="stats-item d-flex align-items-center w-100 h-100">
                                <i className="bi bi-emoji-smile color-blue flex-shrink-0"></i>
                                <div>
                                    <CountUp start={0} end={data.customers} duration={2} />
                                    <p>Happy Customers</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="stats-item d-flex align-items-center w-100 h-100">
                                <i className="bi bi-journal-richtext color-orange flex-shrink-0"></i>
                                <div>
                                    <CountUp start={0} end={data.products} duration={2} />
                                    <p>Product</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="stats-item d-flex align-items-center w-100 h-100">
                                <i className="bi bi-percent color-green flex-shrink-0"></i>
                                <div>
                                    <CountUp start={0} end={data.discount} duration={2} />
                                    <p>Discount*</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="stats-item d-flex align-items-center w-100 h-100">
                                <i className="bi bi-check color-pink flex-shrink-0"></i>
                                <div>
                                    <CountUp start={0} end={data.brands} duration={2} />
                                    <p>Brands</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </>
    )
}
