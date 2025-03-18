import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import Grid from "@mui/material/Grid2"
import { type SubmitHandler, useForm, Controller } from "react-hook-form"
import type { LoginArgs } from "../../api/authApi.types"
import { useNavigate } from "react-router"
import { Path } from "common/routing/Routing"
import { selectIsLoggedIn, selectTheme, setIsLoggedIn } from "../../../../app/appSlice"
import { useLoginMutation } from "../../api/authApi"
import { ResultCode } from "common/enums"

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)

  const [login] = useLoginMutation()

  if (isLoggedIn) {
    navigate(Path.Main)
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>()
  // { defaultValues: { email: "", password: "", rememberMe: false }}

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    login(data)
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          localStorage.setItem("sn-token", res.data.data.token)
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
        }
      })
      .then(() => {
        reset({ password: "", rememberMe: false }, { keepDirty: true })
      })
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
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
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
              <TextField
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                type="password"
                label="Password"
                margin="normal"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 3,
                    message: "Password must be at least 3 characters long",
                  },
                })}
              />
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
