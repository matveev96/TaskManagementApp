import Toolbar from "@mui/material/Toolbar"
import AppBar from "@mui/material/AppBar"
import { selectIsLoggedIn, selectStatus, selectTheme, setIsLoggedIn, setModalFAQ } from "../../../app/appSlice"
import { useAppSelector } from "common/hooks"
import { useAppDispatch } from "common/hooks"
import { LinearProgress } from "@mui/material"
import { MenuButton } from "common/index"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { ResultCode } from "common/enums"
import { baseApi } from "../../../app/baseApi"
import { SwitchDarkMode } from "common/components/SwithDarkMode/SwitchDarkMode"
import { getTheme } from "common/theme"
import Box from "@mui/material/Box"

export const Header = () => {
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [logout] = useLogoutMutation()

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

  const changeModalFAQHandler = () => {
    dispatch(setModalFAQ({ modalFAQ: true }))
  }

  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          [theme.breakpoints.down(565)]: {
            justifyContent: "center",
          },
        }}
      >
        <Box
          sx={{
            [theme.breakpoints.down(565)]: {
              display: "none",
            },
          }}
        >
          Task Management App
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton onClick={changeModalFAQHandler}>FAQ</MenuButton>
          <SwitchDarkMode />
        </Box>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
