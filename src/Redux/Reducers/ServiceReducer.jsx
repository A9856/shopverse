import { CREATE_SERVICE_RED, DELETE_SERVICE_RED, GET_SERVICE_RED, UPDATE_SERVICE_RED } from "../Contants"

export default function ServiceReducer(state=[], action) {
    switch (action.type) {
        case CREATE_SERVICE_RED:
            return [...state, action.payload]

        case GET_SERVICE_RED:
            return action.payload

        case UPDATE_SERVICE_RED:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            state[index].icon = action.payload.icon
            state[index].description = action.payload.description
            return state

        case DELETE_SERVICE_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}
