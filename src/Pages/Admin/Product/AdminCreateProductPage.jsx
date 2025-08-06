import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../FormValidators/FormValidator'
import ImageValidator from '../../../FormValidators/ImageValidator'

import { createProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreators"

let rte;
export default function AdminCreateProductPage() {
    let refdiv = useRef(null);
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        basePrice: "",
        discount: "",
        finalPrice: "",
        stock: true,
        stockQuantity: "",
        pic: [],
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        color: "Color Field is Mendatory",
        size: "Size Field is Mendatory",
        basePrice: "Base Price Field is Mendatory",
        discount: "Discount Field is Mendatory",
        stockQuantity: "Stock Quantity Field is Mendatory",
        pic: "Pic Field is Mendatory"
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files && e.target.files.length ? Array.from(e.target.files).map(x => "product/" + x.name) : e.target.value
        // let value = e.target.files && e.target.files.length ? e.target.files[0] : e.target.value

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
            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let fp = parseInt(bp - bp * d / 100)
            let stockQuantity = parseInt(data.stockQuantity)
            dispatch(createProduct({
                ...data,
                maincategory: data.maincategory || MaincategoryStateData[0].name,
                subcategory: data.subcategory || SubcategoryStateData[0].name,
                brand: data.brand || BrandStateData[0].name,
                basePrice: bp,
                discount: d,
                finalPrice: fp,
                stockQuantity: stockQuantity,
                description: rte.getHTMLCode()
            }))

            // let formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("maincategory", data.maincategory || MaincategoryStateData[0]._id)
            // formData.append("subcategory", data.subcategory || SubcategoryStateData[0]._id)
            // formData.append("brand", brand || BrandStateData[0]._id)
            // formData.append("color", data.color)
            // formData.append("size", data.size)
            // formData.append("basePrice", bp)
            // formData.append("discount", d)
            // formData.append("finalPrice", fp)
            // formData.append("description", rte.getHTMLCode())
            // formData.append("stock", data.stock)
            // formData.append("stockQuantity", data.stockQuantity)
            // formData.append("pic", data.pic)
            // formData.append("active", data.active)
            // dispatch(createProduct(formData))
            navigate("/admin/product")
        }
    }

    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");
    }, [])


    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])
    return (
        <>
            <Breadcrum title="Admin Section" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-secondary p-2 text-light text-center'>Create Product <Link to="/admin/product" className='float-end'><i className='fa fa-long-arrow-left text-light'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Product Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Maincategory</label>
                                    <select name="maincategory" onChange={getInputData} className='form-select border-3 border-secondary'>
                                        {
                                            MaincategoryStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Subcategory</label>
                                    <select name="subcategory" onChange={getInputData} className='form-select border-3 border-secondary'>
                                        {
                                            SubcategoryStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Brand</label>
                                    <select name="brand" onChange={getInputData} className='form-select border-3 border-secondary'>
                                        {
                                            BrandStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Stock</label>
                                    <select name="stock" onChange={getInputData} className='form-select border-3 border-secondary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Color*</label>
                                    <input type="text" name="color" onChange={getInputData} placeholder='Product Color' className={`form-control border-3 ${show && errorMessage.color ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.color ? <p className='text-danger'>{errorMessage.color}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Size*</label>
                                    <input type="text" name="size" onChange={getInputData} placeholder='Product Size' className={`form-control border-3 ${show && errorMessage.size ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.size ? <p className='text-danger'>{errorMessage.size}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" name="basePrice" onChange={getInputData} placeholder='Product Base Price' className={`form-control border-3 ${show && errorMessage.basePrice ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" name="discount" onChange={getInputData} placeholder='Discount' className={`form-control border-3 ${show && errorMessage.discount ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Description*</label>
                                    <div ref={refdiv} className='border-3 border-secondary'></div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label>Stock Quantity*</label>
                                    <input type="number" name="stockQuantity" onChange={getInputData} placeholder='Product Stock Quantity' className={`form-control border-3 ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" multiple onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-secondary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                </div>

                                <div className="col-md-4 mb-3">
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
