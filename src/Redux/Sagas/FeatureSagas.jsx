import { put, takeEvery } from "redux-saga/effects"
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Contants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {                                          //worker saga
    let response = yield createRecord("feature", action.payload)
    yield put({ type: CREATE_FEATURE_RED, payload: response })

    // let response = yield createMultipartRecord("feature", action.payload)
    // yield put({ type: CREATE_FEATURE_RED, payload: response })
}

function* getSaga() {
    let response = yield getRecord("feature")
    yield put({ type: GET_FEATURE_RED, payload: response })
}

function* updateSaga(action) {                                          //worker saga
    yield updateRecord("feature", action.payload)
    yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("feature", action.payload)
    // yield put({ type: UPDATE_FEATURE_RED, payload: response })
}

function* deleteSaga(action) {                                          //worker saga
    yield deleteRecord("feature", action.payload)
    yield put({ type: DELETE_FEATURE_RED, payload: action.payload })
}

export default function* featureSaga() {
    yield takeEvery(CREATE_FEATURE, createSaga)                           //watcher saga
    yield takeEvery(GET_FEATURE, getSaga)                                 //watcher saga
    yield takeEvery(UPDATE_FEATURE, updateSaga)                           //watcher saga
    yield takeEvery(DELETE_FEATURE, deleteSaga)                           //watcher saga
}