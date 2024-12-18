import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {MenuButton} from "./MenuButton";
import {getToolbar} from "./App.styles";
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

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)
        })
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeFilter = (todolistId: string, newFilter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: newFilter} : el))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)
        })
    }

    const removeToDoList = (todolistId: string) => {
        debugger;
        setTodolists((prevState) => prevState.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodoList = (title: string) => {
        const id = v1()
        const newTodoList: TodolistType = {id, title, filter: 'all'};
        setTodolists([...todolists, newTodoList])
        setTasks({...tasks, [id]: []})
    }

    const updateTaskTitle = (todolistId: string, taskId: string, updatedTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: updatedTitle} : el)
        })
    }

    const updateTodoListTitle = (todolistId: string, updatedTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: updatedTitle} : el))
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
                            <Paper elevation={4}
                                    sx={{p: '0 20px 20px 20px'}}
                            >
                                <Todolist
                                    key={el.id}
                                    todolistId={el.id}
                                    title={el.title}
                                    filter={el.filter}
                                    tasks={tasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeToDoList={removeToDoList}
                                    updateTaskTitle={updateTaskTitle}
                                    updateTodoListTitle={updateTodoListTitle}
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