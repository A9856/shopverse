import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
    return (
        <div className="list-group">
            <Link to="/admin" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-home fs-4'></i><span className='float-end'>Home</span></Link>
            <Link to="/admin/maincategory" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-list fs-4'></i><span className='float-end'>Maincategory</span></Link>
            <Link to="/admin/subcategory" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-list fs-4'></i><span className='float-end'>Subcategory</span></Link>
            <Link to="/admin/brand" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-list fs-4'></i><span className='float-end'>Brand</span></Link>
            <Link to="/admin/testimonial" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-star fs-4'></i><span className='float-end'>Testimonial</span></Link>
            <Link to="/admin/product" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-list fs-4'></i><span className='float-end'>Product</span></Link>
            {localStorage.getItem("role") === "Super Admin" ?
                <Link to="/admin/user" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-users fs-4'></i><span className='float-end'>User</span></Link> : null}
            <Link to="/admin/newsletter" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-envelope fs-4'></i><span className='float-end'>Newsletter</span></Link>
            <Link to="/admin/contactus" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-phone fs-4'></i><span className='float-end'>Contact Us</span></Link>
            <Link to="/admin/checkout" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-shopping-bag fs-4'></i><span className='float-end'>Checkout</span></Link>
            <Link to="/admin/service" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-wrench fs-4'></i><span className='float-end'>Services</span></Link>
            <Link to="/admin/feature" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-rocket fs-4'></i><span className='float-end'>Features</span></Link>
            <Link to="/admin/fact" className="bg-secondary p-2 text-light rounded mb-1" aria-current="true"><i className='fa fa-info-circle fs-4'></i><span className='float-end'>Facts</span></Link>
        </div>
    )
}
