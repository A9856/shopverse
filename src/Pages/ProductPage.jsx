import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import ProductSlider from '../Components/ProductSlider'
import Breadcrum from '../Components/Breadcrum'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getCart, createCart } from "../Redux/ActionCreators/CartActionCreators"
import { getWishlist, createWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
export default function ProductPage() {
  let { id } = useParams()

  let [qty, setQty] = useState(1)

  let [product, setProduct] = useState({ pic: [] })
  let [relatedProducts, setRelatedProducts] = useState([])

  let ProductStateData = useSelector(state => state.ProductStateData)
  let CartStateData = useSelector(state => state.CartStateData)
  let WishlistStateData = useSelector(state => state.WishlistStateData)

  let dispatch = useDispatch()
  let navigate = useNavigate()

  function addToCart() {
    let item = CartStateData.find(x => x.product === product.id && x.user === localStorage.getItem("userid"))
    if (!item) {
      item = {
        user: localStorage.getItem("userid"),
        product: id,
        name: product.name,          //remov in case of real backend
        brand: product.brand,        //remov in case of real backend
        color: product.color,        //remov in case of real backend
        size: product.size,          //remov in case of real backend
        stockQuantity: product.stockQuantity,        //remov in case of real backend
        pic: product.pic[0],         //remov in case of real backend
        price: product.finalPrice,   //remov in case of real backend
        qty: qty,
        total: qty * product.finalPrice
      }
      dispatch(createCart(item))
    }
    navigate("/cart")
  }

  function addToWishlist() {
    let item = WishlistStateData.find(x => x.product === product.id && x.user === localStorage.getItem("userid"))
    if (!item) {
      item = {
        user: localStorage.getItem("userid"),
        product: id,
        name: product.name,          //remov in case of real backend
        brand: product.brand,        //remov in case of real backend
        color: product.color,        //remov in case of real backend
        size: product.size,          //remov in case of real backend
        stockQuantity: product.stockQuantity,        //remov in case of real backend
        pic: product.pic[0],         //remov in case of real backend
        price: product.finalPrice,   //remov in case of real backend
      }
      dispatch(createWishlist(item))
    }
    navigate("/profile")
  }

  useEffect(() => {
    (() => {
      dispatch(getProduct())
      if (ProductStateData.length) {
        let item = ProductStateData.find(x => x.id === id)
        setProduct(item)
        setRelatedProducts(ProductStateData.filter(x => x.maincategory === item.maincategory))
      }
    })()
  }, [ProductStateData.length, id])

  useEffect(() => {
    (() => {
      dispatch(getCart())
    })()
  }, [CartStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getWishlist())
    })()
  }, [WishlistStateData.length])
  return (
    <>
      <Breadcrum title={product.name ?? ""} />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                {
                  product.pic.map((item, index) => {
                    return <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className="active" aria-current="true" aria-label={`Slide ${index + 1}`}></button>
                  })
                }
              </div>
              <div className="carousel-inner">
                {
                  product.pic.map((item, index) => {
                    return <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                      <img src={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${item}`} height={450} className="d-block w-100" alt="..." />
                    </div>
                  })
                }
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className='d-flex'>
              {product.pic.map((item, index) => {
                return <img src={`${process.env.REACT_APP_BACKEND_IMAGE_SERVER}${item}`} height={100} className="d-block w-100 m-1" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-current="true" aria-label={`Slide ${index + 1}`} alt="..." />
              })}
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <table className='table table-bordered table-striped'>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>{product.name}</th>
                </tr>
                <tr>
                  <th>Maincategory</th>
                  <td>{product.maincategory}</td>
                </tr>
                <tr>
                  <th>Subcategory</th>
                  <td>{product.subcategory}</td>
                </tr>
                <tr>
                  <th>Brand</th>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <th>Color/Size</th>
                  <td>{product.color}/{product.size}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td><del>&#8377;{product.basePrice}</del> &#8377;{product.finalPrice} <sup>{product.discount}% Off</sup></td>
                </tr>
                <tr>
                  <th>Stock</th>
                  <td>{product.stock ? `${product.stockQuantity} Left in Stock` : "out Of Stock"}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {
                      product.stock ?
                        <div className="row">
                          <div className="col-lg-4 mb-3">
                            <div className='btn-group w-100'>
                              <button className='btn btn-primary' onClick={() => qty > 1 ? setQty(qty - 1) : null}><i className='fa fa-minus'></i></button>
                              <h4 className='w-25 text-center'>{qty}</h4>
                              <button className='btn btn-primary' onClick={() => qty < product.stockQuantity ? setQty(qty + 1) : null}><i className='fa fa-plus'></i></button>
                            </div>
                          </div>
                          <div className="col-lg-8 mb-3">
                            <div className="btn-group w-100">
                              <button className='btn btn-primary' onClick={addToCart}><i className='fa fa-shopping-cart'></i> Add to Cart</button>
                              <button className='btn btn-secondary' onClick={addToWishlist}><i className='fa fa-heart'></i> Add to Wishlist</button>
                            </div>
                          </div>
                        </div> :
                        <button className='btn btn-secondary w-100' onClick={addToWishlist}><i className='fa fa-heart'></i> Add to Wishlist</button>
                    }
                  </td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <ProductSlider data={relatedProducts} title="Related Products" />
      </div>
    </>
  )
}
