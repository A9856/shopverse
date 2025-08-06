import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Facts from '../Components/Facts'
import Services from '../Components/Services'
import Testimonial from '../Components/Testimonial'

export default function ServicesPage() {
    return (
        <>
            <Breadcrum title="Services" />
            <Services />
            <Facts />
            <Testimonial />
        </>
    )
}
