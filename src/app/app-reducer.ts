const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.payload }
    case "SET_STATUS":
      return { ...state, status: action.payload.status }
    case "SET_ERROR":
      return { ...state, error: action.payload.error }

    default:
      return state
  }
}

export const changeThemeAC = (themeMode: ThemeMode) => {
  return { type: "CHANGE_THEME", payload: themeMode } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: "SET_STATUS",
    payload: { status },
  } as const
}

export const setAppErrorAC = (error: string | null) => {
  return {
    type: "SET_ERROR",
    payload: { error },
  } as const
}

export type ChangeThemeAT = ReturnType<typeof changeThemeAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>

type ActionType = ChangeThemeAT | SetAppStatusAT | SetAppErrorAT

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

type InitialStateType = typeof initialState
