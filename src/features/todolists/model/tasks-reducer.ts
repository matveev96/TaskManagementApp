import type { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { tasksApi } from "../api/tasksApi"
import type { AppDispatch, AppThunk } from "../../../app/store"
import {
  type AddTodolistActionType,
  changeEntityStatusTodolistAC,
  type ClearDataActionType,
  type RemoveTodolistActionType,
} from "./todolists-reducer"
import { setAppStatusAC } from "../../../app/app-reducer"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }

    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }
    case "CLEAR-DATA": {
      return {}
    }

    case "ADD-TASK": {
      const newTask = action.payload.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
    }

    case "UPDATE-TASK": {
      const newTask = action.payload.task
      const model = action.payload.model
      return {
        ...state,
        [newTask.todoListId]: state[newTask.todoListId].map((t) => (t.id === newTask.id ? { ...t, ...model } : t)),
      }
    }

    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolist.id]: [] }
    }

    case "REMOVE-TODOLIST": {
      let copyState = { ...state }
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

export const updateTaskAC = (payload: { task: DomainTask; model: UpdateTaskModel }) => {
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
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setTasksAC({ tasks: res.data.items, todolistId }))
      dispatch(setAppStatusAC("idle"))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  dispatch(changeEntityStatusTodolistAC({ id: args.todolistId, entityStatus: "loading" }))
  tasksApi
    .deleteTask(args)
    .then((res) => {
      dispatch(changeEntityStatusTodolistAC({ id: args.todolistId, entityStatus: "succeeded" }))
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTaskAC(args))
        dispatch(setAppStatusAC("idle"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
      dispatch(changeEntityStatusTodolistAC({ id: args.todolistId, entityStatus: "failed" }))
    })
}

export const addTaskTC = (args: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .createTask(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC({ task: res.data.data.item }))
        dispatch(setAppStatusAC("idle"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
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
      deadline: task.deadline,
    }
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .updateTask({ taskId: task.id, todolistId: task.todoListId, model })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(updateTaskAC({ task, model }))
          dispatch(setAppStatusAC("idle"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
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
  | ClearDataActionType

export type TasksStateType = {
  [key: string]: DomainTask[]
}
