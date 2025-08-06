import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import Breadcrum from '../Components/Breadcrum'
import FormValidator from '../FormValidators/FormValidator'
import ImageValidator from '../FormValidators/ImageValidator'

export default function UpdateProfilePage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: "",
        pic: ""
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        pic: "",
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? "product/" + e.target.files[0].name : e.target.value
        // var value = e.target.files && e.target.files.length ? e.target.files[0] : e.target.value

        setShow(false)
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
            }
        })

        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let user = response.find(x => x.id !== localStorage.getItem("userid") && (x.username?.toLowerCase() === data.username?.toLowerCase() || x.email?.toLowerCase() === data.email?.toLowerCase()))
            if (user) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'username': user.username?.toLowerCase() === data.username?.toLowerCase() ? "Username Already Taken" : "",
                        'email': user.email?.toLowerCase() === data.email?.toLowerCase() ? "Email Address is Already Taken" : "",
                    }
                })
                return
            }
            response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/${data.id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })

            response = await response.json()
            if (response) {
                if (data.role === "Buyer")
                    navigate("/profile")
                else
                    navigate("/admin")
            }
            else
                alert("Something Went Wrong")
        }
    }

    useEffect(() => {
        (async () => {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let user = response.find(x => x.id === localStorage.getItem("userid"))
            if (user)
                setData({ ...data, ...user })
            else
                navigate("/login")
        })()
    }, [])
    return (
        <>
            <Breadcrum title="Update Your Profile" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-11 m-auto">
                        <h5 className='bg-secondary w-100 p-2 text-center text-light'>Update Your Profile</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger text-capitalize'>{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="text" name="username" value={data.username} onChange={getInputData} placeholder='Username' className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.username ? <p className='text-danger text-capitalize'>{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="email" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-secondary'}`} autoComplete='new-password' />
                                    {show && errorMessage.email ? <p className='text-danger text-capitalize'>{errorMessage.email}</p> : null}
                                </div>

                                <div className="mb-3">
                                    <textarea name="address" value={data.address} onChange={getInputData} placeholder='Address' className='form-control border-3 border-secondary' rows={3}></textarea>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="text" name="city" value={data.city} placeholder='City Name' onChange={getInputData} className='form-control border-3 border-secondary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="state" value={data.state} placeholder='State Name' onChange={getInputData} className='form-control border-3 border-secondary' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="text" name="pin" value={data.pin} placeholder='Pin Code' onChange={getInputData} className='form-control border-3 border-secondary' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="file" name="pic" onChange={getInputData} className='form-control border-3 border-secondary' />
                                </div>

                                <div className="mb-3">
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
