import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../FormValidators/FormValidator'
import ImageValidator from '../../../FormValidators/ImageValidator'


import { getSubcategory, updateSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
export default function AdminUpdateSubcategoryPage() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        pic: "",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: ""
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? "subcategory/" + e.target.files[0].name : e.target.value
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
            let item = SubcategoryStateData.find(x => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setErrorMessage((old) => {
                    return {
                        ...old,
                        "name": "Subcategory Already Exist with Same Name"
                    }
                })
                setShow(true)
            }
            else {
                dispatch(updateSubcategory({ ...data }))

                // let formData = new FormData()
                // formData.append("_id", data._id)
                // formData.append("name", data.name)
                // formData.append("pic", data.pic)
                // formData.append("active", data.active)
                // dispatch(createSubcategory(formData))
                navigate("/admin/subcategory")
            }
        }
    }


    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length) {
                let item = SubcategoryStateData.find(x => x.id === id)
                if (item)
                    setData({ ...item })
                else
                    navigate("/admin/Subcategory")
            }
        })()
    }, [SubcategoryStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>Update Subcategory <Link to="/admin/subcategory" className='float-end'><i className='fa fa-long-arrow-left text-light'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Subcategory Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
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
