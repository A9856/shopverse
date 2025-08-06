import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'


import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import { getUser, deleteUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"
export default function AdminUserPage() {
    let [data, setData] = useState([])
    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()
    let [flag, setFlag] = useState(false)

    function updateRecord(id) {
        if (window.confirm("Are You Sure to Update Status of that Record")) {
            let item = UserStateData.find(x => x.id === id)
            let index = UserStateData.findIndex(x => x.id === id)
            dispatch(updateUser({ ...item, active: !item.active }))
            data[index].active = !item.active
            setFlag(!flag)
        }
    }

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete that Record")) {
            dispatch(deleteUser({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getUser())
        if (UserStateData.length)
            setData(UserStateData)
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
    }, [UserStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>User <Link to="/admin/user/create" className='float-end'><i className='fa fa-plus text-light'></i></Link></h5>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>Active</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.role}</td>
                                                <td style={{ cursor: "pointer" }} onClick={() => updateRecord(item.id)}>{item.active ? "Yes" : "No"}</td>
                                                <td>{item.role === "Buyer" ? null : <Link to={`/admin/user/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link>}</td>
                                                <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
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
