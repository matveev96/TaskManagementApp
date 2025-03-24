import FormControlLabel from "@mui/material/FormControlLabel"
import { MaterialUISwitch } from "./MUISwitchDarkMode"
import React from "react"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectTheme, setChangeTheme, type ThemeMode } from "../../../app/appSlice"

export const SwitchDarkMode = () => {
  const themeMode = useAppSelector(selectTheme)

  const dispatch = useAppDispatch()

  const changeModeHandler = () => {
    let themeChanger: ThemeMode = themeMode === "light" ? "dark" : "light"
    dispatch(setChangeTheme({ themeMode: themeChanger }))
    localStorage.setItem("themeMode", JSON.stringify(themeChanger))
  }

  return (
    <FormControlLabel
      checked={themeMode === "dark"}
      control={<MaterialUISwitch onClick={changeModeHandler} />}
      label={""}
      sx={{ m: "20px" }}
    />
  )
}
