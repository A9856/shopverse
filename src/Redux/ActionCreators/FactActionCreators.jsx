import { CREATE_FACT, DELETE_FACT, GET_FACT, UPDATE_FACT } from "../Contants"

export function createFact(data) {
    return {
        type: CREATE_FACT,
        payload: data
    }
}

export function getFact() {
    return {
        type: GET_FACT
    }
}

export function updateFact(data) {
    return {
        type: UPDATE_FACT,
        payload: data
    }
}

export function deleteFact(data) {
    return {
        type: DELETE_FACT,
        payload: data
    }
}