import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../FormValidators/FormValidator'

import { getUser, createUser } from "../../../Redux/ActionCreators/UserActionCreators"
export default function AdminCreateUserPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        active: true,
        role: "Admin"
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        username: "Username Field is Mendatory",
        email: "Email Field is Mendatory",
        phone: "Phone Field is Mendatory",
        password: "Password Field is Mendatory",
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
        if (data.cpassword === data.cpassword) {
            let error = Object.values(errorMessage).find(x => x !== "")
            if (error)
                setShow(true)
            else {
                let item = UserStateData.find(x => x.username.toLowerCase() === data.username.toLowerCase() || x.email.toLowerCase() === data.email.toLowerCase())
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
                    dispatch(createUser({ ...data }))
                    navigate("/admin/user")
                }
            }
        }
        else {
            setShow(true)
            setErrorMessage((old) => {
                return {
                    ...old,
                    "password": "Password and Confirm Password Doesn't Matched"
                }
            })
        }
    }


    useEffect(() => {
        (() => {
            dispatch(getUser())
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
                        <h5 className='bg-secondary p-2 text-light text-center'>Create User <Link to="/admin/user" className='float-end'><i className='fa fa-long-arrow-left text-light'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Phone*</label>
                                    <input type="text" name="phone" onChange={getInputData} placeholder='Phone' className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>username*</label>
                                    <input type="text" name="username" onChange={getInputData} placeholder='User Name' className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Email*</label>
                                    <input type="text" name="email" onChange={getInputData} placeholder='Email Address' className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>


                                <div className="col-md-6 mb-3">
                                    <label>Password*</label>
                                    <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Confirm Password*</label>
                                    <input type="password" name="cpassword" onChange={getInputData} placeholder='Password' className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-secondary'}`} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Role*</label>
                                    <select name="role" onChange={getInputData} className='form-select border-3 border-secondary'>
                                        <option>Admin</option>
                                        <option>Super Admin</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" onChange={getInputData} className='form-select border-3 border-secondary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button type="submit" className='btn btn-secondary w-100'>Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
