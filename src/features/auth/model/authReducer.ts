import type { LoginArgs } from "../api/authApi.types"
import { setAppStatusAC } from "../../../app/app-reducer"
import type { AppDispatch } from "../../../app/store"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { authApi } from "../api/authApi"
import { clearDataAC } from "../../todolists/model/todolists-reducer"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    case "SET_IS_INITIALIZED":
      return { ...state, isInitialized: action.payload.isInitialized }
    default:
      return state
  }
}

// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}
const setIsInitializedAC = (isInitialized: boolean) => {
  return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const
}

type SetIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>
type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>

// Actions types
type ActionsType = SetIsLoggedInAT | SetIsInitializedAT

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        localStorage.setItem("sn-token", res.data.data.token)
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(clearDataAC())
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC("succeeded"))
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
  dispatch(setAppStatusAC("loading"))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}
