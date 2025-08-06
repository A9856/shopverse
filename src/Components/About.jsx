import React from 'react'

export default function About() {
    return (
        <>
            <section id="about" className="about section">

                <div className="container">

                    <div className="row gy-4">
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                            <h3>Where Style Meets Authenticity</h3>
                            <img src="assets/img/banner/banner5.jpg" className="img-fluid rounded-4 mb-4" alt="" />
                            <p>Welcome to {process.env.REACT_APP_SITE_NAME}—your ultimate destination for premium branded clothing at unbeatable value. We are passionate about fashion and committed to bringing you the finest apparel from top global brands like Nike, Adidas, Puma, Mufti, and more, all in one stylish space.</p>
                            <p>At {process.env.REACT_APP_SITE_NAME}, we believe clothing is more than just fabric—it's a way to express who you are. That’s why we curate collections that blend quality, comfort, and trendsetting style for men, women, and kids. Whether you're dressing for a workout, a party, or just a cozy day out, we’ve got the perfect look waiting for you.</p>
                        </div>
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="250">
                            <div className="content ps-0 ps-lg-5">
                                <p className="fst-italic">
                                    We take pride in:
                                </p>
                                <ul>
                                    <li><i className="bi bi-check-circle-fill"></i> <span>Offering 100% authentic products sourced from trusted distributors</span></li>
                                    <li><i className="bi bi-check-circle-fill"></i> <span>Ensuring a secure shopping experience with easy payments & hassle-free returns</span></li>
                                    <li><i className="bi bi-check-circle-fill"></i> <span>Providing free shipping and real-time tracking across the globe</span></li>
                                    <li><i className="bi bi-check-circle-fill"></i> <span>Delivering personalized recommendations to help you shop smarter</span></li>
                                </ul>
                                <p>
                                    With {process.env.REACT_APP_SITE_NAME}, fashion is not just accessible—it’s personal, reliable, and exciting. Join our fashion community today and experience the future of online shopping.
                                </p>

                                <div className="position-relative mt-4">
                                    <img src="assets/img/banner/banner10.jpg" className="img-fluid rounded-4" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}
