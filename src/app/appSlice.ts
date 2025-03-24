import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { tasksApi } from "../features/todolists/api/tasksApi"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

const themeModeFromLocalStorage = localStorage.getItem("themeMode")

let stringifyThemeMode = "light"

if (typeof themeModeFromLocalStorage === "string") {
  stringifyThemeMode = JSON.parse(themeModeFromLocalStorage)
}

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: stringifyThemeMode as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
    modalFAQ: false,
  },
  reducers: (create) => ({
    setChangeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setModalFAQ: create.reducer<{ modalFAQ: boolean }>((state, action) => {
      state.modalFAQ = action.payload.modalFAQ
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.updateTask.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state, action) => {
        state.status = "failed"
      })
  },
  selectors: {
    selectTheme: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectModalFAQ: (state) => state.modalFAQ,
  },
})

export const appReducer = appSlice.reducer
export const { setChangeTheme, setAppError, setIsLoggedIn, setModalFAQ } = appSlice.actions
export const { selectTheme, selectStatus, selectError, selectIsLoggedIn, selectModalFAQ } = appSlice.selectors
