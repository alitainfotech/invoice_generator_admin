import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { ADD_CLIENT } from "./actionTypes"
import { addClientSuccessful, addClientFailed } from "./actions"

//Include Both Helper File with needed methods
// import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import { postJwtAddClient } from "../../helpers/fakebackend_helper"

// initialize relavant method of both Auth
// const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* addClients({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      // const response = yield call(
      //   fireBaseBackend.addClients,
      //   user.email,
      //   user.password
      // )
      // yield put(addClientSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtAddClient, user)
      if (response.status) {
        yield put(addClientSuccessful(response.message))
      } else {
        yield put(addClientFailed(response.message))
      }
    }
  } catch (error) {
    yield put(addClientFailed(error))
  }
}

export function* watchAddUsers() {
  yield takeEvery(ADD_CLIENT, addClients)
}

function* clientSaga() {
  yield all([fork(watchAddUsers)])
}

export default clientSaga
