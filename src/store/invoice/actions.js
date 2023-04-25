import {
  ADD_INVOICE,
  ADD_INVOICE_SUCCESSFUL,
  ADD_INVOICE_FAILED,
} from "./actionTypes"

export const addInvoice = user => {
  return {
    type: ADD_INVOICE,
    payload: { user },
  }
}

export const addInvoiceSuccessful = user => {
  return {
    type: ADD_INVOICE_SUCCESSFUL,
    payload: user,
  }
}

export const addInvoiceFailed = user => {
  return {
    type: ADD_INVOICE_FAILED,
    payload: user,
  }
}
