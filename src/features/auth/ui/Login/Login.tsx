import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { selectTheme } from "../../../../app/app-selectors"
import Grid from "@mui/material/Grid2"
import { type SubmitHandler, useForm, Controller } from "react-hook-form"
import s from "./Login.module.css"
import type { LoginArgs } from "../../api/authApi.types"
import { loginTC } from "../../model/authReduser"
import { selectIsLoggedIn } from "../../model/authSelectors"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { Path } from "common/routing/Routing"

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Path.Main)
    }
  }, [isLoggedIn])
  // Второй вариант реализации роутинга при логинезации, который выпилили из документации ReactRouter. Для использования без ошибок нужно его вставить перед return компоненты Login
  // if(isLoggedIn) {
  //   return <Navigate to={Path.Main} />
  // }

  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>({ defaultValues: { email: "", password: "", rememberMe: false } })

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    dispatch(loginTC(data))
    reset()
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Incorrect email address",
                  },
                })}
              />
              {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
              <TextField type="password" label="Password" margin="normal" {...register("password")} />
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Controller
                    control={control}
                    name="rememberMe"
                    render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                  />
                }
              />

              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
