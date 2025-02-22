import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTasks } from "../../../../model/tasks-selectors"
import List from "@mui/material/List"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { DomainTodolist } from "../../../../model/todolists-reducer"
import { Task } from "./Task"
import { TaskStatus } from "common/enums"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [listRef] = useAutoAnimate<HTMLUListElement>()

  const tasks = useAppSelector(selectTasks)

  const filterOfTasks = () => {
    switch (todolist.filter) {
      case "active":
        return tasks[todolist.id].filter((task) => task.status === TaskStatus.New)
      case "completed":
        return tasks[todolist.id].filter((task) => task.status === TaskStatus.Completed)
      default:
        return tasks[todolist.id]
    }
  }
  const tasksForTodolist = filterOfTasks()

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
