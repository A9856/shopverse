import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Breadcrum from '../Components/Breadcrum'
import FormValidator from "../FormValidators/FormValidator"

import { getFact } from "../Redux/ActionCreators/FactActionCreators"
import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"


export default function ContactUsPage() {
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        email: "Email Field is Mendatory",
        phone: "Phone Field is Mendatory",
        subject: "Subject Field is Mendatory",
        message: "Message Field is Mendatory"
    })
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    let [factData, setFactData] = useState({
        address: "",
        phone: "",
        whatsapp: "",
        email: ""
    })
    let FactStateData = useSelector(state => state.FactStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setShow(false)
        setMessage("")
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
            }
        })

        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({ ...data, active: true, date: new Date() }))
            setData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            })
            setErrorMessage({
                name: "Name Field is Mendatory",
                email: "Email Field is Mendatory",
                phone: "Phone Field is Mendatory",
                subject: "Subject Field is Mendatory",
                message: "Message Field is Mendatory"
            })
            setMessage("Thanks to Share Your Query With Us. Our Team Will Contact You Soon..")
        }
    }


    useEffect(() => {
        (() => {
            dispatch(getFact())
            if (FactStateData.length) {
                setFactData({
                    address: FactStateData[0].address ?? process.env.REACT_APP_ADDRESS,
                    phone: FactStateData[0].phone ?? process.env.REACT_APP_PHONE,
                    whatsapp: FactStateData[0].whatsapp ?? process.env.REACT_APP_WHATSAPP,
                    email: FactStateData[0].email ?? process.env.REACT_APP_EMAIL
                })
            }
        })()
    }, [FactStateData.length])
    return (
        <>
            <Breadcrum title="Contact Us" />
            <section id="contact" className="contact section">

                <div className="container section-title" data-aos="fade-up">
                    <h2>Contact</h2>
                    <p>Do You Have Any Query?</p>
                </div>

                <div className="container" data-aos="fade-up" data-aos-delay="100">

                    <div className="row gy-4">
                        <div className="col-lg-6 ">
                            <div className="row gy-4">

                                <div className="col-md-6">
                                    <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                                        <i className="bi bi-geo-alt-fill"></i>
                                        <h3>Address</h3>
                                        <p>{factData.address}</p>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                                        <i className="bi bi-envelope"></i>
                                        <h3>Email Us</h3>
                                        <Link to={`mailto:${factData.email}`} target='_blank' rel='noreferrer'>{factData.email}</Link>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                                        <i className="bi bi-telephone"></i>
                                        <h3>Call Us</h3>
                                        <Link to={`tel:${factData.phone}`} target='_blank' rel='noreferrer'>{factData.phone}</Link>
                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                                        <i className="bi bi-whatsapp"></i>
                                        <h3>WhatsApp</h3>
                                        <Link to={`https://wa.me/${factData.whatsapp}`} target='_blank' rel='noreferrer'>{factData.whatsapp}</Link>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-lg-6">
                            {message ? <p className='text-success text-center'>{message}</p> : null}
                            <form className="" onSubmit={postData}>
                                <div className="row gy-4">

                                    <div className="col-md-12">
                                        <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control border-3 ${show && errorMessage.name ? "border-danger" : "border-secondary"}`} placeholder="Your Name" required="" />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>

                                    <div className="col-md-6 ">
                                        <input type="email" value={data.email} onChange={getInputData} className={`form-control border-3 ${show && errorMessage.email ? "border-danger" : "border-secondary"}`} name="email" placeholder="Your Email" required="" />
                                        {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                    </div>

                                    <div className="col-md-6">
                                        <input type="text" name="phone" value={data.phone} onChange={getInputData} className={`form-control border-3 ${show && errorMessage.phone ? "border-danger" : "border-secondary"}`} placeholder="Your Phone Number" required="" />
                                        {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                    </div>

                                    <div className="col-md-12">
                                        <input type="text" name="subject" value={data.subject} onChange={getInputData} className={`form-control border-3 ${show && errorMessage.subject ? "border-danger" : "border-secondary"}`} placeholder="Subject" required="" />
                                        {show && errorMessage.subject ? <p className='text-danger'>{errorMessage.subject}</p> : null}

                                    </div>

                                    <div className="col-md-12">
                                        <textarea className={`form-control border-3 ${show && errorMessage.message ? "border-danger" : "border-secondary"}`} name="message" value={data.message} onChange={getInputData} rows="4" placeholder="Message" required=""></textarea>
                                        {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : null}
                                    </div>

                                    <div className="col-md-12 text-center">
                                        <button type="submit" className='btn btn-secondary w-100'>Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                   <div className='mt-3'>
                     <iframe width="100%" height="300" id="gmap_canvas" src="https://maps.google.com/maps?q=DUCAT%20Noida%20Sector%2016&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>

                   </div>
                </div>

            </section>
        </>
    )
}
