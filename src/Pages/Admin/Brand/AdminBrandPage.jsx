import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'


import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import { getBrand, deleteBrand } from "../../../Redux/ActionCreators/BrandActionCreators"
export default function AdminBrandPage() {
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete that Record")) {
            dispatch(deleteBrand({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getBrand())
        let time = setTimeout(() => {
            $('#myTable').DataTable()
        }, 300)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [BrandStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>Brand <Link to="/admin/brand/create" className='float-end'><i className='fa fa-plus text-light'></i></Link></h5>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Pic</th>
                                        <th>Active</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        BrandStateData && BrandStateData.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <Link to={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${item.pic}`} height={80} width={100} alt="" />
                                                    </Link>
                                                </td>
                                                <td>{item.active ? "Yes" : "No"}</td>
                                                <td><Link to={`/admin/brand/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link></td>
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
