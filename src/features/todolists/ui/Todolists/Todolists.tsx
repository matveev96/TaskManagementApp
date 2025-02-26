import { useAppSelector } from "common/hooks/useAppSelector"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useEffect } from "react"
import { fetchTodolistsTC, selectTodolists } from "../../model/todolistsSlice"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((el) => {
        return (
          <Paper key={el.id} elevation={4} sx={{ p: "0 20px 20px 20px" }}>
            <Todolist todolist={el} />
          </Paper>
        )
      })}
    </>
  )
}
