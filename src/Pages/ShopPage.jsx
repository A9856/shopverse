import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../Components/Breadcrum'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { Link, useSearchParams } from 'react-router-dom'

export default function ShopPage() {
    let [data, setData] = useState([])

    let [mc, setMc] = useState("")
    let [sc, setSc] = useState("")
    let [br, setBr] = useState("")

    let [sort, setSort] = useState("1")
    let [search, setSearch] = useState("")

    let [min, setMin] = useState(-1)
    let [max, setMax] = useState(-1)

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch()

    let [searchParams] = useSearchParams()

    function filterData(mc, sc, br) {
        let data = ProductStateData.filter(x => x.active &&
            (mc === "All" || x.maincategory === mc) &&
            (sc === "All" || x.subcategory === sc) &&
            (br === "All" || x.brand === br) &&
            (min == -1 || (min <= x.finalPrice && max > x.finalPrice))
        )
        if (sort === "1")
            data = data.sort((x, y) => x.id.localeCompare(y.id))
        else if (sort === "2")
            data = data.sort((x, y) => y.finalPrice - x.finalPrice)
        else
            data = data.sort((x, y) => x.finalPrice - y.finalPrice)
        setData(data)
    }

    function sortFilter(e) {
        let option = e.target.value
        if (option === "1")
            setData(data.sort((x, y) => x.id.localeCompare(y.id)))
        else if (option === "2")
            setData(data.sort((x, y) => y.finalPrice - x.finalPrice))
        else
            setData(data.sort((x, y) => x.finalPrice - y.finalPrice))

        setSort(option)
    }

    function searchFilter(e) {
        e.preventDefault()
        let ch = search.toLowerCase()
        setData(ProductStateData.filter(x => x.active && (
            x.name?.toLowerCase().includes(ch) ||
            x.maincategory?.toLowerCase() === ch ||
            x.subcategory?.toLowerCase() === ch ||
            x.band?.toLowerCase() === ch ||
            x.color?.toLowerCase() === ch ||
            x.description?.toLowerCase().includes(ch)) &&
            (min == -1 || (min <= x.finalPrice && max > x.finalPrice))
        ))
    }

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

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length)
                setData(ProductStateData.filter(x => x.active))
        })()
    }, [ProductStateData.length])


    useEffect(() => {
        let mc = searchParams.get("mc") ?? "All"
        let sc = searchParams.get("sc") ?? "All"
        let br = searchParams.get("br") ?? "All"

        setMc(mc)
        setSc(sc)
        setBr(br)

        filterData(mc, sc, br)
        setSearch("")
    }, [searchParams])
    return (
        <>
            <Breadcrum title="Shop" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <div className="list-group mb-3">
                            <p className="list-group-item list-group-item-action active" aria-current="true">Maincategory</p>
                            <Link to={`/shop?mc=All&sc=${sc}&br=${br}`} className="list-group-item list-group-item-action">All</Link>
                            {
                                MaincategoryStateData.filter(x => x.active).map(item => {
                                    return <Link to={`/shop?mc=${item.name}&sc=${sc}&br=${br}`} className="list-group-item list-group-item-action" key={item.id}>{item.name}</Link>
                                })
                            }
                        </div>
                        <div className="list-group mb-3">
                            <p className="list-group-item list-group-item-action active" aria-current="true">Subcategory</p>
                            <Link to={`/shop?mc=${mc}&sc=All&br=${br}`} className="list-group-item list-group-item-action">All</Link>
                            {
                                SubcategoryStateData.filter(x => x.active).map(item => {
                                    return <Link to={`/shop?mc=${mc}&sc=${item.name}&br=${br}`} className="list-group-item list-group-item-action" key={item.id}>{item.name}</Link>
                                })
                            }
                        </div>
                        <div className="list-group mb-3">
                            <p className="list-group-item list-group-item-action active" aria-current="true">Brand</p>
                            <Link to={`/shop?mc=${mc}&sc=${sc}&br=All`} className="list-group-item list-group-item-action">All</Link>
                            {
                                BrandStateData.filter(x => x.active).map(item => {
                                    return <Link to={`/shop?mc=${mc}&sc=${sc}&br=${item.name}`} className="list-group-item list-group-item-action" key={item.id}>{item.name}</Link>
                                })
                            }
                        </div>

                        <div className="mb-3">
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                if (search === "")
                                    filterData(mc, sc, br)
                                else
                                    searchFilter(e)
                            }}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input type="text" name="min" onChange={(e) => setMin(e.target.value)} value={min} placeholder='Min. Amount' className='form-control border-3 border-primary' />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" name="max" onChange={(e) => setMax(e.target.value)} value={max} placeholder='Max. Amount' className='form-control border-3 border-primary' />
                                    </div>
                                </div>
                                <div className="btn-group w-100">
                                    <button className='btn btn-danger w-100' onClick={() => {
                                        setMin(-1)
                                        setMax(-1)
                                    }}>Reset</button>
                                    <button className='btn btn-primary w-100'>Apply Filter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-9 mb-3">
                                <form onSubmit={searchFilter}>
                                    <div className='btn-group w-100'>
                                        <input type="search" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Product By Name, Category, Brand, Color etc...' className='form-control border-3 border-primary rounded-0 rounded-start' />
                                        <button type='submit' className='btn btn-primary'>Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-3 mb-3">
                                <select name="sort" onChange={sortFilter} className='form-select border-3 border-primary'>
                                    <option value="1">Latest</option>
                                    <option value="2">Price : High to Low</option>
                                    <option value="3">Price : Low to High</option>
                                </select>
                            </div>
                        </div>

                        <section id="team" className="team section light-background">
                            <div className="row">
                                {
                                    data.map(item => {
                                        return <div key={item.id} className="col-md-4 col-sm-6 position-relative mb-3">
                                            <div className="member">
                                                <div className="pic"><img src={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${item.pic[0]}`} style={{ height: 300 }} className="w-100" alt="" /></div>
                                                <div className="member-info">
                                                    <h4 className='text-center'>{item.name}</h4>
                                                    <div className='d-flex justify-content-between'>
                                                        <p className='d-flex'><del className='text-danger'>&#8377;{item.basePrice}</del> <span className='fs-5'>&#8377;{item.finalPrice}</span> <sup className='text-success'>{item.discount}% off</sup></p>
                                                        <span>{item.stockQuantity ? `${item.stockQuantity} Left In Stock` : "Out Of Stock"}</span>
                                                    </div>
                                                    <Link to={`/product/${item.id}`} className='btn btn-primary w-100 btn-sm'>Add to Cart</Link>
                                                </div>
                                                <span className="position-absolute translate-middle badge rounded-pill bg-primary py-1 px-3" style={{ top: 0, left: "50%" }}>
                                                    {item.brand}
                                                </span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
