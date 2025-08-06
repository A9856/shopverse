import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import { getCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"
import Cart from '../../../Components/Cart';
export default function AdminCheckoutShowPage() {
    let [user, setUser] = useState({})
    let { id } = useParams()
    let [data, setData] = useState({})
    let [flag, setFlag] = useState(false)
    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")

    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function updateRecord() {
        if (window.confirm("Are You Sure to Update Status of that Record")) {
            data.orderStatus = orderStatus
            data.paymentStatus = paymentStatus
            dispatch(updateCheckout({ ...data }))
            setFlag(!flag)
        }
    }

    async function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            let item = CheckoutStateData.find(x => x.id === id)
            if (item) {
                setData(item)
                setOrderStatus(item.orderStatus)
                setPaymentStatus(item.paymentStatus)
                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/${item.user}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                response = await response.json()
                setUser(response)
            }
            else
                navigate("/admin/checkout")
        }
    }
    useEffect(() => {
        getAPIData()
    }, [CheckoutStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>Checkout</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered table-striped table-hover'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>User</th>
                                        <td>
                                            {user.name}<br />
                                            {user.email}, {user.phone},<br />
                                            {user.address},<br />
                                            {user.pin}, {user.city}, {user.state}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderStatus}
                                            {data.orderStatus !== "Delivered" ?
                                                <select className='form-select border-primary mt-3' onChange={(e) => setOrderStatus(e.target.value)}>
                                                    <option>Order is Placed</option>
                                                    <option>Order is Packed</option>
                                                    <option>Order is Ready to Ship</option>
                                                    <option>Order is Shipped</option>
                                                    <option>Order is in Transit</option>
                                                    <option>Order is Reached at the Final Delivery Station</option>
                                                    <option>Order is Out for Delivery</option>
                                                    <option>Delivered</option>
                                                </select> : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentStatus}
                                            {data.paymentStatus !== "Done" ?
                                                <select className='form-select border-primary mt-3' onChange={(e) => setPaymentStatus(e.target.value)}>
                                                    <option>Pending</option>
                                                    <option>Done</option>
                                                </select> : null}</td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid ?? "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.orderStatus !== "Delivered" || data.paymentStatus === "Pending" ?
                                                    <button className='btn btn-primary w-100' onClick={updateRecord}>Update Status</button> : null
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {
                            data.products ?
                                <Cart title="Orders" data={data.products} /> : null
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
