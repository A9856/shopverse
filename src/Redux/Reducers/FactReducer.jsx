import { CREATE_FACT_RED, DELETE_FACT_RED, GET_FACT_RED, UPDATE_FACT_RED } from "../Contants"

export default function FactReducer(state=[], action) {
    switch (action.type) {
        case CREATE_FACT_RED:
            return [...state, action.payload]

        case GET_FACT_RED:
            return action.payload

        case UPDATE_FACT_RED:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].customers = action.payload.customers
            state[index].products = action.payload.products
            state[index].discount = action.payload.discount
            state[index].brands = action.payload.brands
            state[index].address = action.payload.address
            state[index].phone = action.payload.phone
            state[index].email = action.payload.email
            state[index].whatsapp = action.payload.whatsapp
            return state

        case DELETE_FACT_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}
