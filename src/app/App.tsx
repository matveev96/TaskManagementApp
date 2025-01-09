import './App.css';
import {Todolist} from "../Todolist";
import {useState} from "react";
import {AddItemForm} from "../AddItemForm";
import {MenuButton} from "../MenuButton";
import {getToolbar} from "../App.styles";

import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
} from "../model/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../model/tasks-reducer";
import {useAppDispatch, useAppSelector} from "./hooks";
import {selectTodolists} from "../model/todolists-selectors";
import {selectTasks} from "../model/tasks-selectors";

// MUI imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TasksType = {
	[key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type ThemeMode = 'dark' | 'light'

function App() {

	const todolists = useAppSelector(selectTodolists)
	const tasks = useAppSelector(selectTasks)

	const dispatch = useAppDispatch();

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const changeModeHandler = () => {
		setThemeMode(themeMode === 'light' ? 'dark' : 'light')
	}

	const removeTask = (todolistId: string, taskId: string) => {
		dispatch(RemoveTaskAC({todolistId, id: taskId}))
	}

	const addTask = (todolistId: string, title: string) => {
		dispatch(AddTaskAC({todolistId, title}))
	}

	const changeTodolistFilter = (todolistId: string, newFilter: FilterValuesType) => {
		dispatch(changeTodolistFilterAC({id: todolistId, filter: newFilter}))
	}

	const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
		dispatch(ChangeTaskStatusAC({isDone: taskStatus, todolistId, id: taskId }))
	}

	const removeToDoList = (todolistId: string) => {
		dispatch(removeTodolistAC(todolistId))
	}

	const addTodoList = (title: string) => {
		dispatch(addTodolistAC(title))
	}

	const changeTaskTitle = (todolistId: string, taskId: string, updatedTitle: string) => {
		dispatch(ChangeTaskTitleAC({title: updatedTitle, todolistId, id: taskId}))
	}

	const changeTodoListTitle = (todolistId: string, updatedTitle: string) => {
		dispatch(changeTodolistTitleAC({id: todolistId, title: updatedTitle}))
	}

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#ef6c00',
			}
		}
	})
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position="static" sx={{ mb: '30px' }}>
				<Toolbar sx={getToolbar}>
					<IconButton color="inherit">
						<MenuIcon/>
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler} />
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container
					  sx={{mt: '30px'}}
				>
					<AddItemForm addItem={addTodoList}/>
				</Grid>
				<Grid container
					  spacing={4}
					  sx={{mt: '30px'}}
				>
					{todolists.map(el => {

						return (
							<Paper  key={el.id}
									elevation={4}
								   sx={{p: '0 20px 20px 20px'}}
							>
								<Todolist
									todolistId={el.id}
									title={el.title}
									filter={el.filter}
									tasks={tasks}
									removeTask={removeTask}
									changeFilter={changeTodolistFilter}
									addTask={addTask}
									changeTaskStatus={changeTaskStatus}
									removeToDoList={removeToDoList}
									updateTaskTitle={changeTaskTitle}
									updateTodoListTitle={changeTodoListTitle}
								/>
							</Paper>
						)
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App;