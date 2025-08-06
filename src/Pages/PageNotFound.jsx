import React, { useEffect } from 'react'
import Breadcrum from '../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

export default function PageNotFound() {
    let navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem("login")) {
                if (localStorage.getItem("role") !== "Buyer" && window.location.pathname === "/admin") {
                    navigate(0)
                }
                else if (localStorage.getItem("role") === "Buyer" && window.location.pathname === "/profile") {
                    navigate(0)
                }
            }
        }, 500)
    }, [])
    return (
        <>
            <Breadcrum title="Page Not Found" />

            <div className="container-fluid bg-light">
                <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
                    <h1>OOPS!</h1>
                    <h4 className="text-primary display-4 mb-4">404! Page Not Found</h4>
                    <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active text-primary">404 Page</li>
                    </ol>
                </div>
            </div>
        </>
    )
}
