import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getFact } from "../Redux/ActionCreators/FactActionCreators"
import { createNewsletter, getNewsletter } from "../Redux/ActionCreators/NewsletterActionCreators"
export default function Footer() {
  let [email, setEmail] = useState("")
  let [message, setMessage] = useState("")

  let NewsletterStateData = useSelector(state => state.NewsletterStateData)

  let [data, setData] = useState({
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: ""
  })
  let FactStateData = useSelector(state => state.FactStateData)
  let dispatch = useDispatch()

  function postData(e) {
    e.preventDefault()
    if (email) {
      let item = NewsletterStateData.find(x => x.email === email)
      if (!item) {
        dispatch(createNewsletter({ email: email, active: true }))
      }
      setMessage("Thanks to Subsctibe Our Newsletter Service")
      setEmail("")
    }
    else
      setMessage("Please Enter a valid Email Address")
  }


  useEffect(() => {
    (() => {
      dispatch(getFact())
      if (FactStateData.length) {
        setData({
          address: FactStateData[0].address ?? process.env.REACT_APP_ADDRESS,
          phone: FactStateData[0].phone ?? process.env.REACT_APP_PHONE,
          whatsapp: FactStateData[0].whatsapp ?? process.env.REACT_APP_WHATSAPP,
          email: FactStateData[0].email ?? process.env.REACT_APP_EMAIL,
          twitter: FactStateData[0].twitter ?? process.env.REACT_APP_TWITTER,
          facebook: FactStateData[0].facebook ?? process.env.REACT_APP_FACEBOOK,
          instagram: FactStateData[0].instagram ?? process.env.REACT_APP_INSTAGRAM,
          linkedin: FactStateData[0].linkedin ?? process.env.REACT_APP_LINKEDIN,
          youtube: FactStateData[0].youtube ?? process.env.REACT_APP_YOUTUBE
        })
      }
    })()
  }, [FactStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getNewsletter())
    })()
  }, [NewsletterStateData.length])
  return (
    <>
      <footer id="footer" className="footer dark-background">

        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to="/" className="logo d-flex align-items-center">
                <span className="sitename">{process.env.REACT_APP_SITE_NAME}</span>
              </Link>
              <div className="footer-contact">
                <p><i className='me-2 fs-5 bi bi-house'></i>{data.address}</p>
                <p className="mb-1"><i className='me-2 fs-5 bi bi-phone'></i><Link className='text-light' to={`tel:${process.env.REACT_APP_PHONE}`} target='_blank' rel='noreferrer'>{data.phone}</Link></p>
                <p className="mb-1"><i className='me-2 fs-5 bi bi-whatsapp'></i><Link className='text-light' to={`https://wa.me/${process.env.REACT_APP_WHATSAPP}`} target='_blank' rel='noreferrer'>{data.whatsapp}</Link></p>
                <p className="mb-1"><i className='me-2 fs-5 bi bi-envelope'></i><Link className='text-light' to={`mailto:${process.env.REACT_APP_EMAIL}`} target='_blank' rel='noreferrer'>{data.email}</Link></p>
              </div>
              <div className="social-links d-flex mt-4">
                <Link to={data.twitter} target='_blank' rel='noreferrer'><i className="bi bi-twitter-x"></i></Link>
                <Link to={data.facebook} target='_blank' rel='noreferrer'><i className="bi bi-facebook"></i></Link>
                <Link to={data.instagram} target='_blank' rel='noreferrer'><i className="bi bi-instagram"></i></Link>
                <Link to={data.linkedin} target='_blank' rel='noreferrer'><i className="bi bi-linkedin"></i></Link>
                <Link to={data.youtube} target='_blank' rel='noreferrer'><i className="bi bi-youtube"></i></Link>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bi bi-chevron-right"></i> <Link to="/">Home</Link></li>
                <li><i className="bi bi-chevron-right"></i> <Link to="/about">About us</Link></li>
                <li><i className="bi bi-chevron-right"></i> <Link to="/shop">Shop</Link></li>
                <li><i className="bi bi-chevron-right"></i> <Link to="/services">Services</Link></li>
                <li><i className="bi bi-chevron-right"></i> <Link to="/features">Features</Link></li>

              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bi bi-chevron-right"></i> <Link to="/testimonials">Testimonials</Link></li>
                <li><i className="bi bi-chevron-right"></i> <Link to="/contactus">ContactUs</Link></li>
                <li><i className="bi bi-chevron-right"></i> <Link to="#">Terms of service</Link></li>
                <li><i className="bi bi-chevron-right"></i> <Link to="#">Privacy policy</Link></li>
                <li><i className="bi bi-chevron-right"></i> <Link to="#">Refund policy</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>{message ? message : "Subscribe to our newsletter and receive the latest news about our products and services!"}</p>
              <form onSubmit={postData}>
                <div className="newsletter-form">
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input type="submit" value="Subscribe" />
                </div>
              </form>
            </div>

          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">{process.env.REACT_APP_SITE_NAME}</strong> <span>All Rights Reserved</span></p>
        </div>

      </footer>
    </>
  )
}
