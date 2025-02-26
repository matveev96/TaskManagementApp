import Box from "@mui/material/Box"
import { changeTodolistFilter, FilterValuesType, DomainTodolist } from "../../../../model/todolistsSlice"
import Button from "@mui/material/Button"
import { filterButtonsContainerSx } from "./FilterButtons.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const changeTodolistFilterHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ id: todolist.id, filter }))
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "text"}
        onClick={() => changeTodolistFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>

      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        onClick={() => changeTodolistFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>

      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        onClick={() => changeTodolistFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </Box>
  )
}
