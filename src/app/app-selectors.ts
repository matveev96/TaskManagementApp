import { ThemeMode } from "./app-reducer"
import { RootState } from "./store"

export const selectTheme = (state: RootState): ThemeMode => state.app.themeMode
