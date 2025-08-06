import { put, takeEvery } from "redux-saga/effects"
import { CREATE_FACT, CREATE_FACT_RED, DELETE_FACT, DELETE_FACT_RED, GET_FACT, GET_FACT_RED, UPDATE_FACT, UPDATE_FACT_RED } from "../Contants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {                                          //worker saga
    let response = yield createRecord("fact", action.payload)
    yield put({ type: CREATE_FACT_RED, payload: response })

    // let response = yield createMultipartRecord("fact", action.payload)
    // yield put({ type: CREATE_FACT_RED, payload: response })
}

function* getSaga() {
    let response = yield getRecord("fact")
    yield put({ type: GET_FACT_RED, payload: response })
}

function* updateSaga(action) {                                          //worker saga
    yield updateRecord("fact", action.payload)
    yield put({ type: UPDATE_FACT_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("fact", action.payload)
    // yield put({ type: UPDATE_FACT_RED, payload: response })
}

function* deleteSaga(action) {                                          //worker saga
    yield deleteRecord("fact", action.payload)
    yield put({ type: DELETE_FACT_RED, payload: action.payload })
}

export default function* factSaga() {
    yield takeEvery(CREATE_FACT, createSaga)                           //watcher saga
    yield takeEvery(GET_FACT, getSaga)                                 //watcher saga
    yield takeEvery(UPDATE_FACT, updateSaga)                           //watcher saga
    yield takeEvery(DELETE_FACT, deleteSaga)                           //watcher saga
}