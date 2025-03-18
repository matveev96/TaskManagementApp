import Toolbar from "@mui/material/Toolbar"
import { getToolbar } from "./Header.styles"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Switch from "@mui/material/Switch"
import AppBar from "@mui/material/AppBar"
import { selectIsLoggedIn, selectStatus, selectTheme, setChangeTheme, setIsLoggedIn } from "../../../app/appSlice"
import { useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { useAppDispatch } from "common/hooks"
import { LinearProgress } from "@mui/material"
import { MenuButton } from "common/index"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { ResultCode } from "common/enums"
import { baseApi } from "../../../app/baseApi"

export const Header = () => {
  const themeMode = useAppSelector(selectTheme)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [logout] = useLogoutMutation()

  const changeModeHandler = () => {
    dispatch(setChangeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem("sn-token")
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
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
