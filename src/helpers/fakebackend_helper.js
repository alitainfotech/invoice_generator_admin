import axios from "axios"
import { post, del, get, put, postFormData } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = data => post(url.POST_FAKE_REGISTER, data)

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_PROFILE, data)
const postJwtRegister = data => post(url.POST_REGISTER, data)
const postJwtLogin = data => post(url.POST_LOGIN, data)
const postJwtForgetPwd = data => post(url.POST_FORGET_PASSWORD, data)
const postJwtResetPwd = data => post(url.POST_RESET_PASSWORD, data)

const postJwtAddClient = data => postFormData(url.POST_ADD_CLIENT, data)

// get Events
export const getEvents = () => get(url.GET_EVENTS)

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } })

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES)

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,

  postJwtResetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,

  postJwtAddClient
}
