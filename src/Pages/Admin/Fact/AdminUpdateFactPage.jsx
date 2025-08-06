import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import { createFact, getFact, updateFact } from "../../../Redux/ActionCreators/FactActionCreators"
export default function AdminUpdateFactPage() {
    let [data, setData] = useState({
        customers: "",
        products: "",
        discount: "",
        brands: "",
        address: "",
        phone: "",
        email: "",
        whatsapp: "",
        twitter: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        youtube: ""
    })
    let navigate = useNavigate()

    let FactStateData = useSelector(state => state.FactStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        if (FactStateData.length)
            dispatch(updateFact({ ...data }))
        else
            dispatch(createFact({ ...data }))
        navigate("/admin/fact")
    }


    useEffect(() => {
        (() => {
            dispatch(getFact())
            console.log(FactStateData)
            if (FactStateData.length) {
                setData({ ...FactStateData[0] })
            }
        })()
    }, [FactStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>Update Fact <Link to="/admin/fact" className='float-end'><i className='fa fa-long-arrow-left text-light'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Happy Customers</label>
                                    <input type="number" name="customers" value={data.customers} onChange={getInputData} placeholder='Happy Customers' className='form-control border-3 border-secondary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Products</label>
                                    <input type="number" name="products" value={data.products} onChange={getInputData} placeholder='Products' className='form-control border-3 border-secondary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Discount</label>
                                    <input type="number" name="discount" value={data.discount} onChange={getInputData} placeholder='Discount' className='form-control border-3 border-secondary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Brands</label>
                                    <input type="number" name="brands" value={data.brands} onChange={getInputData} placeholder='Brands' className='form-control border-3 border-secondary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Address</label>
                                    <input type="text" name="address" value={data.address} onChange={getInputData} placeholder='Address' className='form-control border-3 border-secondary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className='form-control border-3 border-secondary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Email</label>
                                    <input type="text" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className='form-control border-3 border-secondary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>WhatsApp Number</label>
                                    <input type="text" name="whatsapp" value={data.whatsapp} onChange={getInputData} placeholder='Whatsapp Number' className='form-control border-3 border-secondary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Twitter Profile URL</label>
                                    <input type="url" name="twitter" value={data.twitter ?? ""} onChange={getInputData} placeholder='Twitter Profile URL' className='form-control border-3 border-secondary' />
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Facebook Profile URL</label>
                                    <input type="url" name="facebook" value={data.facebook ?? ""} onChange={getInputData} placeholder='Facebook Profile URL' className='form-control border-3 border-secondary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Instagram Profile URL</label>
                                    <input type="url" name="instagram" value={data.instagram ?? ""} onChange={getInputData} placeholder='Instagram Profile URL' className='form-control border-3 border-secondary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Linkedin Profile URL</label>
                                    <input type="url" name="linkedin" value={data.linkedin ?? ""} onChange={getInputData} placeholder='Linkedin Profile URL' className='form-control border-3 border-secondary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Youtube Profile URL</label>
                                    <input type="url" name="youtube" value={data.youtube ?? ""} onChange={getInputData} placeholder='Youtube Profile URL' className='form-control border-3 border-secondary' />
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
