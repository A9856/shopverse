import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Facts from '../Components/Facts'
import Testimonial from '../Components/Testimonial'
import Features from '../Components/Features'

export default function FeaturesPage() {
    return (
        <>
            <Breadcrum title="Features" />
            <Features/>
            <Facts />
            <Testimonial />
        </>
    )
}
