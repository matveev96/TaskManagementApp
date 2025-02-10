import { useAppSelector } from "common/hooks/useAppSelector"

// MUI imports
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { selectTheme } from "./app-selectors"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components/Header/Header"
import { Main } from "./Main"

function App() {
  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}

export default App
