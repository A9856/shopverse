import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CONTACTUS, CREATE_CONTACTUS_RED, DELETE_CONTACTUS, DELETE_CONTACTUS_RED, GET_CONTACTUS, GET_CONTACTUS_RED, UPDATE_CONTACTUS, UPDATE_CONTACTUS_RED } from "../Contants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {                                          //worker saga
    let response = yield createRecord("contactus", action.payload)
    yield put({ type: CREATE_CONTACTUS_RED, payload: response })

    // let response = yield createMultipartRecord("contactus", action.payload)
    // yield put({ type: CREATE_CONTACTUS_RED, payload: response })
}

function* getSaga() {
    let response = yield getRecord("contactus")
    yield put({ type: GET_CONTACTUS_RED, payload: response })
}

function* updateSaga(action) {                                          //worker saga
    yield updateRecord("contactus", action.payload)
    yield put({ type: UPDATE_CONTACTUS_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("contactus", action.payload)
    // yield put({ type: UPDATE_CONTACTUS_RED, payload: response })
}

function* deleteSaga(action) {                                          //worker saga
    yield deleteRecord("contactus", action.payload)
    yield put({ type: DELETE_CONTACTUS_RED, payload: action.payload })
}

export default function* contactUsSaga() {
    yield takeEvery(CREATE_CONTACTUS, createSaga)                           //watcher saga
    yield takeEvery(GET_CONTACTUS, getSaga)                                 //watcher saga
    yield takeEvery(UPDATE_CONTACTUS, updateSaga)                           //watcher saga
    yield takeEvery(DELETE_CONTACTUS, deleteSaga)                           //watcher saga
}