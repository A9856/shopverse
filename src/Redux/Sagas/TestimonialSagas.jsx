import { put, takeEvery } from "redux-saga/effects"
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Contants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {                                          //worker saga
    let response = yield createRecord("testimonial", action.payload)
    yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })

    // let response = yield createMultipartRecord("testimonial", action.payload)
    // yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })
}

function* getSaga() {
    let response = yield getRecord("testimonial")
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}

function* updateSaga(action) {                                          //worker saga
    yield updateRecord("testimonial", action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("testimonial", action.payload)
    // yield put({ type: UPDATE_TESTIMONIAL_RED, payload: response })
}

function* deleteSaga(action) {                                          //worker saga
    yield deleteRecord("testimonial", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}

export default function* testimonialSaga() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)                           //watcher saga
    yield takeEvery(GET_TESTIMONIAL, getSaga)                                 //watcher saga
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)                           //watcher saga
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)                           //watcher saga
}