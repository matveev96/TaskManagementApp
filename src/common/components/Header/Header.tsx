import Toolbar from "@mui/material/Toolbar";
import {getToolbar} from "./Header.styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "../MenuButton/MenuButton";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import {changeThemeAC} from "../../../app/app-reducer";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectTheme} from "../../../app/app-selectors";
import {getTheme} from "../../theme/theme";
import {useAppDispatch} from "../../hooks/useAppDispatch";


export const Header = () => {

    const themeMode = useAppSelector(selectTheme)
    const dispatch = useAppDispatch();
    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar sx={getToolbar}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    );
};
