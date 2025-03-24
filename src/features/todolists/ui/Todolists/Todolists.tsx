import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { TodolistSkeleton } from "../skeletons/TodolistSkeleton/TodolistSkeleton"
import s from "./todolists.module.css"

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
      {data?.length ? (
        data.map((el) => {
          return (
            <Paper key={el.id} elevation={4} sx={{ p: "0 20px 20px 20px" }}>
              <Todolist todolist={el} />
            </Paper>
          )
        })
      ) : (
        <div className={s.noTodolists}>
          <h1 className={s.title}>No Todolists here</h1>
          <h2 className={s.subTitle}>Add new Todolist 📝</h2>
        </div>
      )}
    </>
  )
}
