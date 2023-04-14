import {
  ADD_CLIENT,
  ADD_CLIENT_SUCCESSFUL,
  ADD_CLIENT_FAILED,
} from "./actionTypes"

export const addClient = user => {
  return {
    type: ADD_CLIENT,
    payload: { user },
  }
}

export const addClientSuccessful = user => {
  return {
    type: ADD_CLIENT_SUCCESSFUL,
    payload: user,
  }
}

export const addClientFailed = user => {
  return {
    type: ADD_CLIENT_FAILED,
    payload: user,
  }
}
