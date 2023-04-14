import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { RESET_PASSWORD } from "./actionTypes"
import { userResetPasswordSuccess, userResetPasswordError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeForgetPwd,
  postJwtResetPwd,
} from "../../../helpers/fakebackend_helper"

const fireBaseBackend = getFirebaseBackend()

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* resetUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.forgetPassword, user.email)
      if (response) {
        yield put(
          userResetPasswordSuccess(
            "Reset link are sended to your mailbox, check there first"
          )
        )
      }
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      if (user.newPass === user.confPass) {
        const response = yield call(postJwtResetPwd, {
          password: user.newPass,
          token: user.token,
        })
        if (response) {
          if (response.statusCode == 200) {
            yield put(userResetPasswordSuccess(response.message))
          } else {
            yield put(userResetPasswordError(response.message))
          }
        }
      } else {
        yield put(userResetPasswordError("Password not matched!"))
      }
    } else {
      const response = yield call(postFakeForgetPwd, "/fake-forget-pwd", {
        email: user.email,
      })
      if (response) {
        yield put(
          userResetPasswordSuccess(
            "Reset link are sended to your mailbox, check there first"
          )
        )
      }
    }
  } catch (error) {
    yield put(userResetPasswordError(error))
  }
}

export function* watchUserPasswordReset() {
  yield takeEvery(RESET_PASSWORD, resetUser)
}

function* resetPasswordSaga() {
  yield all([fork(watchUserPasswordReset)])
}

export default resetPasswordSaga
