import {FilterValuesType, TasksType} from "./app/App";
import {ChangeEvent} from "react";

import {useAutoAnimate} from "@formkit/auto-animate/react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import { filterButtonsContainerSx } from './Todolist.styles'
import { getListItemSx } from './Todolist.styles'
import {TitleContainerSx} from "./Todolist.styles";


type PropsType = {
    title: string
    todolistId: string
    tasks: TasksType
    filter: FilterValuesType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, newFilter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    removeToDoList: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, updatedTitle: string) => void
    updateTodoListTitle: (todolistId: string, updatedTitle: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        todolistId,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        removeToDoList,
        updateTaskTitle,
        updateTodoListTitle
    } = props

    const [listRef] = useAutoAnimate<HTMLUListElement>()


    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(todolistId, filter)
    }

    const removeToDoListHandler = () => {
        removeToDoList(todolistId)
    }

    const filterOfTasks = () => {
        switch (filter) {
            case "active":
                return tasks[todolistId].filter(task => !task.isDone);
            case "completed":
                return tasks[todolistId].filter(task => task.isDone);
            default:
                return tasks[todolistId]
        }
    }
    const tasksForTodolist = filterOfTasks()

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }

    const updateTodoListTitleHandler = (updateTitle: string) => {
        updateTodoListTitle(todolistId, updateTitle)
    }

    const updateTaskTitleHandler = (updateTitle: string, taskId: string) => {
        updateTaskTitle(todolistId, taskId, updateTitle)
    }

    return (
        <div>
            <Box sx={TitleContainerSx}>
                <EditableSpan oldTitle={title} onClick={updateTodoListTitleHandler}/>
                <IconButton onClick={removeToDoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
            <AddItemForm addItem={addTaskHandler}/>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <List ref={listRef}>
                        {tasksForTodolist.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(todolistId, task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(todolistId, task.id, newStatusValue)
                            }

                            return (
                                <ListItem key={task.id}
                                          sx={getListItemSx(task.isDone)}
                                          disableGutters
                                          disablePadding
                                >
                                    <div>
                                        <Checkbox checked={task.isDone}
                                                  color={'primary'}
                                                  size={"small"}
                                                  onChange={changeTaskStatusHandler}/>
                                        <EditableSpan oldTitle={task.title}
                                                      onClick={(updateTitle: string) => updateTaskTitleHandler(updateTitle, task.id)}/>
                                    </div>

                                    <IconButton onClick={removeTaskHandler}>
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
            }
            <Box sx={filterButtonsContainerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={() => changeFilterTasksHandler('all')}
                        color={'inherit'}
                >All</Button>

                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={() => changeFilterTasksHandler('active')}
                        color={'primary'}
                >Active</Button>

                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={() => changeFilterTasksHandler('completed')}
                        color={'secondary'}
                >Completed</Button>
            </Box>
        </div>
    )
}
