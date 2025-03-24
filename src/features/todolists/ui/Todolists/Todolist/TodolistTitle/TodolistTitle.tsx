import { TitleTodolistSx } from "./Todolist.styles"
import { EditableSpan } from "common/index"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Box from "@mui/material/Box"
import { useRemoveTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"
import type { DomainTodolist } from "../../../../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolist] = useUpdateTodolistMutation()

  const changeTodoListTitle = (updatedTitle: string) => {
    updateTodolist({ title: updatedTitle, id })
  }

  const removeToDoList = () => {
    removeTodolist(id)
  }
  return (
    <Box sx={TitleTodolistSx}>
      <h3>
        <EditableSpan oldTitle={title} onClick={changeTodoListTitle} />
      </h3>
      <IconButton onClick={removeToDoList}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
