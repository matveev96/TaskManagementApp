import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { TaskStatus } from "common/enums"
import type { DomainTask } from "../../../../../api/tasksApi.types"
import type { DomainTodolist } from "../../../../../model/todolists-reducer"
import { EditableSpan } from "common/index"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC({ ...task, status }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC({ ...task, title }))
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)} disableGutters disablePadding>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          color={"primary"}
          size={"small"}
          onChange={changeTaskStatusHandler}
          disabled={todolist.entityStatus === "loading"}
        />
        <EditableSpan
          disabled={todolist.entityStatus === "loading"}
          oldTitle={task.title}
          onClick={(updateTitle: string) => changeTaskTitleHandler(updateTitle)}
        />
      </div>
      <IconButton disabled={todolist.entityStatus === "loading"} onClick={removeTaskHandler}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ListItem>
  )
}
