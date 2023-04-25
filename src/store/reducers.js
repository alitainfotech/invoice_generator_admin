import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import ResetPassword from "./auth/resetpwd/reducer"
import Profile from "./auth/profile/reducer"

import client from "./client/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  ResetPassword,
  Profile,
  client,
})

export default rootReducer
