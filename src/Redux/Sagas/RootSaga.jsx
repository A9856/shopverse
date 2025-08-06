import { all } from "redux-saga/effects";

import maincategorySaga from "./MaincategorySagas";
import subcategorySaga from "./SubcategorySagas";
import brandSaga from "./BrandSagas";
import testimonialSaga from "./TestimonialSagas";
import productSaga from "./ProductSagas";
import serviceSaga from "./ServiceSagas";
import featureSaga from "./FeatureSagas";
import factSaga from "./FactSagas";
import cartSaga from "./CartSagas";
import wishlistSaga from "./WishlistSagas";
import checkoutSaga from "./CheckoutSagas";
import newsletterSaga from "./NewsletterSagas";
import contactusSaga from "./ContactUsSagas";
import userSaga from "./UserSagas";

export default function* RootSaga() {
    yield all([
        maincategorySaga(),
        subcategorySaga(),
        brandSaga(),
        testimonialSaga(),
        productSaga(),
        serviceSaga(),
        featureSaga(),
        factSaga(),
        cartSaga(),
        wishlistSaga(),
        checkoutSaga(),
        newsletterSaga(),
        contactusSaga(),
        userSaga()
    ])
}