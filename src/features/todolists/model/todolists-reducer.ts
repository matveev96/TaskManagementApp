import type { Todolist } from "../api/todolistsApi.types"
import type { AppThunk } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"
import { type RequestStatus, setAppStatusAC } from "../../../app/app-reducer"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { ResultCode } from "common/enums"
import { fetchTasksTC } from "./tasks-reducer"

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }

    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }

    case "CLEAR-DATA": {
      return []
    }

    case "ADD-TODOLIST": {
      const todolist = action.payload.todolist
      return [{ ...todolist, filter: "all", entityStatus: "idle" }, ...state]
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }
    case "CHANGE-ENTITY-STATUS": {
      return state.map((tl) =>
        tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
      )
    }

    default:
      return state
  }
}

// Action creators
export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const
}

export const clearDataAC = () => {
  return { type: "CLEAR-DATA" } as const
}

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

export const changeEntityStatusTodolistAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE-ENTITY-STATUS", payload } as const
}

// Thunk
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data))
      dispatch(setAppStatusAC("idle"))
      return res.data
    })
    .then((todolists) => {
      todolists.forEach((todolist) => {
        dispatch(fetchTasksTC(todolist.id))
      })
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          const todolist = res.data.data.item
          dispatch(addTodolistAC(todolist))
          dispatch(setAppStatusAC("idle"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const removeTodolistTC =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeEntityStatusTodolistAC({ id, entityStatus: "loading" }))
    todolistsApi
      .deleteTodolist(id)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTodolistAC(id))
          dispatch(setAppStatusAC("idle"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
        dispatch(changeEntityStatusTodolistAC({ id, entityStatus: "failed" }))
      })
  }

export const changeTodolistTitleTC =
  (args: { id: string; title: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .updateTodolist(args)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeTodolistTitleAC(args))
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
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeEntityStatusTodolistActionType = ReturnType<typeof changeEntityStatusTodolistAC>
export type ClearDataActionType = ReturnType<typeof clearDataAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeEntityStatusTodolistActionType
  | ClearDataActionType

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}
