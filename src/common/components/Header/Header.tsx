import Toolbar from "@mui/material/Toolbar"
import { getToolbar } from "./Header.styles"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Switch from "@mui/material/Switch"
import AppBar from "@mui/material/AppBar"
import { changeThemeAC } from "../../../app/app-reducer"
import { useAppSelector } from "common/hooks"
import { selectStatus, selectTheme } from "../../../app/app-selectors"
import { getTheme } from "common/theme"
import { useAppDispatch } from "common/hooks"
import { LinearProgress } from "@mui/material"
import { MenuButton } from "common/index"
import { logoutTC } from "../../../features/auth/model/authReducer"
import { selectIsLoggedIn } from "../../../features/auth/model/authSelectors"

export const Header = () => {
  const themeMode = useAppSelector(selectTheme)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={getToolbar}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
