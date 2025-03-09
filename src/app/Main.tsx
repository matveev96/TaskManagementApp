import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { AddItemForm } from "common/index"
import { Todolists } from "../features/todolists/ui/Todolists"
import { useEffect } from "react"
import { Path } from "common/routing/Routing"
import { useAppSelector } from "common/hooks"
import { useNavigate } from "react-router"
import { useCreateTodolistMutation } from "../features/todolists/api/todolistsApi"
import { selectIsLoggedIn } from "./appSlice"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
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
  // Второй вариант реализации роутинга при логинезации, который выпилили из документации ReactRouter. Для использования без ошибок нужно его вставить перед return компоненты Login
  // if(isLoggedIn) {
  //   return <Navigate to={Path.Main} />
  // }

  return (
    <Container fixed>
      <Grid container sx={{ mt: "30px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={4} sx={{ mt: "30px" }}>
        {isLoggedIn && <Todolists />}
      </Grid>
    </Container>
  )
}
