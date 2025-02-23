import s from "./Page404.module.css"
import Button from "@mui/material/Button"
import { Link } from "react-router"
import { Path } from "common/routing/Routing"

export const Page404 = () => {
  return (
    <div className={s.page404}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Button sx={{ width: "150px" }} variant={"outlined"} size={"large"} component={Link} to={Path.Main}>
        Go Home
      </Button>
    </div>
  )
}
