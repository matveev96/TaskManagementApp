import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

export const Todolists = () => {
  const { data } = useGetTodolistsQuery()

  return (
    <>
      {data?.map((el) => {
        return (
          <Paper key={el.id} elevation={4} sx={{ p: "0 20px 20px 20px" }}>
            <Todolist todolist={el} />
          </Paper>
        )
      })}
    </>
  )
}
