import type { LoginArgs } from "../api/authApi.types"
import { setAppStatus } from "../../../app/appSlice"
import type { AppDispatch } from "../../../app/store"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { authApi } from "../api/authApi"
import { clearData } from "../../todolists/model/todolistsSlice"
import { createSlice } from "@reduxjs/toolkit"

// type InitialStateType = typeof initialState
//
// const initialState = {
//   isLoggedIn: false,
//   isInitialized: false,
// }

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized,
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn, setIsInitialized } = authSlice.actions
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        localStorage.setItem("sn-token", res.data.data.token)
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(clearData())
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(setAppStatus({ status: "succeeded" }))
        localStorage.removeItem("sn-token")
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const initializeTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }))
    })
}
