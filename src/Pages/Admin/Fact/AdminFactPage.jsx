import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'


import { getFact } from "../../../Redux/ActionCreators/FactActionCreators"
export default function AdminFactPage() {
    let [data, setData] = useState({})
    let FactStateData = useSelector(state => state.FactStateData)
    let dispatch = useDispatch()

    function getAPIData() {
        dispatch(getFact())
    }
    useEffect(() => {
        getAPIData()
        if (FactStateData.length) {
            setData({ ...FactStateData[0] })
        }
    }, [FactStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>Fact <Link to="/admin/fact/edit" className='float-end'><i className='fa fa-edit text-light'></i></Link></h5>
                        <table className='table table-bordered table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Happy Customers</th>
                                    <td>{data.customers ? data.customers : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Products</th>
                                    <td>{data.products ? data.products : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Discount</th>
                                    <td>{data.discount ? data.discount : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Top Brands</th>
                                    <td>{data.brands ? data.brands : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{data.address ? data.address : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td>{data.phone ? data.phone : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Email Address</th>
                                    <td>{data.email ? data.email : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>WhatsApp</th>
                                    <td>{data.whatsapp ? data.whatsapp : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Twitter Profile Page URL</th>
                                    <td>{data.twitter ? <Link to={data.twitter}>data.twitter</Link> : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Facebook Profile Page URL</th>
                                    <td>{data.facebook ? <Link to={data.facebook}>data.facebook</Link> : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Instagram Profile Page URL</th>
                                    <td>{data.instagram ? <Link to={data.instagram}>data.instagram</Link> : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Linkedin Profile Page URL</th>
                                    <td>{data.linkedin ? <Link to={data.linkedin}>data.linkedin</Link> : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Youtube Profile Page URL</th>
                                    <td>{data.youtube ? <Link to={data.youtube}>data.youtube</Link> : "N/A"}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <Link to="/admin/fact/edit" className='btn btn-secondary w-100'>Update Records</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}
