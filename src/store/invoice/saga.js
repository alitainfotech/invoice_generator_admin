import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { ADD_INVOICE } from "./actionTypes"
import { addInvoiceSuccessful, addInvoiceFailed } from "./actions"

//Include Both Helper File with needed methods
// import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import { postJwtAddInvoice } from "../../helpers/fakebackend_helper"

// initialize relavant method of both Auth
// const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* addInvoices({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      // const response = yield call(
      //   fireBaseBackend.addClients,
      //   user.email,
      //   user.password
      // )
      // yield put(addClientSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtAddInvoice, user)
      if (response.status) {
        yield put(addInvoiceSuccessful(response.message))
      } else {
        yield put(addInvoiceFailed(response.message))
      }
    }
  } catch (error) {
    yield put(addInvoiceFailed(error))
  }
}

export function* watchAddUsers() {
  yield takeEvery(ADD_INVOICE, addInvoices)
}

function* invoiceSaga() {
  yield all([fork(watchAddUsers)])
}

export default invoiceSaga
