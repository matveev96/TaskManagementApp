import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { TodolistSkeleton } from "../skeletons/TodolistSkeleton/TodolistSkeleton"

export const Todolists = () => {
  const { data, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <>
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <TodolistSkeleton key={i} />
          ))}
      </>
    )
  }
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
