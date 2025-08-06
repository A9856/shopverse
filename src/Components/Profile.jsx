import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Profile({ title }) {
    let [user, setUser] = useState({})
    let navigate = useNavigate()
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
                setUser(user)
            else
                navigate("/login")
        })()
    }, [])
    return (
        <>
            <div className="row">
                <div className={title === "Checkout" ? "d-none" : "col-md-6"}>
                    {
                        user.pic ?
                            <img src={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${user.pic}`} className='w-100' height={470} alt="" /> :
                            <img src="/assets/img/nouser.png" className='w-100' height={400} alt="" />
                    }
                </div>
                <div className={title === "Checkout" ? "col-12" : "col-md-6"}>
                    <h5 className='bg-secondary p-2 text-center text-light'>{title === "Checkout" ? "Billing Address" : title}</h5>
                    <div className="table-responsive">
                        <table className='table table-bordered table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th>User Name</th>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>{user.role}</td>
                                </tr>
                                {
                                    title === "Buyer Profile" || title === "Checkout" ?
                                        <>
                                            <tr>
                                                <th>Address</th>
                                                <td>{user.address}</td>
                                            </tr>
                                            <tr>
                                                <th>Pin</th>
                                                <td>{user.pin}</td>
                                            </tr>
                                            <tr>
                                                <th>City</th>
                                                <td>{user.city}</td>
                                            </tr>
                                            <tr>
                                                <th>State</th>
                                                <td>{user.state}</td>
                                            </tr>
                                        </> : null
                                }
                                <tr>
                                    <td colSpan={2}><Link to="/update-profile" className='btn btn-secondary w-100'>Update Profile</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
