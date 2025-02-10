import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { Todolists } from "../features/todolists/ui/Todolists"
import { useAppDispatch } from "common/hooks/useAppDispatch"

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodoList = (title: string) => {
    dispatch(addTodolistTC(title))
  }
  return (
    <Container fixed>
      <Grid container sx={{ mt: "30px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={4} sx={{ mt: "30px" }}>
        <Todolists />
      </Grid>
    </Container>
  )
}
