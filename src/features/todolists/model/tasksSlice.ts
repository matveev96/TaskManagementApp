import type { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { tasksApi } from "../api/tasksApi"
import { type AppDispatch } from "../../../app/store"
import { setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { addTodolist, changeEntityStatusTodolist, clearData, removeTodolist } from "./todolistsSlice"
import { createSlice } from "@reduxjs/toolkit"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const task = state[action.payload.todolistId]
      const index = task.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        task.splice(index, 1)
      }
    }),
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ task: DomainTask; model: UpdateTaskModel }>((state, action) => {
      const task = state[action.payload.task.todoListId]
      const index = task.findIndex((t) => t.id === action.payload.task.id)
      if (index !== -1) {
        task[index] = { ...task[index], ...action.payload.model }
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(clearData, () => {
        return {}
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { removeTask, addTask, setTasks, updateTask } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
// Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setTasks({ tasks: res.data.items, todolistId }))
      dispatch(setAppStatus({ status: "idle" }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeEntityStatusTodolist({ id: args.todolistId, entityStatus: "loading" }))
  tasksApi
    .deleteTask(args)
    .then((res) => {
      dispatch(changeEntityStatusTodolist({ id: args.todolistId, entityStatus: "succeeded" }))
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTask({ taskId: args.taskId, todolistId: args.todolistId }))
        dispatch(setAppStatus({ status: "idle" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
      dispatch(changeEntityStatusTodolist({ id: args.todolistId, entityStatus: "failed" }))
    })
}

export const addTaskTC = (args: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .createTask(args)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTask({ task: res.data.data.item }))
        dispatch(setAppStatus({ status: "idle" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (task: DomainTask) => (dispatch: AppDispatch) => {
  const model: UpdateTaskModel = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
  }
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .updateTask({ taskId: task.id, todolistId: task.todoListId, model })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTask({ task, model }))
        dispatch(setAppStatus({ status: "idle" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
