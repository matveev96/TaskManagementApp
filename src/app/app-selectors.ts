import { type RequestStatus, ThemeMode } from "./app-reducer"
import { RootState } from "./store"

export const selectTheme = (state: RootState): ThemeMode => state.app.themeMode
export const selectStatus = (state: RootState): RequestStatus => state.app.status
export const selectError = (state: RootState): string | null => state.app.error
