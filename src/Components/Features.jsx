import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getFeature } from "../Redux/ActionCreators/FeatureActionCreators"
export default function Features() {
    let [selectedIndex, setSelectedIndex] = useState(0)
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getFeature())
        })()
    }, [FeatureStateData.length])
    return (
        <>
            <section id="features" className="features section">

                <div className="container">

                    <ul className="nav nav-tabs row  d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
                        {
                            FeatureStateData.map((item, index) => {
                                return <li className="nav-item col-3 mb-3" key={item.id}>
                                    <a className="nav-link active show" data-bs-toggle="tab" onClick={() => setSelectedIndex(index)}>
                                        <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                                        <h4 className="d-none d-lg-block">{item.name}</h4>
                                    </a>
                                </li>
                            })
                        }
                    </ul>

                    <div className="tab-content" data-aos="fade-up" data-aos-delay="200">

                        {
                            FeatureStateData.map((item, index) => {
                                return <div className={`tab-pane fade show ${index === selectedIndex ? "active" : ""}`} key={item.id}>
                                    <div className="row">
                                        <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                                            <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                        </div>
                                        <div className="col-lg-6 order-1 order-lg-2 text-center">
                                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} alt="" className="img-fluid" />
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
