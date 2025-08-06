import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Testimonial from '../Components/Testimonial'
import Facts from '../Components/Facts'

export default function TestimonialPage() {
    return (
        <>
            <Breadcrum title="Testimonial" />
            <Facts/>
            <Testimonial />
        </>
    )
}
