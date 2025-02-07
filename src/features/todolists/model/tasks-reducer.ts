import type {DomainTask, UpdateTaskModel} from "../api/tasksApi.types";
import {tasksApi} from "../api/tasksApi";
import type {AppDispatch, AppThunk} from "../../../app/store";
import type {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }

        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
            }
        }

        case "ADD-TASK": {
            const newTask = action.payload.task
            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]}
        }

        case "UPDATE-TASK": {
            const newTask = action.payload.task
            const model = action.payload.model
            return {
                ...state,
                [newTask.todoListId]: state[newTask.todoListId].map((t) =>
                    t.id === newTask.id ? {...t, ...model} : t,
                ),
            }
        }

        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolist.id]: []}
        }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return state
    }
}


// Action creators
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
    return {
        type: "REMOVE-TASK",
        payload,
    } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
    return {
        type: "ADD-TASK",
        payload,
    } as const
}

export const updateTaskAC = (payload: { task: DomainTask, model: UpdateTaskModel }) => {
    return {
        type: "UPDATE-TASK",
        payload,
    } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
    return {
        type: "SET-TASKS",
        payload,
    } as const
}

// Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
    tasksApi.getTasks(todolistId).then((res) => {
        dispatch(setTasksAC({tasks: res.data.items, todolistId}))
    })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
    tasksApi.deleteTask(args).then(() => {
        dispatch(removeTaskAC(args))
    })
}

export const addTaskTC =
    (args: { title: string; todolistId: string }) =>
        (dispatch: AppDispatch) => {
            tasksApi.createTask(args).then((res) => {
                dispatch(addTaskAC({task: res.data.data.item}))
            })
}

export const updateTaskTC =
    (task: DomainTask): AppThunk =>
        (dispatch) => {
            const model: UpdateTaskModel = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            }
            tasksApi.updateTask({taskId: task.id, todolistId: task.todoListId, model}).then(() => {
                dispatch(updateTaskAC({task, model}));
            })
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType
    | UpdateTaskActionType

export type TasksStateType = {
    [key: string]: DomainTask[]
}
