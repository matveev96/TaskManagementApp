import { TitleTodolistSx } from "./Todolist.styles"
import { EditableSpan } from "common/index"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Box from "@mui/material/Box"
import { DomainTodolist } from "../../../../model/todolistsSlice"

import { useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolist] = useUpdateTodolistMutation()

  const changeTodoListTitle = (updatedTitle: string) => {
    updateTodolist({ title: updatedTitle, id: todolist.id })
  }

  const removeToDoList = () => {
    deleteTodolist(todolist.id)
  }
  return (
    <Box sx={TitleTodolistSx}>
      <h3>
        <EditableSpan
          oldTitle={todolist.title}
          onClick={changeTodoListTitle}
          disabled={todolist.entityStatus === "loading"}
        />
      </h3>
      <IconButton onClick={removeToDoList} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
