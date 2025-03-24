import List from "@mui/material/List"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Task } from "./Task"
import { TaskStatus } from "common/enums"
import { PAGE_SIZE, useGetTasksQuery } from "../../../../api/tasksApi"
import { TasksSkeleton } from "../../../skeletons/TaskSkeleton/TasksSceleton"
import type { DomainTodolist } from "../../../../lib/types"
import { useState } from "react"
import { TasksPagination } from "../TasksPagination/TasksPagination"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [listRef] = useAutoAnimate<HTMLUListElement>()

  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({ todolistId: todolist.id, args: { page: page } })
  let tasks = data?.items
  let tasksTotalCount = data?.totalCount || 0

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
        <p>No tasks ✨</p>
      ) : (
        <>
          <List ref={listRef}>
            {tasksForTodolist?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          {tasksTotalCount > PAGE_SIZE ? (
            <TasksPagination page={page} setPage={setPage} totalCount={tasksTotalCount} />
          ) : null}
        </>
      )}
    </>
  )
}
