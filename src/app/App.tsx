import { useAppSelector } from "common/hooks/useAppSelector"

// MUI imports
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { getTheme } from "common/theme/theme"
import { ErrorSnackBar, Header } from "common/index"
import { Routing } from "common/routing"
import { useEffect, useState } from "react"

import { CircularProgress } from "@mui/material"
import s from "./App.module.css"
import { selectTheme, setIsLoggedIn } from "./appSlice"
import { useMeQuery } from "../features/auth/api/authApi"
import { ResultCode } from "common/enums"
import { useAppDispatch } from "common/hooks"

function App() {
  const themeMode = useAppSelector(selectTheme)

  const [isInitialized, setIsInitialized] = useState(false)

  const dispatch = useAppDispatch()

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
      setIsInitialized(true)
    }
  }, [isLoading, data, dispatch])

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      {isInitialized && (
        <>
          <Header />
          <Routing />
          <ErrorSnackBar />
        </>
      )}

      {!isInitialized && (
        <div className={s.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )}
    </ThemeProvider>
  )
}

export default App
