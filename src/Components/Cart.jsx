import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { getCart, deleteCart, updateCart } from "../Redux/ActionCreators/CartActionCreators"
import { createCheckout } from "../Redux/ActionCreators/CheckoutActionCreators"
import { getProduct, updateProduct } from "../Redux/ActionCreators/ProductActionCreators"
export default function Cart({ title, data }) {
    let [mode, setMode] = useState("COD")
    let [cart, setCart] = useState(data ?? [])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    function placeOrder() {
        let item = {
            user: localStorage.getItem("userid"),
            orderStatus: "Order is Placed",
            paymentMode: mode,
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: cart
        }
        dispatch(createCheckout(item))
        cart.forEach(x => {
            let p = ProductStateData.find(pr => pr.id === x.product)
            p['stockQuantity'] = p['stockQuantity'] - x.qty
            p['stock'] = p['stockQuantity'] === 0 ? false : true
            dispatch(updateProduct(p))
            dispatch(deleteCart({ id: x.id }))
        })

        navigate("/order-confirmation")
    }

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Remove Item from Cart")) {
            dispatch(deleteCart({ id: id }))
            getAPIData()
        }
    }

    function updateRecord(id, option) {
        let item = cart.find(x => x.id === id)
        let index = cart.findIndex(x => x.id === id)

        if ((option === "DEC" && item.qty === 1) || (option === "INC" && item.qty === item.stockQuantity))
            return
        else if (option === "DEC") {
            item['qty'] = item['qty'] - 1
            item['total'] = item['total'] - item['price']
        }
        else if (option === "INC") {
            item['qty'] = item['qty'] + 1
            item['total'] = item['total'] + item['price']
        }
        dispatch(updateCart({ ...item }))
        cart[index] = { ...item }
        calculation(cart)
    }

    function calculation(cart) {
        let subtotal = 0
        cart.forEach(element => subtotal += element.total)
        if (subtotal > 0 && subtotal < 1000) {
            setShipping(150)
            setTotal(subtotal + 150)
        }
        else {
            setShipping(0)
            setTotal(subtotal)
        }
        setSubtotal(subtotal)
    }

    function getAPIData() {
        dispatch(getCart())
        if (data)
            calculation(data)
        else if (CartStateData.length) {
            let cart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
            setCart(cart)
            calculation(cart)
        }
        else {
            setCart([])
            calculation([])
        }
    }

    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])
    return (
        <>
            <h5 className='bg-secondary text-center text-light p-2'>{title==="Orders"?"Order Products":"Cart Section"}</h5>
            {
                cart.length ?
                    <>
                        <div className="table-responsive">
                            <table className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        {title === "Checkout" ? null : <th></th>}
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        {title === "Checkout" || title === "Orders" ? null : <th>Stock</th>}
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        {title === "Checkout" || title === "Orders" ? null : <th></th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map(item => {
                                            return <tr key={item.id}>
                                                {title === "Checkout" ? null : <td>
                                                    <Link to={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${item.pic}`} height={60} width={80} alt="" />
                                                    </Link>
                                                </td>}
                                                <td>{item.name}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                {title === "Checkout" || title === "Orders" ? null : <td>{item.stockQuantity ? `${item.stockQuantity} Left in Stock` : 'Out of Stock'}</td>}
                                                <td>&#8377;{item.price}</td>
                                                {title === "Checkout" || title === "Orders" ?
                                                    <td>{item.qty}</td> :
                                                    <td>
                                                        <div style={{ width: 120 }}></div>
                                                        <div className="btn-group w-100">
                                                            <button className='btn btn-secondary' onClick={() => updateRecord(item.id, "DEC")}><i className='fa fa-minus'></i></button>
                                                            <h4 className='w-50 text-center'>{item.qty}</h4>
                                                            <button className='btn btn-secondary' onClick={() => updateRecord(item.id, "INC")}><i className='fa fa-plus'></i></button>
                                                        </div>
                                                    </td>}
                                                <td>
                                                    <div style={{ width: 50 }}>&#8377;{item.total}</div>
                                                </td>
                                                {title === "Checkout" || title === "Orders" ? null : <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className={title === "Orders" ? "d-none" : "row"}>
                            <div className="col-md-6 mb-3"></div>
                            <div className={title === "Checkout" ? '' : "col-md-6 mb-3"}>
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>&#8377;{subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>&#8377;{shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>&#8377;{total}</td>
                                        </tr>
                                        {
                                            title === "Checkout" ?
                                                <tr>
                                                    <th>Payment Mode</th>
                                                    <td>
                                                        <select name="mode" onChange={(e) => setMode(e.target.value)} className='form-select border-3 border-secondary'>
                                                            <option value="COD">COD</option>
                                                            <option value="NetBanking" disabled>Net Banking/UPI/CARD</option>
                                                        </select>
                                                    </td>
                                                </tr> : null
                                        }
                                        <tr>
                                            <td colSpan={2}>
                                                {
                                                    title === "Cart" ?
                                                        <Link className='btn btn-secondary w-100' to="/checkout">Proceed to Checkout</Link> :
                                                        <button onClick={placeOrder} className='btn btn-secondary w-100'>Place Order</button>
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </> :
                    <div className="mb-3 text-center p-3">
                        <h4>No Items in Cart</h4>
                        <Link to="/shop" className='btn btn-secondary'>Shop Now</Link>
                    </div>
            }
        </>
    )
}
