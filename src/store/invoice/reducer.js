import {
  ADD_INVOICE,
  ADD_INVOICE_SUCCESSFUL,
  ADD_INVOICE_FAILED,
} from "./actionTypes"

const initialState = {
  addingError: null,
  message: null,
  loading: false,
  user: null,
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      state = {
        ...state,
        loading: true,
        addingError: null,
      }
      break
    case ADD_INVOICE_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        addingError: null,
      }
      break
    case ADD_INVOICE_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        addingError: action.payload,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default account
