import { useAppSelector } from "common/hooks/useAppSelector"

// MUI imports
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { getTheme } from "common/theme/theme"
import { ErrorSnackBar, Header } from "common/index"
import { Routing } from "common/routing"
import { useEffect } from "react"
import { useAppDispatch } from "common/hooks"
import { initializeTC, selectIsInitialized } from "../features/auth/model/authSlice"
import { CircularProgress } from "@mui/material"
import s from "./App.module.css"
import { selectTheme } from "./appSlice"

function App() {
  const themeMode = useAppSelector(selectTheme)
  const isInitialized = useAppSelector(selectIsInitialized)
  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackBar />
    </ThemeProvider>
  )
}

export default App
