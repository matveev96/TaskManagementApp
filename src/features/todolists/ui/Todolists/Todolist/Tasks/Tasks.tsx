import List from "@mui/material/List"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Task } from "./Task"
import { TaskStatus } from "common/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { TasksSkeleton } from "../../../skeletons/TaskSkeleton/TasksSceleton"
import type { DomainTodolist } from "../../../../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [listRef] = useAutoAnimate<HTMLUListElement>()

  const { data, isLoading } = useGetTasksQuery(todolist.id)
  let tasks = data?.items

  const filterOfTasks = () => {
    switch (todolist.filter) {
      case "active":
        return tasks?.filter((task) => task.status === TaskStatus.New)
      case "completed":
        return tasks?.filter((task) => task.status === TaskStatus.Completed)
      default:
        return tasks
    }
  }
  const tasksForTodolist = filterOfTasks()

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List ref={listRef}>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
