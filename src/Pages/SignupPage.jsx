import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import Breadcrum from '../Components/Breadcrum'
import FormValidator from '../FormValidators/FormValidator'

export default function SignupPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Full Name Field Is Mendatory",
        username: "User Name Field Is Mendatory",
        email: "Email Address Field Is Mendatory",
        phone: "Phone Numnber Field Is Mendatory",
        password: "Password Field Is Mendatory",
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target

        setShow(false)
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
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
        if (data.password === data.cpassword) {
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
                let user = response.find(x=>x.username?.toLowerCase()===data.username?.toLowerCase() || x.email?.toLowerCase()===data.email?.toLowerCase() )
                if(user){
                    setShow(true)
                    setErrorMessage((old)=>{
                        return{
                            ...old,
                            'username':user.username?.toLowerCase()===data.username?.toLowerCase()?"Username Already Taken":"",
                            'email':user.email?.toLowerCase()===data.email?.toLowerCase()?"Email Address is Already Taken":"",
                        }
                    })
                    return
                }
                response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer",
                        active: true
                    })
                })

                response = await response.json()
                if (response)
                    navigate("/login")
                else
                    alert("Something Went Wrong")
            }
        }
        else {
            setShow(true)
            setErrorMessage((old) => {
                return {
                    ...old,
                    'password': 'Password and Confirm Passwors Does not Matched'
                }
            })
        }
    }
    return (
        <>
            <Breadcrum title="Signup! Create Your Free Account" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-11 m-auto">
                        <h5 className='bg-secondary w-100 p-2 text-center text-light'>Signup! Create Your Free Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger text-capitalize'>{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="text" name="username" onChange={getInputData} placeholder='Username' className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.username ? <p className='text-danger text-capitalize'>{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-secondary'}`} autoComplete='new-password' />
                                    {show && errorMessage.email ? <p className='text-danger text-capitalize'>{errorMessage.email}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-secondary'}`} autoComplete='new-password' />
                                    {show && errorMessage.password ? <p className='text-danger text-capitalize'>{errorMessage.password}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-secondary'}`} />
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className='btn btn-secondary w-100'>Signup</button>
                                </div>
                            </div>
                        </form>
                         <Link to="/login">Already Have an Account? Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
