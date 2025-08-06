import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../FormValidators/FormValidator'


import { getUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"
export default function AdminUpdateUserPage() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        active: true,
        role: "Admin"
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: ""
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        var { name, value } = e.target

        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
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
            let item = UserStateData.find(x => x.id !== data.id && (x.username.toLowerCase() === data.username.toLowerCase() || x.email.toLowerCase() === data.email.toLowerCase()))
            if (item) {
                setErrorMessage((old) => {
                    return {
                        ...old,
                        "username": item.username.toLowerCase() === data.username.toLocaleLowerCase() ? "User Name Already Taken" : "",
                        "email": item.email.toLowerCase() === data.email.toLocaleLowerCase() ? "User Email Address Already Taken" : "",
                    }
                })
                setShow(true)
            }
            else {
                dispatch(updateUser({ ...data }))
                navigate("/admin/user")
            }
        }
    }


    useEffect(() => {
        (() => {
            dispatch(getUser())
            if (UserStateData.length) {
                let item = UserStateData.find(x => x.id === id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/User")
            }
        })()
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
                        <h5 className='bg-secondary p-2 text-light text-center'>Update User <Link to="/admin/user" className='float-end'><i className='fa fa-long-arrow-left text-light'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Phone*</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone' className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>username*</label>
                                    <input type="text" name="username" value={data.username} onChange={getInputData} placeholder='User Name' className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Email*</label>
                                    <input type="text" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Role*</label>
                                    <select name="role" value={data.role} onChange={getInputData} className='form-select border-3 border-secondary'>
                                        <option>Admin</option>
                                        <option>Super Admin</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" value={data.active ? "1" : "0"} onChange={getInputData} className='form-select border-3 border-secondary'>
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
