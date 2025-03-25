import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { AddItemForm } from "common/index"
import { Todolists } from "../features/todolists/ui/Todolists"
import { useEffect } from "react"
import { Path } from "common/routing/Routing"
import { useAppSelector } from "common/hooks"
import { useNavigate } from "react-router"
import { useCreateTodolistMutation } from "../features/todolists/api/todolistsApi"
import { selectIsLoggedIn, selectModalFAQ } from "./appSlice"
import ModalFAQ from "common/components/ModalFAQ/ModalFAQ"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const openModalFAQ = useAppSelector(selectModalFAQ)
  const navigate = useNavigate()
  const [createTodolist] = useCreateTodolistMutation()

  const addTodoList = (title: string) => {
    createTodolist(title)
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn, navigate])

  return (
    <Container fixed>
      {openModalFAQ && <ModalFAQ />}
      <Grid container sx={{ mt: "30px", fontWeight: 600 }}>
        <p>Add new Todolist 🚀</p>
        <AddItemForm addItem={addTodoList} titleForm={"Enter todolist title"} />
      </Grid>
      <Grid
        container
        spacing={4}
        sx={{
          m: "30px 0",
          justifyContent: "center",
        }}
      >
        {isLoggedIn && <Todolists />}
      </Grid>
    </Container>
  )
}
