import { put, takeEvery } from "redux-saga/effects"
import { CREATE_SERVICE, CREATE_SERVICE_RED, DELETE_SERVICE, DELETE_SERVICE_RED, GET_SERVICE, GET_SERVICE_RED, UPDATE_SERVICE, UPDATE_SERVICE_RED } from "../Contants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {                                          //worker saga
    let response = yield createRecord("service", action.payload)
    yield put({ type: CREATE_SERVICE_RED, payload: response })

    // let response = yield createMultipartRecord("service", action.payload)
    // yield put({ type: CREATE_SERVICE_RED, payload: response })
}

function* getSaga() {
    let response = yield getRecord("service")
    yield put({ type: GET_SERVICE_RED, payload: response })
}

function* updateSaga(action) {                                          //worker saga
    yield updateRecord("service", action.payload)
    yield put({ type: UPDATE_SERVICE_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("service", action.payload)
    // yield put({ type: UPDATE_SERVICE_RED, payload: response })
}

function* deleteSaga(action) {                                          //worker saga
    yield deleteRecord("service", action.payload)
    yield put({ type: DELETE_SERVICE_RED, payload: action.payload })
}

export default function* serviceSaga() {
    yield takeEvery(CREATE_SERVICE, createSaga)                           //watcher saga
    yield takeEvery(GET_SERVICE, getSaga)                                 //watcher saga
    yield takeEvery(UPDATE_SERVICE, updateSaga)                           //watcher saga
    yield takeEvery(DELETE_SERVICE, deleteSaga)                           //watcher saga
}