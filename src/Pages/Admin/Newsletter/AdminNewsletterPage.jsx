import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'


import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import { getNewsletter, deleteNewsletter, updateNewsletter } from "../../../Redux/ActionCreators/NewsletterActionCreators"
export default function AdminNewsletterPage() {
    let [data, setData] = useState([])
    let [flag, setFlag] = useState(false)

    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete that Record")) {
            dispatch(deleteNewsletter({ id: id }))
            getAPIData()
        }
    }

    function updateRecord(id) {
        if (window.confirm("Are You Sure to Update Status of that Record")) {
            let item = NewsletterStateData.find(x => x.id === id)
            let index = NewsletterStateData.findIndex(x => x.id === id)
            dispatch(updateNewsletter({ ...item, active: !item.active }))
            data[index].active = !item.active
            setFlag(!flag)
        }
    }

    function getAPIData() {
        dispatch(getNewsletter())
        if (NewsletterStateData.length)
            setData(NewsletterStateData)
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
    }, [NewsletterStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>Newsletter</h5>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Email</th>
                                        <th>Active</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td onClick={() => updateRecord(item.id)} style={{ cursor: "pointer" }}>{item.active ? "Yes" : "No"}</td>
                                                <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button> : null}</td>
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
