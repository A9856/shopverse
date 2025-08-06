import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import { Link } from 'react-router-dom'

export default function OrderConfirmation() {
    return (
        <>
            <Breadcrum title="Order Has Been Placed" />
            <div className="container my-3">
                <div className="my-5 text-center">
                    <h3>Thank You</h3>
                    <h4>Your Order Has Been Placed</h4>
                    <h5>Now You Can Track Your Order in Profile Page</h5>
                    <div className="btn-group w-50">
                        <Link className="w-50 btn btn-secondary" to="/profile">Profile</Link>
                        <Link className="w-50 btn btn-primary" to="/shop">Shop More</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
