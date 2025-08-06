import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'


import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators"
export default function AdminContactUsPage() {
    let [data, setData] = useState([])
    let [flag, setFlag] = useState(false)

    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete that Record")) {
            dispatch(deleteContactUs({ id: id }))
            getAPIData()
        }
    }

    function updateRecord(id) {
        if (window.confirm("Are You Sure to Update Status of that Record")) {
            let item = ContactUsStateData.find(x => x.id === id)
            let index = ContactUsStateData.findIndex(x => x.id === id)
            dispatch(updateContactUs({ ...item, active: !item.active }))
            data[index].active = !item.active
            setFlag(!flag)
        }
    }

    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length)
            setData(ContactUsStateData)
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
    }, [ContactUsStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>ContactUs</h5>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Active</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.subject}</td>
                                                <td>{new Date(item.date).toLocaleString()}</td>
                                                <td onClick={() => updateRecord(item.id)} style={{ cursor: "pointer" }}>{item.active ? "Yes" : "No"}</td>
                                                <td><Link className='btn btn-primary' to={`/admin/contactus/show/${item.id}`}><i className='fa fa-eye'></i></Link></td>
                                                <td>{localStorage.getItem("role") !== "Super Admin" || item.active ? null : <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button>}</td>
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
