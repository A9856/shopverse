import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Profile from '../Components/Profile'
import Cart from '../Components/Cart'

export default function CheckoutPage() {
  return (
  <>
    <Breadcrum title="Place Your Order"/>

    <div className="container-fluid mx-3 my-3">
        <div className="row">
            <div className="col-md-6 mb-3">
                <Profile title="Checkout"/>
            </div>
            <div className="col-md-6 mb-3">
                <Cart title="Checkout"/>
            </div>
        </div>
    </div>
  </>
  )
}
