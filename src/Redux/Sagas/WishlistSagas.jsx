import { put, takeEvery } from "redux-saga/effects"
import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, UPDATE_WISHLIST, UPDATE_WISHLIST_RED } from "../Contants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {                                          //worker saga
    let response = yield createRecord("wishlist", action.payload)
    yield put({ type: CREATE_WISHLIST_RED, payload: response })

    // let response = yield createMultipartRecord("wishlist", action.payload)
    // yield put({ type: CREATE_WISHLIST_RED, payload: response })
}

function* getSaga() {
    let response = yield getRecord("wishlist")
    yield put({ type: GET_WISHLIST_RED, payload: response })
}

function* updateSaga(action) {                                          //worker saga
    yield updateRecord("wishlist", action.payload)
    yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("wishlist", action.payload)
    // yield put({ type: UPDATE_WISHLIST_RED, payload: response })
}

function* deleteSaga(action) {                                          //worker saga
    yield deleteRecord("wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* wishlistSaga() {
    yield takeEvery(CREATE_WISHLIST, createSaga)                           //watcher saga
    yield takeEvery(GET_WISHLIST, getSaga)                                 //watcher saga
    yield takeEvery(UPDATE_WISHLIST, updateSaga)                           //watcher saga
    yield takeEvery(DELETE_WISHLIST, deleteSaga)                           //watcher saga
}