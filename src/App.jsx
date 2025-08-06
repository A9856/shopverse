import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'


import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ShopPage from './Pages/ShopPage'
import FeaturesPage from './Pages/FeaturesPage'
import ServicesPage from './Pages/ServicesPage'
import ContactUsPage from './Pages/ContactUsPage'
import TestimonialPage from './Pages/TestimonialPage'
import AdminHomePage from './Pages/Admin/AdminHomePage'
import AdminMaincategoryPage from './Pages/Admin/Maincategory/AdminMaincategoryPage'
import AdminCreateMaincategoryPage from './Pages/Admin/Maincategory/AdminCreateMaincategoryPage'
import AdminUpdateMaincategoryPage from './Pages/Admin/Maincategory/AdminUpdateMaincategoryPage'
import AdminSubcategoryPage from './Pages/Admin/Subcategory/AdminSubcategoryPage'
import AdminCreateSubcategoryPage from './Pages/Admin/Subcategory/AdminCreateSubcategoryPage'
import AdminUpdateSubcategoryPage from './Pages/Admin/Subcategory/AdminUpdateSubcategoryPage'
import AdminBrandPage from './Pages/Admin/Brand/AdminBrandPage'
import AdminCreateBrandPage from './Pages/Admin/Brand/AdminCreateBrandPage'
import AdminUpdateBrandPage from './Pages/Admin/Brand/AdminUpdateBrandPage'
import AdminTestimonialPage from './Pages/Admin/Testimonial/AdminTestimonialPage'
import AdminCreateTestimonialPage from './Pages/Admin/Testimonial/AdminCreateTestimonialPage'
import AdminUpdateTestimonialPage from './Pages/Admin/Testimonial/AdminUpdateTestimonialPage'
import AdminServicePage from './Pages/Admin/Service/AdminServicePage'
import AdminCreateServicePage from './Pages/Admin/Service/AdminCreateServicePage'
import AdminUpdateServicePage from './Pages/Admin/Service/AdminUpdateServicePage'
import AdminFeaturePage from './Pages/Admin/Feature/AdminFeaturePage'
import AdminCreateFeaturePage from './Pages/Admin/Feature/AdminCreateFeaturePage'
import AdminUpdateFeaturePage from './Pages/Admin/Feature/AdminUpdateFeaturePage'
import AdminFactPage from './Pages/Admin/Fact/AdminFactPage'
import AdminUpdateFactPage from './Pages/Admin/Fact/AdminUpdateFactPage'
import PageNotFound from './Pages/PageNotFound'
import AdminProductPage from './Pages/Admin/Product/AdminProductPage'
import AdminCreateProductPage from './Pages/Admin/Product/AdminCreateProductPage'
import AdminUpdateProductPage from './Pages/Admin/Product/AdminUpdateProductPage'
import ProductPage from './Pages/ProductPage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import UpdateProfilePage from './Pages/UpdateProfilePage'
import CartPage from './Pages/CartPage'
import CheckoutPage from './Pages/CheckoutPage'
import OrderConfirmation from './Pages/OrderConfirmation'
import AdminNewsletterPage from './Pages/Admin/Newsletter/AdminNewsletterPage'
import AdminContactUsPage from './Pages/Admin/ContactUs/AdminContactUsPage'
import AdminContactUsShowPage from './Pages/Admin/ContactUs/AdminContactUsShowPage'
import AdminCheckoutPage from './Pages/Admin/Checkout/AdminCheckoutPage'
import AdminCheckoutShowPage from './Pages/Admin/Checkout/AdminCheckoutShowPage'
import AdminUserPage from './Pages/Admin/User/AdminUserPage'
import AdminCreateUserPage from './Pages/Admin/User/AdminCreateUserPage'
import AdminUpdateUserPage from './Pages/Admin/User/AdminUpdateUserPage'

export default function App() {
    return (
        <BrowserRouter basename="/shopverse">
            <Navbar />
            <Routes>
                <Route path='' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/features' element={<FeaturesPage />} />
                <Route path='/services' element={<ServicesPage />} />
                <Route path='/testimonials' element={<TestimonialPage />} />
                <Route path='/contactus' element={<ContactUsPage />} />
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />

                {/* Buyer Routes */}
                {
                    localStorage.getItem("login") ?
                        <>
                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path='/update-profile' element={<UpdateProfilePage />} />
                            <Route path='/cart' element={<CartPage />} />
                            <Route path='/checkout' element={<CheckoutPage />} />
                            <Route path='/order-confirmation' element={<OrderConfirmation />} />
                        </> : null
                }

                {/* Admin Routes */}
                {
                    localStorage.getItem("login") && localStorage.getItem("role") !== "Buyer" ?
                        <>
                            <Route path='/admin' element={<AdminHomePage />} />

                            <Route path='/admin/maincategory' element={<AdminMaincategoryPage />} />
                            <Route path='/admin/maincategory/create' element={<AdminCreateMaincategoryPage />} />
                            <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMaincategoryPage />} />

                            <Route path='/admin/subcategory' element={<AdminSubcategoryPage />} />
                            <Route path='/admin/subcategory/create' element={<AdminCreateSubcategoryPage />} />
                            <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubcategoryPage />} />

                            <Route path='/admin/brand' element={<AdminBrandPage />} />
                            <Route path='/admin/brand/create' element={<AdminCreateBrandPage />} />
                            <Route path='/admin/brand/update/:id' element={<AdminUpdateBrandPage />} />

                            <Route path='/admin/testimonial' element={<AdminTestimonialPage />} />
                            <Route path='/admin/testimonial/create' element={<AdminCreateTestimonialPage />} />
                            <Route path='/admin/testimonial/update/:id' element={<AdminUpdateTestimonialPage />} />

                            <Route path='/admin/service' element={<AdminServicePage />} />
                            <Route path='/admin/service/create' element={<AdminCreateServicePage />} />
                            <Route path='/admin/service/update/:id' element={<AdminUpdateServicePage />} />

                            <Route path='/admin/feature' element={<AdminFeaturePage />} />
                            <Route path='/admin/feature/create' element={<AdminCreateFeaturePage />} />
                            <Route path='/admin/feature/update/:id' element={<AdminUpdateFeaturePage />} />

                            <Route path='/admin/fact' element={<AdminFactPage />} />
                            <Route path='/admin/fact/edit' element={<AdminUpdateFactPage />} />

                            <Route path='/admin/product' element={<AdminProductPage />} />
                            <Route path='/admin/product/create' element={<AdminCreateProductPage />} />
                            <Route path='/admin/product/update/:id' element={<AdminUpdateProductPage />} />

                            <Route path='/admin/newsletter' element={<AdminNewsletterPage />} />

                            <Route path='/admin/contactus' element={<AdminContactUsPage />} />
                            <Route path='/admin/contactus/show/:id' element={<AdminContactUsShowPage />} />

                            <Route path='/admin/checkout' element={<AdminCheckoutPage />} />
                            <Route path='/admin/checkout/show/:id' element={<AdminCheckoutShowPage />} />

                            {
                                localStorage.getItem("role") === "Super Admin" ?
                                    <>
                                        <Route path='/admin/user' element={<AdminUserPage />} />
                                        <Route path='/admin/user/create' element={<AdminCreateUserPage />} />
                                        <Route path='/admin/user/update/:id' element={<AdminUpdateUserPage />} />
                                    </> : null
                            }
                        </> : null
                }

                <Route path='/*' element={<PageNotFound />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
