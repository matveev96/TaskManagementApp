import { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "./Task.styles"
import { TaskStatus } from "common/enums"
import type { DomainTask, UpdateTaskModel } from "../../../../../api/tasksApi.types"
import { EditableSpan } from "common/index"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"
import type { DomainTodolist } from "../../../../../lib/types"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const modelCreator = (arg: string | number): UpdateTaskModel => {
    return {
      title: typeof arg === "string" ? arg : task.title,
      description: task.description,
      status: typeof arg === "number" ? arg : task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
  }

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId: todolist.id })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = modelCreator(status)
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const changeTaskTitleHandler = (title: string) => {
    const model = modelCreator(title)
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)} disableGutters disablePadding>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          color={"primary"}
          size={"small"}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan oldTitle={task.title} onClick={(updateTitle: string) => changeTaskTitleHandler(updateTitle)} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ListItem>
  )
}
