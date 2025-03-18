import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { filterButtonsContainerSx } from "./FilterButtons.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { todolistsApi } from "../../../../api/todolistsApi"
import type { DomainTodolist, FilterValues } from "../../../../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeTodolistFilterHandler = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeTodolistFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>

      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeTodolistFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>

      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeTodolistFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </Box>
  )
}
