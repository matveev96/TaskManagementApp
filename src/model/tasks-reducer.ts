import { v1 } from "uuid";
import {TasksType} from "../app/App";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

const initialState: TasksType = {}

export const tasksReducer = (tasks: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case "ADD-TASK": {
            const {title, todolistId} = action.payload
            const newTask = {
                id: v1(),
                title: title,
                isDone: false
            }
            return { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
        }
        case "REMOVE-TASK": {
            const {id, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)}
        }
        case "CHANGE-TASK-STATUS": {
            const {id, todolistId, isDone} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)}
        }
        case "CHANGE-TASK-TITLE": {
            const {id, todolistId, title} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, title} : t)}
        }
        case "ADD-TODOLIST": {
            const {id} = action.payload
            return {...tasks, [id]: []}
        }
        case "REMOVE-TODOLIST": {
            const {id} = action.payload
            delete tasks[id]
            return tasks
        }
        default:
            return tasks
    }
}
export const AddTaskAC = (payload: { title: string, todolistId: string }) => {
    return ({
        type: "ADD-TASK",
        payload: payload //можно просто оставить payload
    } as const)
}

export const RemoveTaskAC = (payload: {todolistId: string, id: string}) => {
    return ({
        type: "REMOVE-TASK",
        payload: payload
    } as const)
}

export const ChangeTaskStatusAC = (payload: { isDone: boolean, todolistId: string, id: string }) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: payload
    } as const
}

export const ChangeTaskTitleAC = (payload: { title: string, todolistId: string, id: string }) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: payload
    } as const
}

type AddTaskAT = ReturnType<typeof AddTaskAC>
type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>
type addTodolistAT = ReturnType<typeof addTodolistAC>
type removeTodolistAT = ReturnType<typeof removeTodolistAC>
type ActionType =
    AddTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | addTodolistAT
    | removeTodolistAT;