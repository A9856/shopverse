import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../FormValidators/FormValidator'
import ImageValidator from '../../../FormValidators/ImageValidator'

import { getFeature, createFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"

var rte;
export default function AdminCreateFeaturePage() {
    var refdiv = useRef(null);
    let [data, setData] = useState({
        name: "",
        pic: "",
        icon: "",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        icon: "Icon Field is Mendatory",
        pic: "Pic Field is Mendatory"
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let FeatureStateData = useSelector(state => state.FeatureStateData)
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
            let item = FeatureStateData.find(x => x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setErrorMessage((old) => {
                    return {
                        ...old,
                        "name": "Feature Already Exist with Same Name"
                    }
                })
                setShow(true)
            }
            else {
                dispatch(createFeature({ 
                    ...data,
                    description:rte.getHTMLCode()
                 }))

                // let formData = new FormData()
                // formData.append("name", data.name)
                // formData.append("pic", data.pic)
                // formData.append("icon", data.icon)
                // formData.append("description", rte.getHTMLCode())
                // formData.append("active", data.active)
                // dispatch(createFeature(formData))
                navigate("/admin/feature")
            }
        }
    }

    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");
    }, [])


    useEffect(() => {
        (() => {
            dispatch(getFeature())
        })()
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
                        <h5 className='bg-secondary p-2 text-light text-center'>Create Feature <Link to="/admin/feature" className='float-end'><i className='fa fa-long-arrow-left text-light'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Feature Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-6 mb-3">
                                    <label>Icon*</label>
                                    <input type="text" name="icon" onChange={getInputData} placeholder='Feature Icon Tag' className={`form-control border-3 ${show && errorMessage.icon ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
                                </div>


                                <div className='col-12 mb-3'>
                                    <label>Description*</label>
                                    <div ref={refdiv} className='border-3 border-secondary'></div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
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
