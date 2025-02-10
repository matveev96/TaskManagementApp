import { TitleTodolistSx } from "./Todolist.styles"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Box from "@mui/material/Box"
import { changeTodolistTitleTC, DomainTodolist, removeTodolistTC } from "../../../../model/todolists-reducer"

import { useAppDispatch } from "common/hooks/useAppDispatch"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const changeTodoListTitle = (updatedTitle: string) => {
    dispatch(changeTodolistTitleTC({ id: todolist.id, title: updatedTitle }))
  }

  const removeToDoList = () => {
    dispatch(removeTodolistTC(todolist.id))
  }
  return (
    <Box sx={TitleTodolistSx}>
      <h3>
        <EditableSpan oldTitle={todolist.title} onClick={changeTodoListTitle} />
      </h3>
      <IconButton onClick={removeToDoList}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
