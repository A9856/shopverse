import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../FormValidators/FormValidator'
import ImageValidator from '../../../FormValidators/ImageValidator'


import { getService, updateService } from "../../../Redux/ActionCreators/ServiceActionCreators"
export default function AdminUpdateServicePage() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        pic: "",
        icon: "",
        description: "",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: "",
        icon: "",
        description: ""
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let ServiceStateData = useSelector(state => state.ServiceStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? "service/" + e.target.files[0].name : e.target.value
        // var value = e.target.files && e.target.files.length ? e.target.files[0] : e.target.value

        setErrorMessage((old) => {
            return {
                ...old,
                [name]: e.target.files ? ImageValidator(e) : FormValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = ServiceStateData.find(x => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setErrorMessage((old) => {
                    return {
                        ...old,
                        "name": "Service Already Exist with Same Name"
                    }
                })
                setShow(true)
            }
            else {
                dispatch(updateService({ ...data }))

                // let formData = new FormData()
                // formData.append("_id", data._id)
                // formData.append("name", data.name)
                // formData.append("pic", data.pic)
                // formData.append("icon", data.icon)
                // formData.append("description", data.description)
                // formData.append("active", data.active)
                // dispatch(createService(formData))
                navigate("/admin/service")
            }
        }
    }


    useEffect(() => {
        (() => {
            dispatch(getService())
            if (ServiceStateData.length) {
                let item = ServiceStateData.find(x => x.id === id)
                if (item)
                    setData({ ...item })
                else
                    navigate("/admin/Service")
            }
        })()
    }, [ServiceStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>Update Service <Link to="/admin/service" className='float-end'><i className='fa fa-long-arrow-left text-light'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Service Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-6 mb-3">
                                    <label>Icon*</label>
                                    <input type="text" name="icon" value={data.icon} onChange={getInputData} placeholder='Service Icon Tag' className={`form-control border-3 ${show && errorMessage.icon ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
                                </div>


                                <div className='col-12 mb-3'>
                                    <label>Description*</label>
                                    <textarea name="description" value={data.description} onChange={getInputData} placeholder='Description' className={`form-control border-3 ${show && errorMessage.description ? 'border-danger' : 'border-secondary'}`} ></textarea>
                                    {show && errorMessage.description ? <p className='text-danger'>{errorMessage.description}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" onChange={getInputData} value={data.active ? "1" : "0"} className='form-select border-3 border-secondary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button type="submit" className='btn btn-secondary w-100'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
