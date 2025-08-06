import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'


import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import { getCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"
export default function AdminCheckoutPage() {
    let [data, setData] = useState([])

    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()

    function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length)
            setData(CheckoutStateData)
        else
            setData([])
        let time = setTimeout(() => {
            $('#myTable').DataTable()
        }, 300)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
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
                            <table id='myTable' className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>UserId</th>
                                        <th>Order Status</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Status</th>
                                        <th>Subtotal</th>
                                        <th>Shipping</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.user}</td>
                                                <td>{item.orderStatus}</td>
                                                <td>{item.paymentMode}</td>
                                                <td>{item.paymentStatus}</td>
                                                <td>&#8377;{item.subtotal}</td>
                                                <td>&#8377;{item.shipping}</td>
                                                <td>&#8377;{item.total}</td>
                                                <td>{new Date(item.date).toLocaleString()}</td>
                                                <td><Link className='btn btn-primary' to={`/admin/checkout/show/${item.id}`}><i className='fa fa-eye'></i></Link></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
