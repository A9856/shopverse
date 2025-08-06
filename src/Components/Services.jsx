import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getService } from "../Redux/ActionCreators/ServiceActionCreators"
export default function Services() {
    let ServiceStateData = useSelector(state => state.ServiceStateData)
    let dispatch = useDispatch()
    useEffect(() => {
        (() => {
            dispatch(getService())
        })()
    }, [ServiceStateData.length])
    return (
        <>
            <section id="services" className="services section">

                <div className="container section-title" data-aos="fade-up">
                    <h2>Our Services</h2>
                </div>

                <div className="container" data-aos="fade-up" data-aos-delay="100">

                    <div className="row gy-5">
                        {
                            ServiceStateData.map((item, index) => {
                                return <div className="col-xl-4 col-md-6" key={index} data-aos="zoom-in" data-aos-delay="200">
                                    <div className="service-item">
                                        <div className="img">
                                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} className="img-fluid" alt="" />
                                        </div>
                                        <div className="details position-relative">
                                            <div className="icon">
                                                <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                                            </div>
                                            <div className="stretched-link">
                                                <h3>{item.name}</h3>
                                            </div>
                                            <p className="service-description">{item.description}</p>
                                        </div>
                                    </div>
                                </div>

                            })
                        }
                    </div>

                </div>

            </section>
        </>
    )
}
