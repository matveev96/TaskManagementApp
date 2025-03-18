import { TitleTodolistSx } from "./Todolist.styles"
import { EditableSpan } from "common/index"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Box from "@mui/material/Box"

import { useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"
import { useAppDispatch } from "common/hooks"
import type { DomainTodolist } from "../../../../lib/types"
import { updateEntityStatus } from "../utils/updateQueryEntityStatus"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, entityStatus, title } = todolist

  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolist] = useUpdateTodolistMutation()

  const dispatch = useAppDispatch()

  const changeTodoListTitle = (updatedTitle: string) => {
    updateTodolist({ title: updatedTitle, id })
  }

  const removeToDoList = () => {
    updateEntityStatus({ status: "loading", dispatch, id })
    deleteTodolist(id)
      .unwrap()
      .catch(() => {
        updateEntityStatus({ status: "idle", dispatch, id })
      })
  }
  return (
    <Box sx={TitleTodolistSx}>
      <h3>
        <EditableSpan oldTitle={title} onClick={changeTodoListTitle} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={removeToDoList} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
