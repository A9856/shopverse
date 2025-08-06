import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'


import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

import { getFeature, deleteFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"
export default function AdminFeaturePage() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete that Record")) {
            dispatch(deleteFeature({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getFeature())
        let time = setTimeout(() => {
            $('#myTable').DataTable()
        }, 300)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [FeatureStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>Feature <Link to="/admin/feature/create" className='float-end'><i className='fa fa-plus text-light'></i></Link></h5>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Pic</th>
                                        <th>Icon</th>
                                        <th>Description</th>
                                        <th>Active</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        FeatureStateData && FeatureStateData.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <Link to={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${item.pic}`} height={80} width={100} alt="" />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                                                </td>
                                                <td>
                                                    <div className='table-description' dangerouslySetInnerHTML={{ __html: item.description }} />
                                                </td>
                                                <td>{item.active ? "Yes" : "No"}</td>
                                                <td><Link to={`/admin/feature/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link></td>
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
