import React from 'react'
import About from '../Components/About'
import Breadcrum from '../Components/Breadcrum'
import Facts from '../Components/Facts'
import Services from '../Components/Services'
import Testimonial from '../Components/Testimonial'
import Features from '../Components/Features'

export default function AboutPage() {
    return (
        <>
            <Breadcrum title="About Us" />
            <About />
            <Features/>
            <Facts />
            <Services />
            <Testimonial />
        </>
    )
}
