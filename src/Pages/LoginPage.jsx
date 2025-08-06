import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import Breadcrum from '../Components/Breadcrum'

export default function LoginPage() {
    let [data, setData] = useState({
        username: "",
        password: ""
    })

    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage("")
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        let user = response.find(x => (x.username?.toLowerCase() === data.username?.toLowerCase() || x.email?.toLowerCase() === data.username?.toLowerCase()) && x.password === data.password)
        if (user) {
            if (user.active) {
                localStorage.setItem("login", true)
                localStorage.setItem("name", user.name)
                localStorage.setItem("userid", user.id)
                localStorage.setItem("role", user.role)
                if (user.role === "Buyer")
                    navigate("/profile")
                else
                    navigate("/admin")
            }
            else
                setErrorMessage("Your Account is Block Due to Some Un-authorized Activity, Plases Contact Us to Un Block Your Account")
        }
        else
            setErrorMessage("Invalid Username or Password")
    }
    return (
        <>
            <Breadcrum title="Login :- to Access Your Account" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-11 m-auto">
                        <h5 className='bg-secondary w-100 p-2 text-center text-light'>Login :- to Access Your Account</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <input type="text" name="username" onChange={getInputData} placeholder='Username or Email Address' className={`form-control border-3 ${errorMessage ? 'border-danger' : 'border-secondary'}`} />
                                {errorMessage ? <p className='text-danger text-capitalize'>{errorMessage}</p> : null}
                            </div>

                            <div className="mb-3">
                                <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`form-control border-3 ${errorMessage ? 'border-danger' : 'border-secondary'}`} autoComplete='new-password' />
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-secondary w-100'>Login</button>
                            </div>
                        </form>

                        <div className='d-flex justify-content-between'>
                            <Link to="#">Forget Password?</Link>
                            <Link to="/signup">Doesn't Have an Account? Signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
