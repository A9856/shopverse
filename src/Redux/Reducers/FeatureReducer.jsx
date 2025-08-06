import { CREATE_FEATURE_RED, DELETE_FEATURE_RED, GET_FEATURE_RED, UPDATE_FEATURE_RED } from "../Contants"

export default function FeatureReducer(state=[], action) {
    switch (action.type) {
        case CREATE_FEATURE_RED:
            return [...state, action.payload]

        case GET_FEATURE_RED:
            return action.payload

        case UPDATE_FEATURE_RED:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            state[index].icon = action.payload.icon
            state[index].description = action.payload.description
            return state

        case DELETE_FEATURE_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}
